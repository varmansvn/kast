
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == "PUSH-NOTIFICATION") {
            console.log(request);
            var notification = window.webkitNotifications.createNotification(
                '/icons/48x48.png',  // icon url - can be relative
                request.word.title,  // notification title
                request.word.definition  // notification body text
            );
            notification.show();
        }
    });