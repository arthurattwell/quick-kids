# Quick Kids

We wanted to play 30 Seconds with our seven-year-old, but our set is really old and too grown-up for him. So we made this. The grown-ups play the usual cards, and he plays these ones.

[Play now!](https://quick-kids.netlify.com/)

Tip: If you only have three people, two play as guessers, and one is the describer for the whole game.

If you don't know [30 Seconds](https://en.wikipedia.org/wiki/30_Seconds_%28game%29), or don't have a physical set, you should get one, it's a great family game – and always more fun playing on an official board. It was invented in South Africa by Calie Esterhuyse, [almost named 'Rudy Nappi'](https://boereworsexpress.blogspot.com/2012/07/30-seconds-south-african-game.html?m=1) by [Schalk Burger](https://en.wikipedia.org/wiki/Schalk_Burger), and has been adapted for [Ireland](http://www.30seconds.ie/), [the UK](https://www.amazon.com/SmartGames-Seconds-Multi-Player-Board-Game/dp/B07YLZCHZZ/), the USA and the Netherlands.

## Feedback and contributing

If you have feedback or want to contribute, please [log an issue](https://github.com/arthurattwell/quick-kids/issues/new).

## Development

We maintain the clues in a [Google Sheet](https://docs.google.com/spreadsheets/d/1dDswbV5O-VVTHNIRhtP-fa-pZOlWYPqMVDMmPtua_EM/edit?usp=sharing).

I download a CSV to this repo as `data/clues.csv`. With Node installed and after `npm install`, I run `npm run refresh` to transform the updated data and generate `cards.js`.

When working on the site, I'll run `npm start` instead, which refreshes the data from the CSV, builds and watches CSS, and runs a local server.

Netlify watches the repo, and serves the `public` directory at [https://quick-kids.netlify.com/](https://quick-kids.netlify.com/).

## Credits

Thanks to Michelle for most of the clues, and to Aidan for testing them. Thanks to Book Dash for the site's open graph image, which is from [*And Also* by Lauren Beukes, Anja Venter and Nkosingiphile Mazibuko, published by Book Dash](https://bookdash.org/books/also-anja-venter-nkosingiphile-mazibuko-lauren-beukes/).
