# 🛡️ HOW TO CUSTOMIZE YOUR CYBERSECURITY PORTFOLIO

This futuristic portfolio is built to be **100% data-driven and easily customizable**. You do not need to touch component JSX or Tailwind styles to update your personal data, credentials, projects, or photos.

All your content is centralized in:
📁 **`src/data/portfolioData.ts`**

---

## 1. Changing Your Name, Bio, and Links

Open [`src/data/portfolioData.ts`](./src/data/portfolioData.ts) and locate the `personalInfo` object:

```typescript
export const personalInfo: PersonalInfo = {
  name: "YOUR REAL NAME",               // Replace "[YOUR NAME]"
  initials: "AV",                       // Displays in the navbar logo bracket [AV]
  codename: "CIPHER-01",                // Hacker callsign displayed in the HUD
  title: "SECURING THE DIGITAL FRONTIER",
  subtitle: "Cybersecurity Enthusiast | Ethical Hacking | Network Security",
  shortIntro: "Exploring vulnerabilities, understanding systems, and building a more secure digital world.",
  
  // Profile Photo:
  profileImage: "/images/profile.jpg",  // Place your image in public/images/profile.jpg
  
  // Resume / CV:
  cvUrl: "/cv.pdf",                     // Place your PDF in public/cv.pdf
  
  // Social & Contact Channels:
  email: "your.email@example.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  
  // Operational details:
  defconLevel: 5,                       // 1 to 5
  pgpKeyId: "4A29 B18C 9F30 710D",      // Your PGP key fingerprint
  
  bio: {
    whoIAm: "...",
    cyberInterests: ["Penetration Testing", "Traffic Analysis", ...],
    learningJourney: "...",
    professionalGoals: "..."
  },
  
  stats: [
    { id: "certs", label: "Certifications", value: "3+", description: "..." },
    ...
  ]
};
```

---

## 2. Replacing Your Profile Picture

1. Save your portrait photo as `profile.jpg` or `profile.png`.
2. Move it to the directory:
   📁 **`public/images/profile.jpg`**
3. In [`src/data/portfolioData.ts`](./src/data/portfolioData.ts), ensure `profileImage` points to your image:
   ```typescript
   profileImage: "/images/profile.jpg",
   ```
4. If the file is not found, the website automatically falls back gracefully to the included holographic SVG avatar (`/images/profile.svg`).

---

## 3. Adding, Editing, or Removing Certificates

In [`src/data/portfolioData.ts`](./src/data/portfolioData.ts), edit the `certificatesData` array:

```typescript
export const certificatesData: Certificate[] = [
  {
    id: "cert-01",
    title: "CompTIA Security+ (SY0-701)",
    issuer: "CompTIA",
    issueDate: "2025",
    expiryDate: "2028",
    credentialId: "COMP00102030405",
    verificationUrl: "https://www.credly.com/your-badge-url", // Leave empty or provide real link
    image: "/images/certificates/my-security-plus.png",        // Place in public/images/certificates/
    pdfUrl: "/certificates/security-plus.pdf",                 // Optional PDF document
    description: "Validates foundational cybersecurity competencies...",
    skills: ["Threat Analysis", "Cryptography", "Identity & Access"],
    status: "VERIFIED",                                        // "VERIFIED" | "IN_PROGRESS" | "PLANNED"
    category: "Defensive"                                      // "Offensive" | "Networking" | "Defensive" | "Cloud"
  },
  // To add a new certificate, simply duplicate the block above!
];
```

---

## 4. Adding or Customizing Projects

In [`src/data/portfolioData.ts`](./src/data/portfolioData.ts), edit the `projectsData` array:

```typescript
export const projectsData: Project[] = [
  {
    id: "proj-01",
    title: "Python IP & Port Scanner",
    slug: "python-ip-port-scanner",
    category: "development",                                   // "networking" | "offensive" | "defensive" | "development"
    image: "/images/projects/port-scanner.svg",
    shortDescription: "Multithreaded network exploration utility for fast port discovery...",
    problemAddressed: "Traditional manual socket scanning can be sluggish...",
    technicalImplementation: "Engineered in Python using socket programming...",
    technologies: ["Python 3", "Socket API", "ThreadPoolExecutor"],
    githubUrl: "https://github.com/yourhandle/port-scanner",
    liveDemoUrl: "#terminal",                                  // Or external demo URL
    keyLessonsLearned: [
      "Optimizing thread concurrency...",
      "Handling TCP handshake edge cases..."
    ],
    featured: true,
    attackVectors: ["Port Enumeration", "Banner Grabbing"],
    mitigations: ["Rate Limiting", "Port Knocking", "IDS Rules"]
  }
];
```

---

## 5. Adding Timeline Milestones

In [`src/data/portfolioData.ts`](./src/data/portfolioData.ts), edit the `timelineData` array:

```typescript
export const timelineData: TimelineEntry[] = [
  {
    id: "time-01",
    period: "2025 - Present",
    title: "Cybersecurity Research & Active Lab Practice",
    organization: "Independent Lab / Virtual Range",
    type: "LEARNING_PATH",
    description: "Focusing on defensive architecture, packet analysis, TryHackMe...",
    skills: ["Python Automation", "Wireshark", "Linux Hardening", "Nmap"],
    badge: "Active Focus"
  }
];
```

---

## 6. How the Interactive Terminal Works

The terminal in [`src/components/Terminal/InteractiveTerminal.tsx`](./src/components/Terminal/InteractiveTerminal.tsx) queries your `portfolioData.ts` data dynamically! Supported commands:
- `help` - Lists all commands
- `about` - Prints your bio dossier
- `skills` - Prints your skills
- `projects` - Prints your projects
- `certifications` (or `certs`) - Prints your credentials
- `contact` - Prints your email, LinkedIn, and GitHub links
- `scan` - Simulates a local network port scan with audio/visual feedback
- `whoami` - Shows authenticated session
- `status` - Shows DEFCON telemetry
- `clear` - Clears the screen

---

## 7. Sound Effects Engine

The website includes a custom **Web Audio API synthesizer** (no external `.mp3` or `.wav` files needed).
- Default: Muted for user comfort.
- Toggle: Users can click the **`SFX: OFF / ON`** button in the navbar anytime.
- Audio preference is remembered in `localStorage`.
