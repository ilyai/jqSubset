// jqSubset jQuery Plugin
// 
// This plugin provides functionality of making a
// selection from a list of items. It also capable of
// filtering both lists and sorting them.
// 
// (c) 2014 Ilya Igonkin
// Licensed under the MIT license

(function($) {
  "use strict";

  var ITEM_ID = "subset-item-id";
  var REACTION_DELAY = 1000;

  // Sort options within the select box.
  // There seem to be no other way but to
  // re-append the nodes.
  function sortItems($select) {
    var $items = $select.children();
    $items.sort(function(el1, el2) {
      var a = $(el1).text();
      var b = $(el2).text();
      if (a === b) return 0;
      return a < b ? -1 : 1;
    });
    $select.append($items);
  }

  // Filter the set of items. Excluding those
  // that have been selected.
  function filterItems($select, pattern) {
    $select.children(":not(.selected-item:hidden)").each(function(i, el) {
      var $el = $(el);
      if (!~$el.text().toLowerCase().indexOf(pattern)) {
        $el.hide();
      } else {
        $el.show();
      }
    });
  }

  $.fn.jqSubset = function() {
    var $source = this.find("[data-subset-source]");
    var $seletion = this.find("[data-subset-selection]");
    var $controls = this.find("[data-subset-control]");
    var timer = null, filtering = false;

    // Highlight selected and unhighlight deselected items
    this.on("click", ".select > li", function(e) {
      $(this).toggleClass("selected-item");
    });

    // Selection / deselection of items by hidding them
    // in source and appending to the selection.
    $controls.click(function(e) {
      var action = $(this).data("subset-control");
      var each = ~action.indexOf("all");
      switch (action) {
        case "select":
        case "select_all":
          $source.children(each ? ":visible" : ".selected-item:visible")
              .hide().clone(true).removeClass("selected-item").appendTo($seletion).show();
          sortItems($seletion);
          break;
        case "deselect":
        case "deselect_all":
          var itemIds = $seletion.children(each ? "" : ".selected-item").detach().map(function(i, el) {
            return Number($(this).data(ITEM_ID));
          }).get();
          $source.children().filter(function(i) {
            return ~$.inArray(Number($(this).data(ITEM_ID)), itemIds);
          }).removeClass("selected-item").show();
          break;
      }
    });

    // Schedule filter to run
    this.find(".filter").keyup(function(e) {
      var $select = $(this).next(".select");
      var pattern = $(this).val().toLowerCase();
      if (filtering) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function() {
        timer = null;
        filtering = true;
        filterItems($select, pattern);
        filtering = false;
      }, REACTION_DELAY);
    });

    // Public API
    return {
      setItems: function(items) {
        var base = $source.children().length;
        $.each(items, function(i, text) {
          $("<li />").text(text).attr("data-" + ITEM_ID, (base + i)).appendTo($source);
        });
      },
      getSelection: function() {
        return $.map($seletion.children(), function(el, i) {
          return $(el).text();
        });
      }
    };
  };

})(jQuery);
