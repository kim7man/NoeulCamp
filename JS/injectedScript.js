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

		var targetDD = sessionStorage.getItem("targetDD");
		dayTags.forEach(function(dayTag) {
//			if (dayTag.getAttribute('class') && dayTag.getAttribute('class').includes('selOn')) {
//				targetImgTags.push(dayTag);
//			}
			if (dayTag.text.split('(')[0] == targetDD)
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
		else
		{
			console.log('해당 날짜는 예약할 수 없습니다. 변경 후 다시 시작해주세요.');
		}
		
		}
		else if(stat == 'length')
		{
			console.log('이용기간 선택');
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
				sfnClickNights = "fnCheckInSelect('"+j$('#SelectCheckIn')[0].options[1].value+"');";
				j$("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
				j$("#ClickNights")[0].click();
			}
			else
			{//2박 선택 
				sfnClickNights = "fnCheckInSelect('"+j$('#SelectCheckIn')[0].options[2].value+"');";
				j$("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
				j$("#ClickNights")[0].click();
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
//		btns = j$('#btn_Default a');
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

	window.CaptchaYN = 'N';
	clearCaptchaLayer();

	// macro start 버튼 확인
	if (statMacro)
	{
		clearInterval(intTimer);
		setTimeout(function(){
			console.log("macroStart");
			calendarObserver.observe(document.querySelector("#BookingDateTime"), {
				// 변경을 감지할 요소를 지정합니다.
				subtree: true,
				// 변경의 종류를 지정합니다.
				attributes: true,
				childList: true,
				characterData: true,
			});

			j$('#ClickMon')[0].click();

			// 원하는 날짜 클릭
			clickDay();
		},500);
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


function clearCaptchaLayer() {
	if (j$('div.captchSliderLayer')[0].style.display != 'none')
	{
		j$('div.captchSliderLayer')[0].style.display = 'none';
	}
	if (j$('#divRecaptchaWrap')[0].style.display != 'none')
	{
		j$('#divRecaptchaWrap')[0].style.display = 'none';
	}
	if (j$('#divRecaptcha')[0].style.display != 'none')
	{
		j$('#divRecaptcha')[0].style.display = 'none';
	}
}


var trial = 0;
function clickDay()
{
	if (trial==0)
	{
		j$('#ClickMon')[0].click();
	}
	else
	{
	var targetDD = sessionStorage.getItem("targetDD");
	strDD = targetDD;
	console.log(strDD);
	setTimeout(function(){
		sfnClickDay =  j$('a:contains("' + strDD + '")');
		console.log(sfnClickDay.length);
		if(sfnClickDay.length)
		{
			console.log('click the date');
			sfnClickDay[0].click();
		}
		else
		{
			console.log('Select a date');
		}
	}, 100);
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
		sfnClickNights = "fnCheckInSelect('"+j$('#SelectCheckIn')[0].options[1].value+"');";
		j$("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
//		j$("#ClickNights")[0].click();
	}
	else
	{//2박 선택 
		sfnClickNights = "fnCheckInSelect('"+j$('#SelectCheckIn')[0].options[2].value+"');";
		j$("div#divMacro").append('<a id="ClickNights" href="javascript:' + sfnClickNights + ';"> N</a>');
		j$("#ClickNights")[0].click();
	}
}

function clickArea()
{
	var targetBB = sessionStorage.getItem("targetBB");
	var targetSS = sessionStorage.getItem("targetSS");

	var siteNum = targetBB.charCodeAt(0) - 'A'.charCodeAt(0)+1;
//	if (siteNum == 4)
//	{
//		siteNum = 0;
//	}

	setTimeout(function(){
		var iframe = document.getElementById('ifrmSeat');
		var iframeDocument = iframe.contentWindow.document;
		var areaTag = iframeDocument.querySelectorAll('area');
		var clickEvent = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true
		});
		
		console.log(areaTag);
		if(areaTag)
		{
			areaTag[0].onmouseover();


			// 사이트 번호가 0이하이면 빈자리 탐색 모드, 1이상이면 고정자리 선택모드
			if(targetSS == '0')
			{
				timerInt = setInterval(function(){
					j$('a.btn_map')[0].click();

					iframe = document.getElementById('ifrmSeat');
					iframeDocument = iframe.contentWindow.document;
					areaTag = iframeDocument.querySelectorAll('area');

					areaTag.forEach(function(tag) {
						tag.onmouseover();
						const [areaCode, remainingSeats] = tag.alt.match(/\d+/g) || [];
						console.log(areaCode, remainingSeats);
						if(areaCode && (areaCode == '005' || areaCode == '006')){
							return;
						}
						if(remainingSeats && remainingSeats != '0'){
							clearInterval(timerInt);
							console.log('탐색모드');

							iframeObserver.observe(document.querySelector("#ifrmSeat").contentWindow.document, {
								// 변경을 감지할 요소를 지정합니다.
								subtree: true,
								// 변경의 종류를 지정합니다.
								attributes: true,
								childList: true,
								characterData: true,
							});

							// 탐색모드 코드 삽입
							stateMode = 0;
							tag.dispatchEvent(clickEvent);
							return;
						}
					});
				}, 1000);
			}
			else
			{
				areaTag.forEach(function(tag) {
					const [areaCode, remainingSeats] = tag.alt.match(/\d+/g) || [];
					if(areaCode && areaCode == siteNum){

						iframeObserver.observe(document.querySelector("#ifrmSeat").contentWindow.document, {
							// 변경을 감지할 요소를 지정합니다.
							subtree: true,
							// 변경의 종류를 지정합니다.
							attributes: true,
							childList: true,
							characterData: true,
						});

						console.log(areaCode, remainingSeats);
						console.log('고정좌석모드');
						// 고정좌석모드 코드 삽입
						stateMode = 1;
						tag.dispatchEvent(clickEvent);
						return;
					}
				});
			}
		}
	}, 100);
}

var stateMode = 0;

function payment_process()
{
	sessionStorage.setItem('stepStatus', 'next');
	document.getElementById('ifrmBookStep').onload = function() {
		stepStatus = sessionStorage.getItem('stepStatus');
		var iframeStep = document.getElementById('ifrmBookStep');
		var iframeStepDocument = iframeStep.contentWindow.document;

		if (stepStatus == 'next')
		{
			console.log('check detail');
			sessionStorage.setItem('stepStatus', 'price');
			btns=iframeStepDocument.querySelectorAll('#btn_Default a');
//			console.log(btns);
			btns[1].click();
		}
		else if(stepStatus == 'price')
		{
			console.log('payment info');
			sessionStorage.setItem('stepStatus', 'info');
			birthday = j$('#ifrmBookStep').contents().find('input[id="YYMMDD"]');
			birthday.val('860213');
			payment = j$('#ifrmBookStep').contents().find('#Payment_22004 [value="22004"]');
//			console.log(payment);
			payment.click();
			bankname = j$('#ifrmBookStep').contents().find('#BankCode [value="38054"]'); //우리은행
			bankname.attr("selected", true);

			nextStep = j$('#ifrmBookStep').contents().find('img[id="NextStepImage"]');
			nextStep.click();
		}
		else if(stepStatus == 'info')
		{
			console.log('last check');
			sessionStorage.setItem('stepStatus', 'agree');
			cancelagree = j$('#ifrmBookStep').contents().find('input[id="CancelAgree"]');
			cancelagree.prop("checked", true);
			thirdperson = j$('#ifrmBookStep').contents().find('input[id="CancelAgree2"]');
			thirdperson.prop("checked", true);

			nextStep = j$('#ifrmBookStep').contents().find('img[id="NextStepImage"]');
			nextStep.click(); // 최종 신청
		}
	}

}

function clickSite()
{
	if(stateMode)
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
			if (targetImgTags.length)
			{
				targetImgTags[0].click();
			}
			else{
				console.log('해당 좌석이 이미 선택돼있습니다. 다른 자리로 다시 시도해주세요.');
				return;
			}

			var btnNextStep = iframeDocument.getElementsByClassName('btn_next_step');
			btnNextStep[0].click();

		}

		payment_process()

	}
	else
	{
		console.log('select seat process');
		document.getElementById('ifrmSeat').onload = function() {
			var iframe = document.getElementById('ifrmSeat');
			var iframeDocument = iframe.contentWindow.document;
			var seatAvailable = iframeDocument.querySelectorAll('img.stySeat');

			if (seatAvailable.length)
			{
				seatAvailable[0].click();
			}
			var btnNextStep = iframeDocument.getElementsByClassName('btn_next_step');
			console.log('seat click');
			btnNextStep[0].click();
		}

		payment_process()
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