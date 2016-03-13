virtual-keyboard-js
===================

A Virtual Keyboard made in Vanilla JS

The keyboard appends characters into currently focused `<input>` element.

Usage
=====

new Keyboard(keyboardMap, keyboardContainer, [options]);

Basic usage:

```javascript
  // A numeric layout
  var numericLayout = [
    "7 8 9",
    "4 5 6",
    "1 2 3",
    "0 ."
  ];

  // Select keyboard container
  var keyboardContainer = document.getElementById("keyboard");

  // Instatinate keyboard
  new Keyboard(numericLayout, keyboardContainer);
```

Supported special keys:

* {space}
* {backsp}
* {capslock}

Supported options:

* keyFunctionsCaptions - object defining special keys captions


Usage with options and special keys:

```javascript
//Options
var options = {
  //Captions for special keys
  'keyFunctionsCaptions': {
    'space': '&#160;',
    'backsp': '&#8592;',
    'capslock': '[Aa] CapsLock'
  }
}

var numeric = [
  "7 8 9",
  "4 5 6",
  "1 2 3",
  "0 ."
];

var quertyLayout = [
  '1 2 3 4 5 6 7 8 9 0 - = {backsp}',
  'q w e r t y u i o p [ ] \\',
  '{capslock} a s d f g h j k l ;',
  'z x c v b n m , . /',
  '{space}'
]

var keyboardContainer = document.getElementById("keyboard");

new Keyboard(quertyLayout, keyboardContainer, options);
```

Please see [index.html](index.html) for standalone functioning usage example
