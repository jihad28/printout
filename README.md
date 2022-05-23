# Printout

Printout is a small JavaScript library that makes printing HTML elements easier with it's current design.

## Features

- Print DOM element
- Preserves design
- Supports inline style tag
- Can remove unwanted elements with class. default is `no-print`

## Usage/Examples
```javascript
printout('selector')
```

### Options
```javascript
printout('selector', {
    pageTitle: window.document.title, // Title of the page
    importCSS: true, // Import parent page css
    inlineStyle: true, // If true it takes inline style tag 
    autoPrint: true, // Print automatically when the page is open
    autoPrintDelay: 1000, // Delay in milliseconds before printing
    header: null, // String or element this will be appended to the top of the printout
    footer: null, // String or element this will be appended to the bottom of the printout
    noPrintClass: 'no-print' // Class to remove the elements that should not be printed
})
```

# Demo
See [example/index.html](example/index.html)

## Author
- [@jihad28](https://www.github.com/jihad28)
