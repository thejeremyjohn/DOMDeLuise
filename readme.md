# DOMDeLuise

DOMDeLuise is a JS DOM manipulation library. Users can:
 - make HTTP requests
 - select one or more DOM elements
 - traverse and manipulate DOM elements
 - create new DOM elements or DOMNodeCollections
 - queue up functions until DOMContentLoaded

## Setup
- download this library
- add a script tag for the file `dom_deluise.js` in your entry file

## API
`$l` is a global variable which provides access to methods defined on DOMNodeCollection.

Use it to grab CSS selectors like `$l('ul')`, which will return an instance of `DOMNodeCollection`, an array of `HTML Element`s

Wrap it around a string of HTML to simultaneously create an `HTML element` and make it a `DOMNodeCollection`.

## Traversing the DOM
`.children` returns a `DOMNodeCollection` of ALL child nodes of all nodes in the array.

`.parent` returns a `DOMNodeCollection` of the unique parent nodes of all nodes in the array.

`.find` returns a `DOMNodeCollection` of all the nodes matching the selector passed in as an argument that are descendants of the nodes.

## Manipulating the DOM
`.html` takes an optional string argument which, if present, becomes the `innerHTML` of each of the nodes.
With no argument passed in, it returns the `innerHTML` of the first node in the array.

`.empty` sets the content of all nodes in the array to an empty string.

`.append` takes an `HTML element`, `DOMNodeCollection`, or `string` argument and appends it to each element in the `DOMNodeCollection`.

`.remove` removes the html of all the nodes in the array from the DOM.

`.attr` takes a `attribute` argument and an optional `value` argument.
Given attribute alone, it looks up the value of the first element in the DOMNodeCollection.
Given attribute and value, it sets the attribute to the given value for each element in the `DOMNodeCollection`.

`addClass` takes a string argument and adds that as a class name to each element in the `DOMNodeCollection`.

`removeClass` takes a string argument (class name) and removes it from each element in the `DOMNodeCollection`.

## Event Listeners
`.on` adds an event listener to each `DOMNodeCollection` element.

`.off` removes an event listener from each `DOMNodeCollection` element.

## `$l.ajax`
Takes an optional argument in the form of a JS object. Sends an HTTP request and returns a promise object.
