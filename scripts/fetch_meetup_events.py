#!/usr/bin/env python3
"""
Fetches upcoming Meetup events for alamotechcollective via the GraphQL API
using OAuth 2.0 JWT bearer authentication, and writes structured JSON to
_data/events.json.

Required environment variables:
  MEETUP_CLIENT_KEY     - OAuth client key (issuer)
  MEETUP_SIGNING_KEY_ID - Key ID (kid) for the JWT header
  MEETUP_PRIVATE_KEY    - RSA private key in PEM format
  MEETUP_MEMBER_ID      - Meetup member ID (JWT subject)
"""

import json
import os
import sys
import time
from pathlib import Path

import jwt
import requests

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

MEETUP_GROUP = "alamotechcollective"
OAUTH_URL = "https://secure.meetup.com/oauth2/access"
GRAPHQL_URL = "https://api.meetup.com/gql-ext"
OUTPUT_PATH = Path(__file__).parent.parent / "_data" / "events.json"

GRAPHQL_QUERY = """
query($urlname: String!) {
  groupByUrlname(urlname: $urlname) {
    events(status: ACTIVE, first: 20) {
      edges {
        node {
          title
          dateTime
          endTime
          duration
          eventUrl
          description
          rsvps {
            totalCount
          }
          maxRsvp
          venue {
            name
            address
            city
            state
            postalCode
          }
          featuredEventPhoto {
            id
            baseUrl
          }
        }
      }
    }
  }
}
"""


# ---------------------------------------------------------------------------
# Authentication
# ---------------------------------------------------------------------------

def get_access_token(client_key: str, signing_key_id: str, private_key: str, member_id: str) -> str:
    """Build a signed JWT and exchange it for a Meetup OAuth access token."""
    now = int(time.time())
    payload = {
        "sub": member_id,
        "iss": client_key,
        "aud": "api.meetup.com",
        "iat": now,
        "exp": now + 120,
    }
    headers = {
        "kid": signing_key_id,
    }

    signed_jwt = jwt.encode(
        payload,
        private_key,
        algorithm="RS256",
        headers=headers,
    )

    # PyJWT >= 2.0 returns str; older versions return bytes
    if isinstance(signed_jwt, bytes):
        signed_jwt = signed_jwt.decode("utf-8")

    response = requests.post(
        OAUTH_URL,
        data={
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "assertion": signed_jwt,
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=30,
    )

    if not response.ok:
        print(f"ERROR: OAuth token request failed: {response.status_code} {response.text}", file=sys.stderr)
        sys.exit(1)

    token_data = response.json()
    access_token = token_data.get("access_token")
    if not access_token:
        print(f"ERROR: No access_token in OAuth response: {token_data}", file=sys.stderr)
        sys.exit(1)

    return access_token


# ---------------------------------------------------------------------------
# GraphQL fetch
# ---------------------------------------------------------------------------

def fetch_events(access_token: str) -> list[dict]:
    """Query the Meetup GraphQL API and return raw event nodes."""
    response = requests.post(
        GRAPHQL_URL,
        json={
            "query": GRAPHQL_QUERY,
            "variables": {"urlname": MEETUP_GROUP},
        },
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        timeout=30,
    )

    if not response.ok:
        print(f"ERROR: GraphQL request failed: {response.status_code} {response.text}", file=sys.stderr)
        sys.exit(1)

    body = response.json()

    if "errors" in body:
        print(f"ERROR: GraphQL errors: {json.dumps(body['errors'], indent=2)}", file=sys.stderr)
        sys.exit(1)

    edges = (
        body.get("data", {})
        .get("groupByUrlname", {})
        .get("events", {})
        .get("edges", [])
    )

    return [edge["node"] for edge in edges if edge.get("node")]


# ---------------------------------------------------------------------------
# Data transformation
# ---------------------------------------------------------------------------


def build_image_url(photo: dict | None) -> str | None:
    """Construct the highres image URL from featuredEventPhoto fields."""
    if not photo:
        return None
    base_url = photo.get("baseUrl", "")
    photo_id = photo.get("id", "")
    if not base_url or not photo_id:
        return None
    return f"{base_url}{photo_id}/highres.jpeg"


def transform_event(node: dict) -> dict:
    """Convert a raw GraphQL event node into the output format."""
    venue_raw = node.get("venue")
    photo_raw = node.get("featuredEventPhoto")

    venue = None
    if venue_raw:
        venue = {
            "name": venue_raw.get("name"),
            "address": venue_raw.get("address"),
            "city": venue_raw.get("city"),
            "state": venue_raw.get("state"),
        }

    return {
        "title": node.get("title"),
        "dateTime": node.get("dateTime"),
        "endTime": node.get("endTime"),
        "eventUrl": node.get("eventUrl"),
        "description": node.get("description"),
        "venue": venue,
        "rsvpCount": (node.get("rsvps") or {}).get("totalCount"),
        "maxRsvp": node.get("maxRsvp"),
        "photo": build_image_url(photo_raw),
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    client_key = os.environ.get("MEETUP_CLIENT_KEY")
    signing_key_id = os.environ.get("MEETUP_SIGNING_KEY_ID")
    private_key = os.environ.get("MEETUP_PRIVATE_KEY")
    member_id = os.environ.get("MEETUP_MEMBER_ID")

    missing = [
        name
        for name, val in [
            ("MEETUP_CLIENT_KEY", client_key),
            ("MEETUP_SIGNING_KEY_ID", signing_key_id),
            ("MEETUP_PRIVATE_KEY", private_key),
            ("MEETUP_MEMBER_ID", member_id),
        ]
        if not val
    ]
    if missing:
        print(f"ERROR: Missing required environment variables: {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)

    # Normalize escaped newlines that GitHub Actions sometimes injects
    private_key = private_key.replace("\\n", "\n")

    print("Authenticating with Meetup OAuth...")
    access_token = get_access_token(client_key, signing_key_id, private_key, member_id)
    print("Authentication successful.")

    print("Fetching upcoming events...")
    raw_events = fetch_events(access_token)
    print(f"Fetched {len(raw_events)} event(s).")

    events = [transform_event(node) for node in raw_events]
    events.sort(key=lambda e: e.get("dateTime") or "")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(events, indent=2, ensure_ascii=False) + "\n")
    print(f"Written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
