Project structure (refactored)

- src/
  - html/        -> HTML files (open `src/html/index.html` to preview site)
  - css/         -> Stylesheets (main: `src/css/style.css`)
  - js/          -> JavaScript (main: `src/js/main.js`)
  - assets/      -> Images, videos and binary assets
  - data/        -> JSON or other data files

Notes:
- All asset links in HTML/CSS are relative and point to `../assets` from CSS/HTML locations.
- Do not change file names unless updating references accordingly.

Quick preview (open the file):
- Open `src/html/index.html` in a browser to preview locally.

Ready for commit: files were moved into `src/` and paths updated. Make a commit with a descriptive message (e.g., "Refactor: project layout -> src/{html,css,js,assets,data}").
