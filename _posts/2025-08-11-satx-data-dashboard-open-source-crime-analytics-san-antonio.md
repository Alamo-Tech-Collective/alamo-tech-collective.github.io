---
layout: post
title: "Open Source Crime Data Dashboard for San Antonio: Making Public Safety Data Accessible"
date: 2025-08-11
categories: [community, open-source, civic-tech]
author: "Alamo Tech Collective"
excerpt: "We built SATX-Data, an open source dashboard that transforms San Antonio's public safety data from massive CSV files into interactive visualizations. Track crime trends, response times, and neighborhood safety metrics in real-time."
keywords: "San Antonio crime data, SATX open data, public safety dashboard, crime statistics San Antonio, open source civic tech, San Antonio tech community, crime heat map, 911 response times, neighborhood safety data"
---

# Visualizing San Antonio's Public Safety Data: SATX-Data Dashboard

Hey San Antonio! We've been working on something pretty cool at our Build Nights, and we wanted to share it with the community. If you've ever wondered what's happening in your neighborhood or wanted to dig into our city's public safety data, we built a dashboard that makes it actually readable.

## What We Built: Open Source Crime Analytics for San Antonio

[SATX-Data](https://satx-data.projects.alamotechcollective.com/) is a web dashboard that pulls data directly from San Antonio's Open Data Portal and turns those massive CSV files into something you can actually understand. Right now it focuses on crime data, arrests, and 911 calls, but we're planning to expand it to other city data like traffic, city services, and more.

The dashboard shows you:
- **Real-time crime trends** for the past 30, 60, or 90 days
- **Neighborhood-specific analytics** showing increases or decreases in incidents
- **Interactive heat maps** of activity by ZIP code (78201-78266)
- **Emergency response times** for 911 calls across San Antonio
- **Crime Severity Index** that weighs different crimes by their actual impact (because a bike theft isn't the same as an assault)

## Why San Antonio Needs Accessible Public Safety Data

San Antonio publishes tons of data through their [Open Data Portal](https://data.sanantonio.gov/), which is awesome for transparency. But if you've ever tried to make sense of a 100,000-row spreadsheet, you know it's not exactly user-friendly. We wanted to bridge that gap.

The city updates this data daily, and our dashboard automatically pulls the latest info every morning at 3 AM CST. So when you check it, you're seeing what happened yesterday, not last month. This real-time approach helps residents, journalists, researchers, and community organizations make informed decisions based on current data.

## The Tech Stack: Building Efficient Data Visualization

For the nerds in the room (we know you're out there), here's what powers SATX-Data:
- **Python Flask** for the backend API
- **SQLite** to store and query the data efficiently  
- **Chart.js** for interactive visualizations
- **Custom REST API** with rate limiting (because our little server can only handle so much)
- **Docker** for easy deployment and scaling
- **GitHub Actions** for automated daily data updates

The source code is [available on GitHub](https://github.com/Alamo-Tech-Collective/SATX-Data) for anyone who wants to contribute or deploy their own instance.

## Beyond Crime: Expanding to All City Data

Right now we're focused on public safety data, but San Antonio publishes datasets on everything from library checkouts to pothole repairs. We want to expand the dashboard to include:

- **Traffic and Transportation**: Real-time traffic incidents, road closures, VIA bus data
- **City Services**: 311 requests, pothole repairs, code compliance
- **Development and Growth**: Building permits, new developments, zoning changes
- **Parks and Recreation**: Park maintenance schedules, facility availability
- **Budget and Spending**: City budget allocations, department spending

Basically, if the city publishes it, we want to make it easy to understand.

## Join Us: Help Build Civic Tech for San Antonio

This is exactly the kind of project we work on at our Build Nights. Every other Tuesday at 7 PM, we get together to build stuff like this - tools that actually help our community. Whether you're a seasoned developer or just curious about programming, you're welcome to join us.

Check out our [Meetup page](https://www.meetup.com/alamotechcollective) to RSVP for the next Build Night. We've got the code, the coffee, and usually some pretty good conversations about what else we could build for San Antonio.

The dashboard is live at [https://satx-data.projects.alamotechcollective.com/](https://satx-data.projects.alamotechcollective.com/) - take a look at your neighborhood's data and let us know what you think. Got ideas for what data we should add next? Come tell us at a Build Night or [drop by our workspace](/contact).

## Understanding the Data: Sources and Methodology

All the data comes straight from [data.sanantonio.gov](https://data.sanantonio.gov/), San Antonio's official open data portal. We don't modify the raw data - we just make it easier to read and analyze. Here's what we're currently tracking:

- **Crime Reports**: Updated daily from SAPD incident reports
- **Arrests**: Booking data from Bexar County
- **911 Calls**: Response times and call types from emergency services
- **Geographic Data**: ZIP code and council district boundaries

The Crime Severity Index we use is based on Federal Sentencing Guidelines - it's not perfect, but it gives a more nuanced view than just counting incidents. For example:
- Property crimes (theft, burglary): Lower weight
- Violent crimes (assault, robbery): Higher weight
- Drug offenses: Variable based on type and quantity

## Privacy and Responsible Data Use

We know crime data can be a heavy topic. But we believe that having access to clear, accurate information about our city helps everyone make better decisions - whether you're:
- Choosing where to live or start a business
- Advocating for resources in your neighborhood
- Researching public safety trends for journalism or academics
- Just trying to understand what's happening around you

All data is aggregated and anonymized. We don't show individual incidents or personal information - just trends and patterns that help paint a picture of public safety in San Antonio.

## Technical Documentation and API Access

For developers and researchers who want to use our data, we provide:
- **Public API endpoints** for all dashboard data (with rate limiting)
- **Documentation** on data formats and update schedules
- **Example code** for integrating with your own projects
- **Docker compose files** for self-hosting

Check our [GitHub repository](https://github.com/Alamo-Tech-Collective/SATX-Data) for full technical documentation and API specs.

## Future Features: What's Coming Next

We're actively developing new features based on community feedback. Some possibilities we're exploring include:

- **Predictive analytics** to identify crime trend patterns
- **Neighborhood watch alert systems** for community safety
- **Mobile-responsive improvements** for better phone access
- **Traffic and transportation data** integration
- **Community reporting features** for citizen engagement
- **Data export tools** for researchers and journalists
- **Historical trend analysis** going back multiple years
- **Comparison tools** between neighborhoods and districts

Want to influence what we build next? Join our [Build Nights](https://www.meetup.com/alamotechcollective) or contribute to the project on GitHub. The best features come from people who actually use the data.

---

*[Alamo Tech Collective](/about) is a hackerspace in San Antonio where people build cool stuff together. We meet every other Tuesday for Build Nights - check [our Meetup](https://www.meetup.com/alamotechcollective) for the next one. No experience required, just bring your curiosity. This project was built entirely by volunteers using open source tools and San Antonio's open data.*

*Keywords: San Antonio crime data, SATX open data portal, public safety dashboard, crime statistics San Antonio TX, open source civic technology, San Antonio tech community, crime heat map, 911 response times, neighborhood safety data, Bexar County crime trends, SAPD data visualization, civic tech San Antonio*