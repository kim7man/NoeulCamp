function playSound() {
	if (typeof(audio) != "undefined" && audio) {
		audio.pause();
		document.body.removeChild(audio);
		audio = null;
	}
	audio = document.createElement('audio');
	document.body.appendChild(audio);
	audio.autoplay = true;
	audio.src = chrome.extension.getURL('assets/tada.mp3');
	audio.play();
}

function sendMessageToTelegram(msgNewTime) {
	var botToken = localStorage['botToken'];
    var chatId = localStorage['chatId'];
	var msg = encodeURI('[Notice] : ' + msgNewTime);
	if (botToken != undefined && chatId != undefined) {
        var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + msg;
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var response = xmlhttp.responseText; //if you need to do something with the returned value
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message && message.type == 'playSound') {
		playSound();
		sendMessageToTelegram();
        sendResponse(true);
    }
    if (message && message.type == 'sendMsg') {
		sendMessageToTelegram(message.msgNewTime);
        sendResponse(true);
    }
});