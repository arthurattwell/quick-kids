# Quick Kids

We wanted to play 30 Seconds with our seven-year-old, but our set is really old and too grown-up for him. So we made this. The grown-ups play the usual cards, and he plays these ones.

[Play now!](https://quick-kids.netlify.com/)

## Development

We maintain the clues in a [Google Sheet](https://docs.google.com/spreadsheets/d/1dDswbV5O-VVTHNIRhtP-fa-pZOlWYPqMVDMmPtua_EM/edit?usp=sharing).

I download a CSV to this repo as `data/clues.csv`. With Node isntalled, I run `npm run refresh` to transform the updated data and generate `cards.js`.

When working on the site, I'll run `npm start` instead, which refreshes the data from the CSV, builds and watches CSS, and runs a local server.

## Credits

Thanks to Michelle for most of the clues, and to Aidan for testing them. Thanks to Book Dash for the site's open graph image, which is from [*And Also* by Lauren Beukes, Anja Venter and Nkosingiphile Mazibuko, published by Book Dash](https://bookdash.org/books/also-anja-venter-nkosingiphile-mazibuko-lauren-beukes/).
