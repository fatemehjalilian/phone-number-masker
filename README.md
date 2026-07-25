# Phone Numbr masker
A simple web tool that masks Iranian mobile phone numbers inside a text.

## Features
- Detects valid Iranian mobile numbers
- Supports multiple phone numbers in the same text
- Masks digits 5 to 7 for privacy protection
- Copies output to clipboard
- Clears input and output fields
- Responsive layout
- Auto-resizing textareas with scroll support
- Supports both English and Persian digits
- Added session storage support to preserve input, masked output, and status information after page refresh
- Implemented a complete reset functionality that removes all stored data and cleares the dispalyed status when the Clear button is clicked.

## How it works
The tool searches for phone numbers that:
- Start with `09`
- Contain exactly 11 digits

Example:

Input: 09123456789
output: 0912***6789

It also works inside larger texts:

Input: contact me with 09123456789 or 09133456789.
output: contact me with 0912***6789 or 0913***6789.


## Technologies
- HTML
- CSS
- JavaScript

## project structure
- index.html
- main.js
- style.css
- README.md

## Live demo


## Author
Fatemeh Jalilian
