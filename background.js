var gDictionary = null;

function loadData(callback) {
   var jsonfile = new XMLHttpRequest();
   jsonfile.open("GET", chrome.extension.getURL('/js/data.json'), true);
   jsonfile.onreadystatechange = function() {
       if (jsonfile.readyState == 4) {
           if (jsonfile.status == 200) {
              var fullDictionary = JSON.parse(jsonfile.responseText);
              var dictionary = [];
              for(var idi in fullDictionary) {
                 dictionary.push(fullDictionary[idi].title);
              }
              callback(dictionary);
           }
       }
   }
   jsonfile.send(null);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == "GET-DICTIONARY") {
            console.log("GET-DICTIONARY is received");
            if(gDictionary != null) {
                console.log(gDictionary.length);
                sendResponse({dictionary: gDictionary});
            } else {
                console.log("get dictionary");
                loadData(function(dictionary) {
                    gDictionary = dictionary;
                    sendResponse({dictionary: dictionary});
                });
            }
        }
});
