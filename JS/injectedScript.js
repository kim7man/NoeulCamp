if (!window.scriptInjected) {
    window.scriptInjected = true;

// 원하는 자릿수만큼 앞에 0을 추가하는 함수
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

// calendar에서 요소 변경이 끝나면(100ms이내에 변화 없으면) 다음함수 실행
let timeout;
var stat = 'day';
const calendarObserver = new MutationObserver((mutations) => {
	if(timeout) clearTimeout(timeout);

	timeout = setTimeout(function(){
		calendarObserver.disconnect();

		if(stat == 'day')
		{
		var dayTags = document.querySelectorAll('#BookingDateTime a');
		var targetImgTags = [];

		var targetSS = sessionStorage.getItem("targetDD");
		dayTags.forEach(function(dayTag) {
//			if (dayTag.getAttribute('class') && dayTag.getAttribute('class').includes('selOn')) {
//				targetImgTags.push(dayTag);
//			}
			if (dayTag.text.split('(')[0] == targetSS)
			{
				targetImgTags.push(dayTag);
			}
		});
		if(targetImgTags.length)
		{
			calendarObserver.observe(document.querySelector("#BookingDateTime"), {
				// 변경을 감지할 요소를 지정합니다.
				subtree: true,
				// 변경의 종류를 지정합니다.
				attributes: true,
				childList: true,
				characterData: true,
			});
			stat = 'length';
			targetImgTags[0].click();
		}
		
		}
		else if(stat == 'length')
		{
	siteStatusObserver.observe(document.querySelector("#SeatRemainNotice"), {
		// 변경을 감지할 요소를 지정합니다.
		subtree: true,
		// 변경의 종류를 지정합니다.
		attributes: true,
		childList: true,
		characterData: true,
	});

	var targetNN = sessionStorage.getItem("targetNN");
	if (targetNN == 1)
	{//1박 선택
		sfnClickNights = "fnCheckInSelect('"+jQuery('#SelectCheckIn')[0].options[1].value+"');";
		jQuery("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
		jQuery("#ClickNights")[0].click();
	}
	else
	{//2박 선택 
		sfnClickNights = "fnCheckInSelect('"+jQuery('#SelectCheckIn')[0].options[2].value+"');";
		jQuery("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
		jQuery("#ClickNights")[0].click();
	}

		}

//		clickLength();
		timeout = null;
	},100);
});

// 좌하단 사이트별 현황이 refresh되면 다음함수 실행
const siteStatusObserver = new MutationObserver((mutations) => {
	if(timeout) clearTimeout(timeout);

	timeout = setTimeout(function(){
		siteStatusObserver.disconnect();
		clickArea();
		timeout = null;
	},100);
});

// iframe에서 site 선택 화면이 뜨면 다음함수 실행
const iframeObserver = new MutationObserver((mutations) => {
	if(timeout) clearTimeout(timeout);

	timeout = setTimeout(function(){
		iframeObserver.disconnect();
		clickSite();
		timeout = null;
	},100);
});


//// iframe에서 다음단계 내용이 표시되면 다음함수 실행
//const iframeStepObserver = new MutationObserver((mutations) => {
//	if(timeout) clearTimeout(timeout);
//
//	timeout = setTimeout(function(){
//		console.log(mutations);
//		btns = jQuery('#btn_Default a');
//		console.log(btns);
//		btns[1].click();
//		iframeStepObserver.disconnect();
//		timeout = null;
//	},100);
//});
//






var intTimer = null;
var count = 0;
// 뷰모델이 적용 완료되었는지 확인하는 함수
function pageReady() {
	// macro start 버튼 확인
	if (statMacro)
	{
		clearInterval(intTimer);
//		console.log("macroStart");

		calendarObserver.observe(document.querySelector("#BookingDateTime"), {
			// 변경을 감지할 요소를 지정합니다.
			subtree: true,
			// 변경의 종류를 지정합니다.
			attributes: true,
			childList: true,
			characterData: true,
		});

		jQuery('#ClickMon')[0].click();

		// 원하는 날짜 클릭
		clickDay();
	}
	else
	{
		count++;
		console.log(count);
		if(count > 10)
		{
			clearInterval(intTimer);
		}
	}
}


function clickDay()
{
	var targetDD = sessionStorage.getItem("targetDD");
	strDD = targetDD;
	console.log(strDD);
	sfnClickDay =  jQuery('a:contains("' + strDD + '")');
	if(sfnClickDay.length)
	{
		sfnClickDay[0].click();
	}
	else
	{
		console.log('Select a day');
	}
}

function clickLength()
{

	siteStatusObserver.observe(document.querySelector("#SeatRemainNotice"), {
		// 변경을 감지할 요소를 지정합니다.
		subtree: true,
		// 변경의 종류를 지정합니다.
		attributes: true,
		childList: true,
		characterData: true,
	});

	var targetNN = sessionStorage.getItem("targetNN");
	if (targetNN == 1)
	{//1박 선택
		sfnClickNights = "fnCheckInSelect('"+jQuery('#SelectCheckIn')[0].options[1].value+"');";
		jQuery("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
//		jQuery("#ClickNights")[0].click();
	}
	else
	{//2박 선택 
		sfnClickNights = "fnCheckInSelect('"+jQuery('#SelectCheckIn')[0].options[2].value+"');";
		jQuery("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
		jQuery("#ClickNights")[0].click();
	}
}

function clickArea()
{
	iframeObserver.observe(document.querySelector("#ifrmSeat").contentWindow.document, {
		// 변경을 감지할 요소를 지정합니다.
		subtree: true,
		// 변경의 종류를 지정합니다.
		attributes: true,
		childList: true,
		characterData: true,
	});


	var targetBB = sessionStorage.getItem("targetBB");

	var siteNum = targetBB.charCodeAt(0) - 'A'.charCodeAt(0)+1;
	if (siteNum == 4)
	{
		siteNum = 0;
	}

	var iframe = document.getElementById('ifrmSeat');
	var iframeDocument = iframe.contentWindow.document;
	var areaTag = iframeDocument.querySelectorAll('area');
	var clickEvent = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true
	});
	
	if(areaTag)
	{
		areaTag[siteNum].dispatchEvent(clickEvent);
	}
	else
	{
		console.log('The site is already out.');
	}
}

function clickSite()
{
	var targetSS = sessionStorage.getItem("targetSS");

	var btnNextStep = document.getElementsByClassName('btn_next_step');
	console.log(btnNextStep);

	document.getElementById('ifrmSeat').onload = function() {
		var iframe = document.getElementById('ifrmSeat');
		var iframeDocument = iframe.contentWindow.document;
		var mapDiv = iframeDocument.getElementById('map');
		var imgTags = mapDiv.querySelectorAll('img');
		var targetImgTags = [];

		imgTags.forEach(function(imgTag) {
			if (imgTag.getAttribute('title') && imgTag.getAttribute('title').includes(targetSS)) {
				targetImgTags.push(imgTag);
			}
		});
		targetImgTags[0].click();

		var btnNextStep = iframeDocument.getElementsByClassName('btn_next_step');
		btnNextStep[0].click();

	}

	sessionStorage.setItem('stepStatus', 'next');
	document.getElementById('ifrmBookStep').onload = function() {

		stepStatus = sessionStorage.getItem('stepStatus');
		var iframeStep = document.getElementById('ifrmBookStep');
		var iframeStepDocument = iframeStep.contentWindow.document;

		if (stepStatus == 'next')
		{
			sessionStorage.setItem('stepStatus', 'price');
			btns=iframeStepDocument.querySelectorAll('#btn_Default a');
			console.log(btns);
			btns[1].click();
		}
		else if(stepStatus == 'price')
		{
			sessionStorage.setItem('stepStatus', 'info');
			birthday = jQuery('#ifrmBookStep').contents().find('input[id="YYMMDD"]');
			birthday.val('860213');
			payment = jQuery('#ifrmBookStep').contents().find('#Payment_22004 [value="22004"]');
			console.log(payment);
			payment.click();
			bankname = jQuery('#ifrmBookStep').contents().find('#BankCode [value="38054"]'); //우리은행
			bankname.attr("selected", true);

			nextStep = jQuery('#ifrmBookStep').contents().find('img[id="NextStepImage"]');
			nextStep.click();
		}
		else if(stepStatus == 'info')
		{
			sessionStorage.setItem('stepStatus', 'agree');
			cancelagree = jQuery('#ifrmBookStep').contents().find('input[id="CancelAgree"]');
			cancelagree.prop("checked", true);
			thirdperson = jQuery('#ifrmBookStep').contents().find('input[id="CancelAgree2"]');
			thirdperson.prop("checked", true);

			nextStep = jQuery('#ifrmBookStep').contents().find('img[id="NextStepImage"]');
			nextStep.click(); // 최종 신청
		}

	}
}


window.addEventListener('load', function() {
	intTimer = setInterval(pageReady, 100);
});


var statMacro = false;
// macro start 버튼 눌리면 flag 변경
document.addEventListener('chkMacro', function(e) {
	statMacro = true;
//	console.log('chkmacro');
	document.dispatchEvent(new CustomEvent('chkMacroBak', { detail: '' }));

});

}