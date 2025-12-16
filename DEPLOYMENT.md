# Deployment Guide for GitHub Pages

## Quick Deploy

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to GitHub:**
   - Create a new repository on GitHub
   - Upload the contents of the `dist` folder to the repository
   - Enable GitHub Pages in repository settings:
     - Go to Settings → Pages
     - Source: Deploy from a branch
     - Branch: main (or master)
     - Folder: / (root)

3. **Your site will be live at:**
   `https://yourusername.github.io/repository-name/`

## Alternative: Deploy entire project

If you want to deploy the entire project (not just dist):

1. Upload all files to GitHub
2. Enable GitHub Actions or use a service like Netlify/Vercel
3. They will automatically build and deploy

## Features Implemented

- ✅ Password protection: "Ali" (hint: "The name of your favorite guy")
- ✅ Timer countdown to Dec 17, 00:00 PKT (Pakistan time)
- ✅ Website unlocks only when both password is correct AND timer reaches zero
- ✅ Confetti stops after 5 seconds
- ✅ Session persistence (stays unlocked during browser session)

## Notes

- The lock screen uses client-side JavaScript only (no backend required)
- Password and unlock state are stored in sessionStorage
- Timer calculates Pakistan time (UTC+5) automatically
- Works perfectly on GitHub Pages static hosting


