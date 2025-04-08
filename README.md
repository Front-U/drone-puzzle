# Drone Puzzle Donation Page

This project is an interactive web page designed for a charitable fundraising campaign. Donors help "build" a drone piece-by-piece by making contributions, with each puzzle piece representing one donation.

---

## 💡 Features

- **Interactive SVG Drone** with 30 puzzle pieces
- **Dynamic donor name display** on each piece
- **Color customization** for each piece
- **Automatic donor recognition** for donations under 2500 UAH
- **Live data from a local JSON file**
- **Admin editor interface** for easy donor management
- **Ready for GitHub Pages** deployment

---

## 📂 Project Structure

drone-puzzle/ ├── index.html → main interactive page ├── editor.html → admin tool for managing donor data ├── data.json → donor data (names, colors, amounts) ├── script.js → logic for SVG rendering and updates ├── style.css → basic styles ├── assets/ │ └── drone.svg → interactive drone graphic (30 puzzle parts)

---

## ✍️ How to Use

1. **Add donors** via `editor.html`:
   - Enter name, amount, and select a color
   - Donors giving ≥2500 UAH get a puzzle piece
   - Donors giving <2500 UAH appear in the thank-you list
   - Click "Download JSON" to export updated `data.json`

2. **Replace the old `data.json`** in the root folder with the updated one

3. **Visit `index.html`** to see changes in real time (auto-refresh every 10 sec)

---

## 🌐 Deployment

This page is deployed on **GitHub Pages**.

To update the live site:
- Upload modified files to the `main` branch of this repository
- GitHub Pages will auto-publish the latest version

Live link (if enabled):  
`https://<your-username>.github.io/drone-puzzle/`

---

## ✅ Requirements

- Modern browser (Chrome / Edge recommended)
- No server logic required — pure HTML + JS + SVG
- Compatible with GitHub Pages (static site hosting)

---




