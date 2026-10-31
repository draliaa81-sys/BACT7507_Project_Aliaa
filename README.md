# Egyptian Halal Food Restaurant Website

A one-page website for a small Egyptian restaurant in Auckland. I built it for my BACT7507 course at Whitecliffe College in June 2026, using plain HTML, CSS and JavaScript with no frameworks.

![Menu page](Project/Progress_Screenshots/16-06-2026_menu_filtering_bar.png)

## What it does

- Loads the menu from `menu.json` with JavaScript `fetch()`, so the owner can add or change a dish without touching the HTML
- Filters dishes by category (main, appetiser, dessert) with tabs at the top of the menu
- Opens a pop-up with a bigger photo, full description and ingredients when you click a dish
- Shows a placeholder picture when a dish image is missing
- Works on phones, with the menu switching to one column on small screens

## Files

| File | What it does |
| --- | --- |
| `Project/index.html` | Page layout: home, menu, about and contact sections |
| `Project/style.css` | All styling, with colours kept in CSS variables like `--gold` |
| `Project/menu.js` | Loads `menu.json`, builds the menu grid, handles the filter tabs and the pop-up |
| `Project/menu.json` | The list of dishes. This is the only file to edit when the menu changes |
| `Project/imgs/` | Dish photos |
| `Project/Progress_Screenshots/` | Screenshots of each build stage and the tests |

## How to run it

1. Download or clone this repository.
2. Open the `Project` folder in Visual Studio Code.
3. Install the Live Server extension.
4. Right-click `index.html` and choose **Open with Live Server**.

Opening `index.html` straight from the file system will not load the menu, because the browser blocks `fetch()` on local files (a CORS error). Live Server fixes this.

## Adding a dish

Add a new block to `menu.json` like this one, and put the photo in `imgs/` with the same file name:

```json
{
  "id": 6,
  "name": "Fattah",
  "category": "main",
  "price": "$18.00",
  "desc": "Short description shown on the menu card.",
  "longDesc": "Longer description shown in the pop-up.",
  "ingredients": "Rice, bread, beef, garlic, vinegar",
  "tags": ["Main Course", "Halal"],
  "img": "imgs/fattah.jpg"
}
```

The `id` must be unique, and `category` must be `main`, `appetiser` or `dessert` to match the tabs.

## Testing

I tested four features by hand with Live Server. All four passed:

- The page loads with the menu built from `menu.json`
- Each filter tab shows only its category
- The pop-up opens on click and closes with the Escape key or a click outside it
- A new dish added to `menu.json` appears after a page refresh

## What I learned

- Keeping data in a JSON file means the page can change without editing the HTML
- One change to a CSS variable updates the colour across the whole site
- The browser console (F12) showed me the CORS error straight away, which is how I found the fix

## Next steps

The contact form only works in the browser for now. A real backend to send the messages is the next step.

## Author

Aliaa Farag, [LinkedIn](https://www.linkedin.com/in/aliaafarag/)
