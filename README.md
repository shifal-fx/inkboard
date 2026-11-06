# Inkboard — Online Whiteboard Landing Site

A static marketing website (HTML + CSS + JavaScript, no frameworks, no build step).

## Run it
1. Open this folder in VS Code (File → Open Folder).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**.
   (Or just double-click `index.html` to open it in your browser.)

## Files
| File | What it is |
|------|------------|
| `index.html` | Home / landing page |
| `product.html` | Features, integrations, security |
| `pricing.html` | Plans, monthly/yearly toggle, comparison table, FAQ |
| `help.html` | Help center with live search, articles, FAQ, contact |
| `signup.html` | Sign-up page with form validation (demo only) |
| `styles.css` | All styling for every page |
| `script.js` | Navbar, footer and all interactive behaviour |

## Editing tips
- **Brand colours / fonts:** change the variables at the top of `styles.css` (`--brand`, `--teal`, ...).
- **Navbar & footer:** edit `NAV_HTML` and `FOOTER_HTML` in `script.js` — it updates every page.
- **Rename the product:** search-and-replace "Inkboard" across the folder.

## Deploy a demo link (free, ~2 minutes)
Go to https://app.netlify.com/drop and drag this whole folder onto the page. You get a public URL to share.
