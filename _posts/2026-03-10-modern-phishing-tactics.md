---
layout: post
title: "When 'Trust But Verify' Isn't Enough: Modern Phishing Tactics"
date: 2026-03-10
categories: [cybersecurity, community, ai]
author: "Alamo Tech Collective"
---

Remember when spotting phishing was easy? Bad grammar. Sketchy sender address. Links that practically screamed, "don't click me." Those days are over.

AI has fundamentally changed the game of phishing. That suspicious email now reads as if it came from your actual CFO. The voice on the phone sounds exactly like your boss. That QR code on the parking meter looks completely legitimate. Traditional red flags: the typos, the urgency, the "verify your account" language, are still there. They just don't mean what they used to.

Here are three phishing techniques that are actually working in 2026, and what you can do about them.

## 1. Quishing: When That QR Code Is a Trap
Quishing: QR code phishing has exploded from a novelty to one of the fastest-growing attack vectors. The numbers tell the story: QR-based phishing increased fivefold in 2025, and now accounts for 12% of all phishing attacks, according to security researchers tracking the threat landscape.

Here's why it works so well. When you scan a QR code, you can't see where it's taking you until after the scan. There's no sender email to scrutinize, no misspelled domain to catch. The code itself is just a square of pixels that looks identical whether it's legitimate or malicious. Security filters that scan email text and URLs can't decode QR images, so malicious codes sail through inbox defenses.

Then there's the context problem. QR codes appear in places where you expect them and where you're primed to trust them. Restaurant table? Scan the menu. Parking meter? Scan to pay. Conference badge? Scan to register. That mental shift from "email from stranger" to "physical thing in front of me" lowers your guard.


Attackers exploit this ruthlessly. They print stickers with malicious QR codes and slap them over legitimate ones on parking meters, package delivery notices, and event posters. When you scan, you land on a fake payment page or credential harvester that looks completely real. In January 2026, the [the FBI issued an alert](https://www.ic3.gov/CSA/2026/260108.pdf) specifically about North Korean state-sponsored actors using QR codes embedded in spear phishing emails to bypass traditional security controls and harvest credentials.

The mobile factor makes this worse. When you scan a QR code from your work email on your personal phone, you've just moved the attack outside your corporate security perimeter. Your personal device probably doesn't have the same endpoint protection, web filtering, or monitoring. The attack succeeds in a space where IT can't see it.

**How to defend:**
- Preview URLs before following them. Most modern QR scanner apps show you the destination before opening it.
- Be suspicious of QR code stickers, especially on payment systems or official notices. If it looks like it could peel off, it probably shouldn't be trusted.
- For sensitive actions, use official apps or websites you navigate to directly rather than scanning codes.
- Organizations: implement code words or out-of-band verification for any request that originates from a QR code scan.

## 2. AI Voice Cloning: Your Boss Calling (Except It's Not)
Voice used to be a trusted signal. If it sounded like your manager, it probably was your manager. That assumption is now dangerously outdated.

AI voice cloning technology has reached the point where it can produce a convincing replica of someone's voice from only three seconds of audio. Not a perfect replica; a convincing one. And when you are on a phone call with compressed audio, background noise, and the expectation that you're talking to someone you know, "convincing" is more than enough.

The statistics are grim. Vishing (voice phishing) surged 442% in 2024 and now accounts for over 60% of phishing-related incident response engagements. Deepfake-enabled fraud losses are projected to reach $40 billion globally by 2027. This isn't a future threat; it's happening now.

In early 2025, fraudsters cloned the voice of Italy's Defense Minister Guido Crosetto and called high-profile business leaders claiming that kidnapped journalists needed urgent ransom payments. At least one victim transferred nearly one million euros before police intervened. Researchers at NCC Group demonstrated real-time voice-cloning attacks against real organizations and successfully convinced staff to share sensitive information and perform unauthorized actions.

Here's how these attacks work. Attackers scrape audio from LinkedIn videos, conference presentations, earnings calls, podcast interviews, anywhere executives speak publicly. They feed that audio into AI voice synthesis tools that can generate speech in real time. Then they call help desks, finance teams, or IT support, claiming to be locked out of their account, stuck in an airport without their laptop, or needing an urgent wire transfer approved.

The psychological pressure is intense. You hear a voice you recognize, making a request that sounds plausible, often with time pressure. "I'm in a meeting with investors and can't access the deck." "The client needs payment today, or we lose the contract." Your brain pattern-matches the voice to the person, and you want to help.

**How to defend:**
- Never approve sensitive actions, password resets, MFA enrollment changes, or financial transfers based solely on a phone call, no matter how authentic the voice sounds.
- Implement callback procedures using phone numbers from your corporate directory, not the caller’s number.
- Use code words or verification phrases for high-stakes requests. Establish these in advance and change them regularly.
- For organizations: require two-person approval for financial transfers or privilege escalations, with verification happening through separate channels.
- Limit public exposure of executives and others with access to sensitive systems. The less audio available, the harder it is to build a convincing clone.

## 3. Phishing-as-a-Service Kits That Bypass MFA
"We have Multi Factor Authentication (MFA), so we're protected from phishing." That sentence is no longer true.

Phishing-as-a-Service (PhaaS) platforms have industrialized credential theft. These are subscription-based toolkits that give attackers everything they need to launch sophisticated campaigns: infrastructure, templates, proxy servers, and most critically, built-in multi-factor authentication bypass.

The most prominent example is EvilProxy, which launched more than 1 million attacks per month throughout 2025. But it's part of a broader ecosystem. By the end of 2026, over 90% of credential compromise attacks are expected to be enabled by phishing kits, accounting for more than 60% of all phishing incidents. The number of available kits doubled in 2025 alone.

Here's what makes these kits so effective. They use reverse proxy techniques to sit between the victim and the legitimate service. When you land on the phishing page and enter your credentials, the kit relays them to the real site in real time. You get the real MFA prompt. You approve it. The kit captures your session token (the cookie that proves you've authenticated) and hands it to the attacker. They can now access your account without needing your password or MFA device.

This bypasses traditional MFA methods like SMS codes, authenticator apps, and even push notifications. The attacker isn't trying to crack your authentication; they're letting you authenticate and then stealing the proof that you did.

The attacks are getting more sophisticated. Many kits now include CAPTCHA pages (both real Cloudflare Turnstile and fake versions) to block security scanners from analyzing the phishing sites. They use complex redirect chains to bury the malicious page behind multiple legitimate-looking URLs. They adapt their landing pages based on the victim's device, browser, and location to avoid detection.

**How to defend:**
- Implement phishing-resistant MFA. This means FIDO2 security keys or passkeys, authentication methods that use cryptographic verification and only work on the legitimate domain. They can't be relayed or replayed.
- SMS codes and authenticator apps are better than nothing, but they're no longer sufficient against sophisticated attacks.
- Train users to recognize adversary-in-the-middle scenarios, such as multiple redirects, unusual authentication flows, or requests to approve MFA for "security verification."
- Monitor for suspicious authentication patterns: logins from unusual locations immediately after MFA approval, or session tokens being used from multiple geographic locations.
- Organizations should move toward zero-trust architectures where authentication is just the first gate, not the only one.

## The Common Thread
All three of these techniques share a critical characteristic: they bypass traditional technical defenses by exploiting trust rather than finding software vulnerabilities.

You can have the best email filters in the world, but they won't decode a malicious QR code. Your firewall won't catch a voice call. Your endpoint protection can't stop a phishing kit that uses your own authentication against you.

The shift happening in security right now is from "detect the bad thing" to "verify everything, even the things that look good." That QR code looks fine; verify the URL just to be sure. That voice sounds right; call back anyway. That login page seems legitimate; use a hardware key anyway.

This is what "zero trust" actually means in practice. It's not about paranoia; it's about recognizing that "looks trustworthy" and "is trustworthy" are no longer the same thing.

## What You Can Do Right Now
**For individuals:**
- Enable FIDO2 security keys or passkeys on your critical accounts (email, banking, work systems).
- Preview every QR code URL before following it. Don't scan random stickers.
- Never approve sensitive requests over the phone without independent verification, regardless of who the caller sounds like.
- Be extremely cautious of urgency and time pressure; these are deliberate manipulation tactics.

**For organizations:**
- Update security awareness training to include these specific attack vectors. Generic "spot the phishing email" training is no longer sufficient.
- Implement out-of-band verification for high-risk actions: financial transfers, password resets, system access changes.
- Deploy phishing-resistant authentication wherever possible, starting with privileged accounts and financial systems.
- Create clear protocols for handling suspicious QR codes and unexpected voice calls.
- Conduct tabletop exercises specifically around social engineering scenarios, not just technical incidents.

## This Is Just the Start
These three techniques represent where phishing is right now. By the time you read this, attackers will already be testing the next evolution.

On March 14, [Ben Mickens will be breaking down AI-enhanced social engineering](https://www.meetup.com/alamotechcollective/events/313620268/) at Alamo Tech Collective, covering not just what these attacks look like but what actually works to defend against them. Whether you're a developer, security professional, or just someone who answers phones and reads email, this directly affects you.

The good news? Understanding how these attacks work is the first step: do not fall for them. The bad news? "Trust but verify" isn't enough anymore. In 2026, it's "verify, then verify again, then verify through a different channel."

---
## References & Further Reading
### Quishing (QR Code Phishing)
1. **Keepnet Labs. (2026, January 29).** "QR Phishing Statistics: Quishing Trends (Updated February 2026)."  
   <a href="https://keepnetlabs.com/blog/qr-code-phishing-trends-in-depth-analysis-of-rising-quishing-statistics" target="_blank">Read More</a>

2. **FBI Internet Crime Complaint Center. (2026, January 8).** "FLASH Number AC-000001-MW: North Korean Kimsuky Actors Leverage Malicious QR Codes in Spearphishing Campaigns Targeting U.S. Entities."  
   <a href="https://www.ic3.gov/CSA/2026/260108.pdf" target="_blank">Read More</a>

3. **Cloudflare. (n.d.).** "What is quishing?"  
   <a href="https://www.cloudflare.com/learning/security/what-is-quishing/" target="_blank">Read More</a>  

4. **Hoxhunt. (2026, January 7).** "QR Code Phishing (Quishing) Explained + Printable QR Stickers."  
   <a href="https://hoxhunt.com/blog/quishing" target="_blank">Read More</a>

5. **Palo Alto Networks Unit 42. (2026, February).** "Phishing on the Edge of the Web and Mobile Using QR Codes."  
   <a href="https://unit42.paloaltonetworks.com/qr-codes-as-attack-vector/" target="_blank">Read More</a>

6. **CloudSEK. (2026).** "Top 11 Trends in Phishing Attacks In 2026."  
   <a href="https://www.cloudsek.com/knowledge-base/top-phishing-attack-trends" target="_blank">Read More</a>

### AI Voice Cloning & Vishing
7. **Vectra AI. (2026, March).** "Vishing explained: how voice phishing attacks target enterprises."  
   <a href="https://www.vectra.ai/topics/vishing" target="_blank">Read More</a>

8. **ThreatLocker Blog. (2025, November 17).** "AI voice cloning and vishing attacks: What every business must know."  
   <a href="https://www.threatlocker.com/blog/ai-voice-cloning-and-vishing-attacks-what-every-business-must-know" target="_blank">Read More</a>

9. **Group-IB. (2025, September 5).** "The Anatomy of a Deepfake Voice Phishing Attack: How AI-Generated Voices Are Powering the Next Wave of Scams."  
   <a href="https://www.group-ib.com/blog/voice-deepfake-scams/" target="_blank">Read More</a>

10. **Dark Reading. (2025, September 30).** "AI-Powered Voice Cloning Raises Vishing Risks."  
    <a href="https://www.darkreading.com/cyberattacks-data-breaches/ai-voice-cloning-vishing-risks" target="_blank">Read More</a>

11. **TechNewsWorld. (2025, October 1).** "Real-Time AI Voice Cloning Powers Convincing Vishing Attacks."  
    <a href="https://www.technewsworld.com/story/researchers-mount-vishing-attacks-with-real-time-voice-cloning-179945.html" target="_blank">Read More</a>

12. **Google Cloud Blog. (2024, July 23).** "AI-Powered Voice Spoofing for Next-Gen Vishing Attacks."  
    <a href="https://cloud.google.com/blog/topics/threat-intelligence/ai-powered-voice-spoofing-vishing-attacks" target="_blank">Read More</a>

13. **DeepStrike. (2025, October 20).** "Vishing Statistics 2025: AI Deepfakes & the $40B Voice Scam Surge."  
    <a href="https://deepstrike.io/blog/vishing-statistics-2025" target="_blank">Read More</a>

14. **Kymatio. (2026).** "Phishing Trends 2026: AI-Phishing, QRishing & Voice Deepfakes."  
    <a href="https://kymatio.com/blog/phishing-trends-ai-phishing-qrishing-and-voice-attacks" target="_blank">Read More</a>

### Phishing-as-a-Service (PhaaS) & MFA Bypass
15. **Barracuda Networks. (2025, December 5).** "Frontline security predictions 2026: The phishing techniques to prepare for."  
    <a href="https://blog.barracuda.com/2025/11/24/frontline-security-predictions-2026-phishing-techniques" target="_blank">Read More</a>

16. **Spacelift. (2026, January 1).** "Top 54 Phishing Attack Statistics & Latest Trends for 2026."  
    <a href="https://spacelift.io/blog/phishing-statistics" target="_blank">Read More</a>

17. **Cofense. (2026).** "2026 Phishing Threat Predictions: 5 Key Takeaways."  
    <a href="https://cofense.com/blog/2026-phishing-threat-predictions-5-key-takeaways" target="_blank">Read More</a>

18. **Push Security. (2025, December 15).** "Analysing 2025's top phishing trends."  
    <a href="https://pushsecurity.com/blog/2025-top-phishing-trends" target="_blank">Read More</a>

19. **ANY.RUN / HackRead. (2026, March 4).** "Phishing in 2026: 3 Attack Tactics That Beat Most Enterprise Defenses."  
    <a href="https://hackread.com/phishing-2026-attack-tactics-beat-enterprise-defenses/" target="_blank">Read More</a>

### General Phishing Trends & Statistics
20. **Keepnet. (2026, January 29).** "2025 Phishing Statistics: (Updated January 2026)."  
    <a href="https://keepnetlabs.com/blog/top-phishing-statistics-and-trends-you-must-know" target="_blank">Read More</a>

21. **BrightDefense. (2026, February).** "200+ Phishing Statistics for 2026."  
    <a href="https://www.brightdefense.com/resources/phishing-statistics/" target="_blank">Read More</a>

22. **CyberTec Security. (2026).** "Why Phishing Is Still the #1 Cyber Threat in 2026."  
    <a href="https://info.cybertecsecurity.com/why-phishing-is-still-the-1-cyber-threat-in-2026" target="_blank">Read More</a>

23. **WebProNews. (2026, January 23).** "Advanced Phishing Kits Use AI Voice Cloning for Vishing Scams."  
    <a href="https://www.webpronews.com/advanced-phishing-kits-use-ai-voice-cloning-for-vishing-scams/" target="_blank">Read More</a>

### Defense & Mitigation
24. **McAfee Blog. (2026, February 5).** "What Is Quishing? How QR Code Scams Work and How to Avoid Them."  
    <a href="https://www.mcafee.com/blogs/tips-tricks/what-is-quishing-how-qr-code-scams-work-and-how-to-avoid-them/" target="_blank">Read More</a>

25. **Check Point Software.** "What is Quishing (QR Phishing)?"  
    <a href="https://www.checkpoint.com/cyber-hub/threat-prevention/what-is-phishing/what-is-quishing-qr-phishing/" target="_blank">Read More</a>

### Event Information
27. **Alamo Tech Collective Meetup. (2026, March 9).** "AI Social Engineering: Part 2 - Tech Talk with Ben Mickens."  
    <a href="https://www.meetup.com/alamotechcollective/events/313620268/" target="_blank">Read More</a>