import type { PersonalInfo, SkillCategoryInfo, Skill, Certificate, Project, TimelineEntry } from '../types/portfolio';

/**
 * =============================================================================
 * CENTRAL PORTFOLIO DATA CONFIGURATION
 * =============================================================================
 * Configured for: ADAM CHOUIOUKH
 * Theme: Penetration Tester & Red Team Specialist
 */

export const personalInfo: PersonalInfo = {
  name: "ADAM CHOUIOUKH",
  initials: "AC",
  codename: "RED TEAM OPERATOR // 0xAC",
  title: "SECURING THE DIGITAL FRONTIER",
  subtitle: "Penetration Tester | Ethical Hacker | Offensive Security Specialist",
  shortIntro: "Executing active reconnaissance, vulnerability exploitation, and applied cryptography to audit, challenge, and fortify enterprise perimeters.",
  
  // Real photo from user's Desktop
  profileImage: `${import.meta.env.BASE_URL}images/profile.png`,
  
  // Link to your resume/CV
  cvUrl: "#contact",
  
  // Status displayed in the HUD
  status: "SYSTEM ONLINE // RED TEAM ACTIVE",
  location: "Global / Security Operations",
  
  email: "adamchouioukh0@gmail.com",
  github: "https://github.com/adamchouioukh0-design",
  linkedin: "https://www.linkedin.com/in/adam-chouioukh-13043a373/",
  
  // Operational DEFCON Status (1 = Maximum Active Engagement)
  defconLevel: 1,
  pgpKeyId: "7F21 AC09 9E4D 58BA",

  bio: {
    whoIAm: "I am Adam Chouioukh, an offensive cybersecurity specialist and penetration tester dedicated to finding and remediating critical system vulnerabilities before adversaries can exploit them. My methodology combines deep OSINT reconnaissance, network protocol analysis, web application exploitation, and formal cryptographic validation.",
    cyberInterests: [
      "Penetration Testing & Red Team Simulations",
      "Open Source Intelligence (OSINT) & Target Reconnaissance",
      "Applied Cryptography & Protocol Cryptanalysis",
      "Network Protocol Exploitation & Traffic Dissection",
      "Web Application Security (OWASP Top 10) & Threat Modeling"
    ],
    learningJourney: "Constantly sharpening offensive techniques across real-world labs on TryHackMe (Pre-Security, Advent of Cyber 2025, Cybersecurity 101), advancing open-source reconnaissance through Security Blue Team, and mastering theoretical and applied cryptography with Stanford University.",
    professionalGoals: "To deliver high-impact penetration testing and red-teaming engagements for critical infrastructure, uncover hidden zero-day attack surfaces, and partner with forward-thinking engineering teams to implement battle-tested defensive architectures."
  },

  stats: [
    {
      id: "certs",
      label: "Certifications",
      value: "5",
      description: "Official Verified Credentials"
    },
    {
      id: "labs",
      label: "Hands-on Labs",
      value: "75+",
      description: "TryHackMe & Virtual Offensive Rooms"
    },
    {
      id: "projects",
      label: "Security Labs",
      value: "6",
      description: "Custom Network & Exploit Codebases"
    },
    {
      id: "protocols",
      label: "Threat Vectors",
      value: "15+",
      description: "Audited Attack & Recon Methodologies"
    }
  ]
};

export const skillCategories: SkillCategoryInfo[] = [
  {
    id: 'offensive',
    title: 'Offensive Security',
    code: 'SEC-OFF',
    badge: 'Red Team',
    description: 'Methodologies and techniques for finding and exploiting system vulnerabilities responsibly.',
    icon: 'Crosshair'
  },
  {
    id: 'networking',
    title: 'Networking & Infrastructure',
    code: 'NET-OPS',
    badge: 'Foundations',
    description: 'Deep understanding of network architectures, protocol stacks, routing, and packet flow.',
    icon: 'Network'
  },
  {
    id: 'tools',
    title: 'Security Tools',
    code: 'TOOL-KIT',
    badge: 'Arsenal',
    description: 'Industry-standard penetration testing, packet analysis, and reconnaissance software.',
    icon: 'Wrench'
  },
  {
    id: 'programming',
    title: 'Programming & Scripting',
    code: 'DEV-SEC',
    badge: 'Automation',
    description: 'Building custom security tools, automating reconnaissance, and analyzing malicious scripts.',
    icon: 'Terminal'
  },
  {
    id: 'defensive',
    title: 'Defensive Security',
    code: 'SEC-DEF',
    badge: 'Blue Team',
    description: 'Monitoring, anomaly detection, log parsing, and incident response fundamentals.',
    icon: 'ShieldCheck'
  }
];

export const skillsData: Skill[] = [
  // A. Offensive Security
  {
    name: "Penetration Testing",
    category: "offensive",
    description: "Systematic methodology to test systems, uncover misconfigurations, and document security findings.",
    commandExample: "npx recon-pipeline -t 10.10.10.0/24 -m aggressive",
    tags: ["Red Teaming", "Methodology", "Reporting"],
    iconName: "Target"
  },
  {
    name: "Open Source Intelligence (OSINT)",
    category: "offensive",
    description: "Deep passive and active reconnaissance, domain footprinting, public records harvesting, and identity mapping.",
    commandExample: "amass enum -d target.corp -active -p 80,443,8080",
    tags: ["OSINT", "Security Blue Team", "Footprinting", "Recon"],
    iconName: "Search"
  },
  {
    name: "Applied Cryptography",
    category: "offensive",
    description: "Cryptanalysis of symmetric ciphers (AES/DES), HMAC authentication, RSA/ECC public key mathematics, and key exchange.",
    commandExample: "openssl pkeyutl -encrypt -pubin -inkey pubkey.pem -in payload.txt -out payload.enc",
    tags: ["Stanford University", "AES-GCM", "RSA", "Diffie-Hellman", "Hashes"],
    iconName: "Lock"
  },
  {
    name: "Web Application Security",
    category: "offensive",
    description: "Identifying vulnerabilities including SQL Injection, XSS, CSRF, IDOR, and broken access controls.",
    commandExample: "sqlmap -u 'http://target.local/item?id=1' --batch --banner",
    tags: ["OWASP Top 10", "Burp Suite", "HTTP Headers"],
    iconName: "Globe"
  },

  // B. Networking
  {
    name: "TCP/IP Protocol Suite",
    category: "networking",
    description: "In-depth understanding of the 4-layer and 7-layer OSI models, three-way handshakes, and flags.",
    commandExample: "tcpdump -nn -v -i eth0 'tcp[tcpflags] & (tcp-syn) != 0'",
    tags: ["OSI Model", "Handshakes", "Flow Control"],
    iconName: "Layers"
  },
  {
    name: "DNS Architecture & Security",
    category: "networking",
    description: "Resolution hierarchy, record types (A, AAAA, MX, TXT, PTR), zone transfers, and DNSSEC validation.",
    commandExample: "dig @8.8.8.8 axfr target.local +multiline",
    tags: ["Zone Transfers", "DNSSEC", "Resolution Hierarchy"],
    iconName: "Server"
  },
  {
    name: "DHCP Operations & Snooping",
    category: "networking",
    description: "DORA process (Discover, Offer, Request, Acknowledge), scope pools, leases, and DHCP snooping defenses.",
    commandExample: "dhcping -c 192.168.1.1 -s 192.168.1.254 -h 00:11:22:33:44:55",
    tags: ["DORA Sequence", "Relay Agents", "Starvation Defense"],
    iconName: "Wifi"
  },
  {
    name: "VLANs & Subnet Routing",
    category: "networking",
    description: "802.1Q encapsulation, trunking, inter-VLAN routing, CIDR subnetting, and broadcast isolation.",
    commandExample: "ip route show / vlan config eth0.100",
    tags: ["802.1Q Trunking", "CIDR", "Broadcast Domains"],
    iconName: "GitFork"
  },
  {
    name: "Network Traffic Analysis",
    category: "networking",
    description: "Capturing, filtering, and dissecting raw packet streams to detect anomalies and covert channels.",
    commandExample: "tshark -r capture.pcap -Y 'http.request.method == \"POST\"'",
    tags: ["PCAP Parsing", "Protocol Dissection", "Baseline Analysis"],
    iconName: "Activity"
  },

  // C. Security Tools
  {
    name: "Kali Linux",
    category: "tools",
    description: "Mastery of the Debian-derived offensive Linux distribution and custom security testing environments.",
    commandExample: "uname -a && cat /etc/os-release",
    tags: ["Offensive OS", "Package Mgmt", "Custom Kernels"],
    iconName: "Cpu"
  },
  {
    name: "Nmap",
    category: "tools",
    description: "Advanced port scanning, OS fingerprinting, service detection, and Nmap Scripting Engine (NSE) scripts.",
    commandExample: "nmap -sC -sV -p- -T4 -oA nmap_scan 192.168.1.10",
    tags: ["NSE Scripts", "Stealth SYN Scans", "Service Detection"],
    iconName: "Radar"
  },
  {
    name: "Wireshark",
    category: "tools",
    description: "Deep packet inspection, stream reassembly, statistical packet analysis, and custom display filters.",
    commandExample: "wireshark -k -i any -f 'tcp port 443'",
    tags: ["Deep Packet Inspection", "Stream Follow", "Filter Syntax"],
    iconName: "Eye"
  },
  {
    name: "Burp Suite",
    category: "tools",
    description: "Intercepting HTTP/S proxies, Repeater testing, Intruder payload fuzzing, and automated vulnerability scanning.",
    commandExample: "burpsuite --project-file=audit_workspace.burp",
    tags: ["HTTP Proxy", "Repeater", "Intruder Fuzzing"],
    iconName: "Sliders"
  },
  {
    name: "Metasploit Framework",
    category: "tools",
    description: "Exploit execution, payload generation with msfvenom, handler configuration, and post-exploitation modules.",
    commandExample: "msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD ...'",
    tags: ["Payload Gen", "Multi-Handler", "Exploit Modules"],
    iconName: "Zap"
  },
  {
    name: "Linux Command Line",
    category: "tools",
    description: "Advanced shell proficiency: sed, awk, grep, file permissions, process monitoring, and system services.",
    commandExample: "grep -E 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c",
    tags: ["Text Processing", "Permissions", "Daemon Mgmt"],
    iconName: "Terminal"
  },

  // D. Programming and Scripting
  {
    name: "Python for Penetration Testing",
    category: "programming",
    description: "Socket programming, Scapy packet manipulation, automated vulnerability fuzzers, and API security testing.",
    commandExample: "python3 -c 'import socket; s=socket.socket(); s.connect((\"127.0.0.1\", 80))'",
    tags: ["Scapy", "Socket API", "Requests", "Automation"],
    iconName: "Code"
  },
  {
    name: "Bash Scripting",
    category: "programming",
    description: "Crafting automated audit scripts, log parsing routines, system hardening checks, and environment setup.",
    commandExample: "for ip in $(cat ips.txt); do ping -c 1 $ip >/dev/null && echo $ip UP; done",
    tags: ["Shell Automation", "Cron Tasks", "Pipes & Streams"],
    iconName: "FileCode"
  },
  {
    name: "Git & GitHub",
    category: "programming",
    description: "Version control for security tooling, reproducible security labs, branch management, and CI/CD security checks.",
    commandExample: "git log --oneline --graph --decorate",
    tags: ["Version Control", "Repositories", "Open Source"],
    iconName: "GitBranch"
  },

  // E. Defensive Security
  {
    name: "Log Analysis & Threat Forensics",
    category: "defensive",
    description: "Aggregating and querying auth logs, web access logs, syslog, and Windows Event logs for indicators of compromise (IOCs).",
    commandExample: "journalctl -u sshd -g 'Failed' -n 50 --no-pager",
    tags: ["Syslog", "Event Viewer", "IOC Detection"],
    iconName: "FileText"
  },
  {
    name: "Security Monitoring",
    category: "defensive",
    description: "Configuring host and network monitoring, alert rule creation, baseline divergence tracking, and SIEM concepts.",
    commandExample: "snort -dev -l ./logs -c /etc/snort/snort.conf",
    tags: ["SIEM Concepts", "Snort / Suricata", "Alert Triage"],
    iconName: "Shield"
  },
  {
    name: "Incident Response Fundamentals",
    category: "defensive",
    description: "NIST/SANS incident lifecycle: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.",
    commandExample: "volatility -f memory.dump --profile=Win10x64 pslist",
    tags: ["NIST Framework", "Containment", "Triage Process"],
    iconName: "LifeBuoy"
  }
];

export const certificatesData: Certificate[] = [
  {
    id: "cert-01",
    title: "Introduction to OSINT",
    issuer: "Security Blue Team",
    issueDate: "Verified Credential",
    credentialId: "SBT-OSINT-COURSE",
    image: `${import.meta.env.BASE_URL}images/certificates/cert-osint.svg`,
    pdfUrl: "/certificates/Introduction-to-OSINT-course.pdf",
    description: "Comprehensive Open Source Intelligence training covering digital investigation methodologies, geolocation, advanced search operators, domain footprinting, and deep-web target profiling.",
    skills: ["OSINT Reconnaissance", "Domain Footprinting", "Social Media Forensics", "Data Verification", "Threat Mapping"],
    status: "VERIFIED",
    category: "Offensive"
  },
  {
    id: "cert-02",
    title: "Advent of Cyber 2025",
    issuer: "TryHackMe",
    issueDate: "December 2025",
    credentialId: "THM-DLZQB64DET",
    verificationUrl: "https://tryhackme.com",
    image: `${import.meta.env.BASE_URL}images/certificates/cert-thm-aoc.svg`,
    pdfUrl: "/certificates/THM-Advent-of-Cyber-2025.pdf",
    description: "Intensive 24-day practical hands-on offensive & defensive cybersecurity challenge tackling web exploitation, memory forensics, network sniffing, reverse engineering, and threat detection.",
    skills: ["Web Exploitation", "Network Forensics", "Log Analysis", "Threat Detection", "Privilege Escalation"],
    status: "VERIFIED",
    category: "Offensive"
  },
  {
    id: "cert-03",
    title: "Pre-Security Learning Path",
    issuer: "TryHackMe",
    issueDate: "Verified Credential",
    credentialId: "THM-WCF5XJSZJO",
    verificationUrl: "https://tryhackme.com",
    image: `${import.meta.env.BASE_URL}images/certificates/cert-thm-presec.svg`,
    pdfUrl: "/certificates/THM-Pre-Security.pdf",
    description: "Foundational cybersecurity curriculum mastering TCP/IP networking, OSI model layers, web application fundamentals, Linux command line security, and Windows system architecture.",
    skills: ["TCP/IP Protocols", "OSI Model", "Web App Architecture", "Linux OS Internals", "Networking"],
    status: "VERIFIED",
    category: "Networking"
  },
  {
    id: "cert-04",
    title: "Cybersecurity 101 Path",
    issuer: "TryHackMe",
    issueDate: "Verified Credential",
    credentialId: "THM-2XRAKAPUUO",
    verificationUrl: "https://tryhackme.com",
    image: `${import.meta.env.BASE_URL}images/certificates/cert-thm-cyber101.svg`,
    pdfUrl: "/certificates/THM-Cybersecurity-101.pdf",
    description: "Core cybersecurity learning path covering defense-in-depth principles, threat modeling, security governance, endpoint defense, network security architecture, and cryptography.",
    skills: ["Defense in Depth", "Threat Modeling", "Endpoint Protection", "Network Security", "Cryptography"],
    status: "VERIFIED",
    category: "Defensive"
  },
  {
    id: "cert-05",
    title: "Cryptography I",
    issuer: "Stanford University (via Coursera)",
    issueDate: "Verified Credential",
    credentialId: "V19VIE1BG3CJ",
    verificationUrl: "https://coursera.org/verify/V19VIE1BG3CJ",
    image: `${import.meta.env.BASE_URL}images/certificates/cert-stanford-crypto.jpg`,
    pdfUrl: "/certificates/Stanford-Cryptography-1.jpg",
    description: "Rigorous academic cryptography course taught by Prof. Dan Boneh covering symmetric encryption (AES/DES), message authentication codes (HMAC), public key cryptography (RSA, ElGamal, Diffie-Hellman), and cryptanalysis.",
    skills: ["Symmetric Ciphers (AES/CBC)", "HMAC Authentication", "Public Key Cryptography", "RSA & Diffie-Hellman", "Cryptanalysis"],
    status: "VERIFIED",
    category: "Offensive"
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-01",
    title: "Python IP & Port Scanner",
    slug: "python-ip-port-scanner",
    category: "development",
    image: `${import.meta.env.BASE_URL}images/projects/port-scanner.svg`,
    shortDescription: "Multithreaded network exploration utility for fast port discovery, service banner grabbing, and subnet host auditing.",
    problemAddressed: "Traditional manual socket scanning can be sluggish across large subnets (/24 networks) and often lacks flexible output formatting for downstream audit pipelines.",
    technicalImplementation: "Engineered in Python using socket programming with concurrent.futures ThreadPoolExecutor. Implemented TCP SYN/Connect routines, dynamic port chunking, custom timeout tuning, and automated service banner identification with JSON/CSV export.",
    technologies: ["Python 3", "Socket API", "ThreadPoolExecutor", "Argparse", "JSON"],
    githubUrl: "https://github.com/adamchouioukh0-design/python-port-scanner",
    liveDemoUrl: "#terminal",
    keyLessonsLearned: [
      "Optimizing thread concurrency and socket timeouts to prevent network congestion.",
      "Handling TCP handshake edge cases, resets (RST), and firewall dropping behavior.",
      "Designing clean CLI interfaces with real-time ANSI progress indicators."
    ],
    featured: true,
    attackVectors: ["Port Enumeration", "Banner Grabbing", "Firewall Rule Fingerprinting"],
    mitigations: ["Rate Limiting", "Port Knocking", "IDS/IPS Detection Rules"],
    architectureSummary: "Client CLI -> Thread Worker Pool -> Non-blocking Socket Probe -> Banner Parser -> Structured Report"
  },
  {
    id: "proj-02",
    title: "Network Reconnaissance Toolkit",
    slug: "network-recon-toolkit",
    category: "offensive",
    image: `${import.meta.env.BASE_URL}images/projects/recon-toolkit.svg`,
    shortDescription: "Automated bash & Python orchestration framework for domain reconnaissance, DNS enumeration, and technology footprinting.",
    problemAddressed: "Security auditors waste hours manually running disparate reconnaissance tools and formatting the resulting findings into actionable attack surface maps.",
    technicalImplementation: "Developed a modular orchestration pipeline combining passive OSINT (certificate transparency logs, DNS queries) with active probes. Integrates results into a unified markdown assessment report with visual target graphs.",
    technologies: ["Python", "Bash", "Sublist3r", "Nmap Scripting Engine", "Markdown"],
    githubUrl: "https://github.com/adamchouioukh0-design/recon-toolkit",
    keyLessonsLearned: [
      "Rate-limiting queries against public DNS servers to avoid temporary IP bans.",
      "Sanitizing untrusted target outputs to prevent shell injection vulnerabilities.",
      "Asynchronous data aggregation from multiple REST APIs and DNS record streams."
    ],
    featured: true,
    attackVectors: ["Subdomain Hijacking", "Exposed Development Ports", "Unlinked DNS Records"],
    mitigations: ["DNS Hygiene", "Proper SPF/DMARC/DKIM Records", "Internal Host IP Privacy"],
    architectureSummary: "Target Input -> Passive OSINT Worker -> Active DNS Verifier -> Service Fingerprinter -> Consolidated Report"
  },
  {
    id: "proj-03",
    title: "DNS Configuration & Troubleshooting Lab",
    slug: "dns-troubleshooting-lab",
    category: "networking",
    image: `${import.meta.env.BASE_URL}images/projects/dns-lab.svg`,
    shortDescription: "Complete virtual enterprise DNS infrastructure setup with authoritative servers, forwarding resolvers, and DNSSEC validation.",
    problemAddressed: "Misconfigured DNS servers lead to domain hijacking, cache poisoning, resolution latency, and accidental exposure of internal topologies via zone transfers.",
    technicalImplementation: "Configured dual BIND9 DNS servers in a segregated virtual environment (primary & secondary). Implemented TSIG keys for secure zone transfers, configured split-horizon DNS views, and enforced cryptographically signed DNSSEC resource records.",
    technologies: ["BIND 9", "Linux", "DNSSEC", "Wireshark", "Dig / Nslookup"],
    githubUrl: "https://github.com/adamchouioukh0-design/dns-lab",
    keyLessonsLearned: [
      "Mastering RRSIG, DNSKEY, and DS record generation and validation chains.",
      "Diagnosing lookup failures and packet fragmentation with tcpdump and dig.",
      "Securing zone transfer permissions (AXFR) strictly to authorized secondary IPs."
    ],
    featured: false,
    attackVectors: ["DNS Cache Poisoning", "Unauthorized Zone Transfers (AXFR)", "Amplification Attacks"],
    mitigations: ["TSIG Authentication", "DNSSEC Cryptographic Signing", "Response Rate Limiting (RRL)"],
    architectureSummary: "Client Query -> Forwarding Resolver -> DNSSEC Cryptographic Validation -> Split Horizon Authoritative BIND Daemon"
  },
  {
    id: "proj-04",
    title: "DHCP Server & Relay Agent Lab",
    slug: "dhcp-server-relay-lab",
    category: "networking",
    image: "/images/projects/dhcp-lab.svg",
    shortDescription: "Multi-VLAN DHCP architecture with Cisco router relay agents, option parameters, and DHCP snooping security controls.",
    problemAddressed: "Broadcast domains cannot naturally cross routers without relay agents, and unprotected DHCP infrastructure is highly vulnerable to rogue server and starvation attacks.",
    technicalImplementation: "Built a segmented network topology containing 3 separate VLANs. Implemented ISC-DHCP-Server on Linux, configured Cisco ip helper-address relay forwarding, and enabled DHCP Snooping with Option 82 insertion on switch trunks to drop untrusted offers.",
    technologies: ["ISC DHCP", "Cisco IOS", "GNS3 / Packet Tracer", "Wireshark", "802.1Q"],
    githubUrl: "https://github.com/adamchouioukh0-design/dhcp-relay-lab",
    keyLessonsLearned: [
      "Analyzing the 4-step DORA packet exchange and unicast relay transformations.",
      "Configuring DHCP option parameters (Option 3 Gateway, Option 6 DNS, Option 15 Domain).",
      "Validating DHCP Snooping binding databases and port trust designations."
    ],
    featured: false,
    attackVectors: ["DHCP Starvation (MAC spoofing)", "Rogue DHCP Server MITM"],
    mitigations: ["DHCP Snooping", "Port Security (MAC Limit)", "Dynamic ARP Inspection (DAI)"],
    architectureSummary: "Client Discover (Broadcast) -> Relay Agent (Unicast Giaddr) -> DHCP Server -> Offer Response -> Trusted Port Forward"
  },
  {
    id: "proj-05",
    title: "Network Traffic Analysis with Wireshark",
    slug: "network-traffic-analysis-wireshark",
    category: "defensive",
    image: "/images/projects/traffic-analysis.svg",
    shortDescription: "Comprehensive packet dissection lab investigating malware beaconing, cleartext credentials, and TCP anomalies in PCAP captures.",
    problemAddressed: "Encrypted traffic and high-volume packet streams conceal data exfiltration, command-and-control (C2) heartbeats, and lateral movement.",
    technicalImplementation: "Analyzed over 500MB of captured PCAP data using Wireshark and Tshark. Extracted HTTP payloads, reconstructed TCP sessions, isolated DNS tunneling attempts through entropy calculations, and built custom display filter profiles for SOC analysts.",
    technologies: ["Wireshark", "Tshark", "NetworkMiner", "PCAP Analysis", "Regex"],
    githubUrl: "https://github.com/adamchouioukh0-design/traffic-analysis-wireshark",
    keyLessonsLearned: [
      "Recognizing subtle indicators of Cobalt Strike and Meterpreter HTTP beaconing patterns.",
      "Extracting transmitted binaries and SSL/TLS certificates directly from raw packet streams.",
      "Writing reusable Wireshark display filters to reduce analysis triage time by 80%."
    ],
    featured: true,
    attackVectors: ["Data Exfiltration", "C2 Heartbeats", "Cleartext Credential Harvesting"],
    mitigations: ["TLS 1.3 Strict Enforcement", "Suricata IDS Signatures", "Egress Filtering"],
    architectureSummary: "Raw Interface Capture -> Tshark Filter Engine -> Session Reassembly -> Entropy / Threat Analyzer -> Incident Report"
  }
];

export const timelineData: TimelineEntry[] = [
  {
    id: "time-01",
    period: "2025 - 2026",
    title: "Offensive Cyber Ranges & Penetration Testing",
    organization: "TryHackMe & Security Blue Team Labs",
    type: "LEARNING_PATH",
    description: "Completed Advent of Cyber 2025, Cybersecurity 101, and Security Blue Team OSINT investigations. Practicing active reconnaissance, privilege escalation, and network exploitation.",
    skills: ["OSINT", "Web Exploitation", "Traffic Analysis", "Forensics"],
    badge: "Active Red Team"
  },
  {
    id: "time-02",
    period: "2024 - 2025",
    title: "Foundational Networking & Cryptography Studies",
    organization: "Stanford University & TryHackMe",
    type: "EDUCATION",
    description: "Completed Stanford University Cryptography I (Coursera) and TryHackMe Pre-Security track. Mastered TCP/IP protocols, symmetric/asymmetric encryption, and secure network infrastructure.",
    skills: ["Applied Cryptography", "TCP/IP & OSI", "Linux Internals", "Diffie-Hellman"],
    badge: "Stanford & THM"
  },
  {
    id: "time-03",
    period: "2024",
    title: "Security Tooling & Home Lab Infrastructure",
    organization: "Independent Lab / Virtualized Testbeds",
    type: "PROJECT_LAB",
    description: "Built custom Python port scanners, BIND9 DNSSEC testbeds, and multi-VLAN DHCP architectures with Cisco IOS simulations.",
    skills: ["Python 3", "Socket Programming", "BIND9", "Wireshark"],
    badge: "Infrastructure"
  }
];
