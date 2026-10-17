# ADAM CHOUIOUKH — Cybersecurity Portfolio

> Penetration Tester | Ethical Hacker | Offensive Security Specialist

A futuristic, interactive cybersecurity portfolio built with React + TypeScript + Vite + Tailwind CSS.

---

## 🚀 Deploy to GitHub Pages (3 steps)

### Step 1 — Create a GitHub repository
Go to [github.com/new](https://github.com/new) and create a new repository under your account `adamchouioukh0-design`.  
For example, name it `cyber-portfolio` → URL will be `https://adamchouioukh0-design.github.io/cyber-portfolio/`

### Step 2 — Push the project
Open PowerShell in the project folder and run:

```powershell
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/adamchouioukh0-design/cyber-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow runs automatically and deploys your site

Your portfolio will be live at:  
**`https://adamchouioukh0-design.github.io/cyber-portfolio/`**

---

## 📁 Project Structure

```
cyber-portfolio/
├── public/
│   ├── images/
│   │   ├── profile.png                        ← Your profile photo
│   │   ├── certificates/                      ← Certificate thumbnails
│   │   └── projects/                          ← Project preview images
│   └── certificates/                          ← Certificate PDF/JPG files
├── src/
│   ├── data/
│   │   └── portfolioData.ts                   ← ✏️  Edit ALL content here
│   ├── components/                            ← All UI sections
│   └── types/                                 ← TypeScript interfaces
├── .github/workflows/deploy.yml               ← Auto-deploys on git push
└── vite.config.ts                             ← base: './' for GitHub Pages
```

## ✏️ How to Update Content

**All content lives in one file:** `src/data/portfolioData.ts`

| What to change | Where |
|---|---|
| Name, email, links | `personalInfo` object |
| Skills | `skillsData` array |
| Certificates | `certificatesData` array |
| Projects | `projectsData` array |
| Timeline | `timelineData` array |

## 🛠️ Local Development

```powershell
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```powershell
npm run build
```

Output goes to `dist/` — ready for deployment.

---

## 📦 Files to Include on GitHub

Make sure these are committed (not in `.gitignore`):

```
public/images/profile.png
public/images/certificates/cert-osint.svg
public/images/certificates/cert-thm-aoc.svg
public/images/certificates/cert-thm-presec.svg
public/images/certificates/cert-thm-cyber101.svg
public/images/certificates/cert-stanford-crypto.jpg
public/certificates/Introduction-to-OSINT-course.pdf
public/certificates/THM-Advent-of-Cyber-2025.pdf
public/certificates/THM-Pre-Security.pdf
public/certificates/THM-Cybersecurity-101.pdf
public/certificates/Stanford-Cryptography-1.jpg
```

---

*Built with React • TypeScript • Vite • Tailwind CSS • Framer Motion*
