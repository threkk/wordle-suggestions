# [Wordle Suggestions](https://wordle.spacefox.rocks)
> For those moments when you need extra inspiration.

# How to use
The web application will provide suggestions for [Wordle](https://www.nytimes.com/games/wordle/index.html)
based on the information you have from previous stages. These suggestions take into account the 
new word list after the acquisition from the New York Times.

1. In the first section, marked with a 🟩, place in the correct order the
   letters that are in the word **in the correct position**. Leave empty spaces for those unknown.
2. In the second section, marked with a 🟨, place in the correct order the
   letters that are **not in the correct position but in the word**. Leave empty
   spaces for the unknown.
3. In the third section, marked with a ⬛, write the letters that are **not** in
   the word.

The suggested words in the list could be the chosen word.

## También en español  
La aplicación también soporta la version en español de [Wordle](https://wordle.danielfrg.com/).

# Getting started
```
git clone git@github.com:threkk/prune.js.git

npm install
npm run dev
```

# Motivation
English is not (neither will be) my mother tongue, so sometimes I get stuck with
rare words. I used to use a combination of `grep` and `/usr/share/dict/` to help
me at those times, but I thought other people could also benefit.

# Where are the tests?
There aren't. This is a hobby project and writting tests is not fun. Maybe one
day I will write some [e2e tests](https://kentcdodds.com/blog/write-tests). Feel
free to open a pull requests if you write those.

# License
GNU GPLv3 Copyright (C) 2022  Alberto de Murga
