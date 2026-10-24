# InterviewAce — AI Interview Simulator (Frontend Demo)

A responsive, interactive interview-practice web app built with plain HTML, CSS and JavaScript. No build tools or dependencies are required.

## Run it
1. Download and unzip `AI_Interview_Simulator.zip`.
2. Open the extracted folder.
3. Double-click `index.html` to launch it in your browser.
4. Create a demo account with an email and a password of at least 6 characters.

For best microphone support, open the project in a current version of Chrome. Some browser speech-recognition features may require a secure context (HTTPS or localhost).

## Features
- Sign up, sign in, sign out, and show/hide password
- Local demo account and session storage
- Dashboard with total sessions, average score, time invested, personal best, progress chart and recent sessions
- 10 role tracks, including software development, frontend, data, design, marketing, business analysis, customer support, HR, project management, and general/fresher
- Easy, Medium and Hard question difficulty
- Randomized question selection and configurable question count
- Per-question timer with pause, resume and reset controls
- Type answers or use browser speech recognition where supported
- Word count, question navigation, draft preservation while the session is open
- Keyword coverage and answer-length scoring with per-answer feedback
- Downloadable plain-text session report
- Session history, profile editing, clear history, responsive layout

## Important notes
- This is a **frontend prototype**, not a production AI service. Questions come from a built-in question bank; the score is a simple heuristic based on answer length and keyword coverage. It does not understand meaning like a real AI model.
- Authentication is demo-only: credentials are stored in the current browser's `localStorage`, passwords are not securely hashed, and there is no server-side account protection. **Do not use a real password or sensitive information.**
- Data is stored locally in the browser. Clearing browser storage or switching browsers/devices can remove or hide your data.
- For a production deployment, use a backend authentication provider, hashed passwords, a database, server-side authorization, secure session handling, and an AI API for semantic feedback. Never place private API keys in frontend JavaScript.
- Voice input depends on browser support and microphone permission. Typed answers always work.

## Files
- `index.html` — app structure and views
- `style.css` — responsive UI styling
- `script.js` — authentication demo, question banks, timer, scoring, dashboard and history


## Refreshed UI and added features
- Larger default typography across dashboard, questions, forms and tables
- A+/A− controls to adjust text size, with preference saved in the browser
- Optional dark theme with saved preference
- Bookmark interview questions and manage saved questions from My Profile
- Export session history to CSV for spreadsheet use
