/*
 author: varmansvn@gmail.com
 */

// the definition of kast singleton class
var KhmerAutoSuggestTool = (function () {

    // single instance
    var instance;

    // private
    function split(val) {
        return val.split(/​\s*/);
    }

    // private
    function extractLast(term) {
        return split(term).pop();
    }

    function findWordByTitle(title, dictionary) {
        var word = null;
        for(var idx in dictionary) {
            if(dictionary[idx].title.trim() == title.trim()) {
                console.log(title);
                word = dictionary[idx];
                break;
            }
        }
        return word;
    }

    function registerInputHandler(fullDictionary) {

        var dictionary = [];
        for(var idi in fullDictionary) {
            dictionary.push(fullDictionary[idi].title);
        }

        $("body").delegate("input[type=text], textarea", "focusin", function(event) {

            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).data("ui-autocomplete").menu.active) {
                event.preventDefault();
            }

            $(this).autocomplete({
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
                focus: function (event) {
                    /*
                    var word = findWordByTitle(event.target.value, fullDictionary);
                    if(word != null) {
                        chrome.runtime.sendMessage({type: "PUSH-NOTIFICATION", word: word}, function (response) {
                        });
                    }
                    */
                    return false;
                },
                select: function (event, ui) {
                    var terms = split(this.value);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    //terms.push("​");

                    this.value = terms.join("​") + "​";
                    //this.value = terms;
                    return false;
                }
            });
        });
    }

    // initialization
    function init() {

        return {

            // public
            invokeRegisterInputHandler: function(fullDictionary) {

                registerInputHandler(fullDictionary);
            }
        };

    };

    return {

        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();

// initializer class
var Importer = (function () {

    // single instance
    var instance;

    // initialization
    function init() {

        return {

            // public
            importData: function(callback) {

                var getDataPromise = $.ajax({url: chrome.extension.getURL('/js/data.json')});

                getDataPromise.done(function(data) {

                    var wordList = jQuery.parseJSON(data);

                    //console.log("data size retrieved: "+wordList.length);

                    //console.log("data test index: 25 = "+wordList[25].title);

                    chrome.storage.local.set({'dictionary': wordList}, function() {

                        if(chrome.runtime.lastError){
                            console.log(chrome.runtime.lastError);
                        } else {
                            callback({message: "successfully saved in chrome storage"});
                        }

                    });

                });
            }
        };

    };

    return {

        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();


// check data
chrome.storage.local.get({dictionary: []}, function(result) {
    if(result.dictionary.length == 0) {
        var importer = Importer.getInstance().importData(function(status) {
            console.log(status.message);
            chrome.storage.local.get({_dictionary: []}, function(_result) {
                main(_result._dictionary);
            });
        });
    }
    main(result.dictionary);
});

function main(fullDictionary) {
    KhmerAutoSuggestTool.getInstance().invokeRegisterInputHandler(fullDictionary);
}


