var dsturl_Cal = "https://poticket.interpark.com/CampingBook/BookMain.asp";
//var dsturl_Book = "https://www.mangsangcamping.or.kr/reservation/02_02.htm?type=caraban_aa";
//var dsturl_Confirm = "https://www.mangsangcamping.or.kr/reservation/02_03.htm";
//var dsturl_login = "https://www.mangsangcamping.or.kr/member/login.htm";
//var dsturl_main = "https://www.mangsangcamping.or.kr/index.htm";


function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

const clearCaptchaLayer() {
	$('div.captchSliderLayer')[0].style="display:none;";
	$('div#divRecaptchaWrap')[0].style="display:none;";
	$('div#divRecaptcha')[0].style="display:none;";
}


window.showModalDialog = window.showModalDialog || function(url, arg, opt) {
	window.open(url, arg, opt);
};

function macrostart() {
	sessionStorage.setItem('macro', true);
	sessionStorage.setItem('targetMM', $('#targetMM').val());
	sessionStorage.setItem('targetDD', $('#targetDD').val());
	sessionStorage.setItem('targetNN', $('#targetNN').val());
	sessionStorage.setItem('targetBB', $('#targetBB').val());
	sessionStorage.setItem('targetSS', $('#targetSS').val());

	location.reload();
}

function macrostop() {
	sessionStorage.removeItem('macro');
//	sessionStorage.removeItem('targetMM');
//	sessionStorage.removeItem('targetDD');
//	sessionStorage.removeItem('targetNN');
//	sessionStorage.removeItem('targetBB');
//	sessionStorage.removeItem('targetSS');

	location.reload();
}

if (document.title == "400 Bad Request")
{
	location.reload();
}

var statMacro = false;
// macro start 버튼 눌리면 flag 변경
document.addEventListener('chkMacroBak', function(e) {
	statMacro = true;
//	console.log('chkmacrobak');
});



function inject_header()
{

	$("#divBookNoticeLayer").hide();
//	$('#divBookNoticeLayer')[0].style.display = 'none';
	$('div.wrap')[0].style.height = '800px';


	var targetMM = sessionStorage.getItem("targetMM");
	var targetDD = sessionStorage.getItem("targetDD");
	var targetNN = sessionStorage.getItem("targetNN");
	var targetBB = sessionStorage.getItem("targetBB");
	var targetSS = sessionStorage.getItem("targetSS");

	if (sessionStorage.getItem('macro') == "true") {
		$("div.wrap").append('<div id="divMacro"></div>');
		$("div#divMacro").append('<input id="targetMM" size="5" value="' + targetMM + '"></input>월');
		$("div#divMacro").append('<input id="targetDD" size="5" value="' + targetDD + '"></input>일');
		$("div#divMacro").append('<input id="targetNN" size="5" value="' + targetNN + '"></input>박');
		$("div#divMacro").append('<input id="targetBB" size="5" value="' + targetBB + '"></input>구역');
		$("div#divMacro").append('<input id="targetSS" size="5" value="' + targetSS + '"></input>번');
		$("div#divMacro").append('<a href="#" id="btnstop" style="margin-left:5px;display:inline-block;vertical-align:middle;"><img src="' + chrome.runtime.getURL('images/btn_stop.png') + '"></a>');

	} else {
		$("div.wrap").append('<div id="divMacro"></div>');
		$("div#divMacro").append('<input id="targetMM" size="5" ></input>월');
		$("div#divMacro").append('<input id="targetDD" size="5" ></input>일');
		$("div#divMacro").append('<input id="targetNN" size="5" ></input>박');
		$("div#divMacro").append('<input id="targetBB" size="5" ></input>구역');
		$("div#divMacro").append('<input id="targetSS" size="5" ></input>번');
		$("div#divMacro").append('<a href="#" id="btnstart" style="margin-left:5px;display:inline-block;vertical-align:middle;"><img src="' + chrome.runtime.getURL('images/btn_start.png') + '"></a>');
		document.getElementById('targetMM').value = targetMM || "7";
		document.getElementById('targetDD').value = targetDD || "6";
		document.getElementById('targetNN').value = targetNN || "1";
		document.getElementById('targetBB').value = targetBB || "D";
		document.getElementById('targetSS').value = targetSS || "13";

	}


	var btnstop = document.getElementById("btnstop");
	var btnstart = document.getElementById("btnstart");

	if (btnstop) {
		btnstop.addEventListener("click", macrostop, false);
	}
	if (btnstart) {
		btnstart.addEventListener("click", macrostart, false);
	}

}

if (document.URL.substring(0, dsturl_Cal.length) == dsturl_Cal) {

	$(document).ready(function() {

		inject_header();

		if (sessionStorage.getItem('macro') == "true") {
			var targetMM = sessionStorage.getItem("targetMM");

			if (!targetMM || !targetDD)
			{
				sessionStorage.removeItem('macro');
				setTimeout(function() {
					location.reload();
				}, 1);
			}

			strMM = pad(targetMM,2);
			strYear = new Date().getFullYear();
			ym = strYear+strMM;
			console.log(ym);
			sfnClickMon = "fnChangeMonth('"+ ym +"')";
			$("#divMacro").append('<a id="ClickMon" href="javascript:' + sfnClickMon + ';"> M</a>');

			var intTime = setInterval(function(){
				document.dispatchEvent(new CustomEvent('chkMacro', { detail: '' }));
				if (statMacro)
				{
					clearInterval(intTime);
				}
			}, 10);

		}
	});
}




if (window.top === window) {
    var scriptId = "injectedScript";
    if (!document.getElementById(scriptId)) {
        var script = document.createElement('script');
        script.src = chrome.runtime.getURL('injectedScript.js');
        script.id = scriptId;
        document.documentElement.appendChild(script);
    }
}
