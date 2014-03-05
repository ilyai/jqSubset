# jqSubset

This plugin provides functionality of making a selection from a list of items. It also capable of
 filtering both lists and sorting them.

[See the demo](http://ilyai.github.io/jqSubset/)

## Features

* Extremly lightweight
* Built with performance in mind

## Usage

### HTML:

```html
  <div class="jqsubset">
    <div class="select-wrapper">
      <input type="search" class="filter">
      <ul class="select" multiple data-subset-source></ul>
    </div>
    <div class="controls">
      <button data-subset-control="select"></button>
      <button data-subset-control="deselect"></button>
      <button data-subset-control="select_all"></button>
      <button data-subset-control="deselect_all"></button>
    </div>
    <div class="select-wrapper">
      <input type="search" class="filter">
      <ul class="select" multiple data-subset-selection></ul>
    </div>
  </div>
```

### JavaScript:

```javascript
  var myArray = ["foo", "bar", "quux"];
  $(".jqsubset").jqSubset().setItems(myArray);
```

## API

### Methods:

#### `setItems([Array])`
Set items to source select box.

#### `getSelection()`
Get selected items as an array.
