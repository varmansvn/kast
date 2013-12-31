function split(val) {
    return val.split(/​\s*/);
}

function extractLast(term) {
    return split(term).pop();
}

/* send message to get dictionary from background.js */
function getDictionary(callback) {
    chrome.runtime.sendMessage({type: "GET-DICTIONARY"}, function (response) {
        var dictionary = response.dictionary;
        callback(dictionary);
    });
}

getDictionary(function(dictionary) {

    $("input[type=text], textarea").bind("keydown",function (event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).data("ui-autocomplete").menu.active) {
            event.preventDefault();
        }
    }).autocomplete({
            minLength: 1,
            source: function (request, response) {
                var word = extractLast(request.term);
                if (word == "") {
                    response(false);
                } else {
                    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(word), "i");
                    response($.grep(dictionary, function (item) {
                        return(matcher.test(item));
                    }));
                }
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push(ui.item.value);
                // add placeholder to get the comma-and-space at the end
                terms.push("​");

                this.value = terms.join("​");
                return false;
            }
        });
});

