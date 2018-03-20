# DOMDeLuise

DOMDeLuise is a JS DOM manipulation library. DOMDeLuise users can:
 - make HTTP requests
 - select one or more DOM elements
 - traverse and manipulate DOM elements
 - create new DOM elements or DOMNodeCollections
 - queue up functions until DOMContentLoaded

## Pre-requisites
- webpack

## Setup
- download this library
- add a script tag for the file `dom_deluise.js` in your entry file

## API
`$l` is a global variable which provides access to methods defined on DOMNodeCollection.

Use it to grab CSS selectors like `$l('ul')`, which returns an instace of `DOMNodeCollection`, an array of `HTMLElement`s

Wrap it around a string of HTML to simultaneously create an HTML element and make it a DOMNodeCollection.

## Traversing the DOM
