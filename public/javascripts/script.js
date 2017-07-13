$(() => {
	function init() {
		app.detectKey();
		app.searchZip();
		app.displayZip();
	}

	const app = {
		zipCode: '',

		detectKey: function() {
			let inputBoxes = $('.zip-input-box').children();
			let i = 0;
			let selectedBox = inputBoxes[i];
			let inner = $(selectedBox).children()[0];
			let zipCode = '';

			$(document).keydown(function(e) {
				let selectedKey;

				if (e.keyCode >= 48 && e.keyCode <= 57 && i <= 4) {
					selectedKey = e.key;

					if (selectedKey && i <= 5) {
						$(selectedBox).removeClass('active-number-box');

						zipCode += selectedKey;

						$(inner).removeClass()
						$(inner).text(selectedKey);

						i++

						selectedBox = inputBoxes[i];
						inner = $(selectedBox).children()[0];
						
						$(selectedBox).addClass('active-number-box');
						$(inner).addClass('mark-across active-mark')
					}

				} else if (e.keyCode === 8 && i > 0) {
					$(selectedBox).removeClass('active-number-box');
					$(inner).removeClass('active-mark');

					zipCode = zipCode.slice(0, -1);

					i--;

					selectedBox = inputBoxes[i];
					inner = $(selectedBox).children()[0];

					$(selectedBox).addClass('active-number-box'); 

					$(inner).text('');
					$(inner).addClass('mark-across active-mark');
				} 

				if (i >= 5) {
					let btn = $('<button class="submit-btn" type="submit">Go!</button>');
					
					app.zipCode = zipCode;

					$('.zip-box').addClass('stretch');

					setTimeout(function(){ 
						if ($('.zip-box').hasClass('stretch')) {
							$(btn).hide().appendTo('.zip-box').fadeIn(100);
						}	
					}, 200);

				} else {
					$('.submit-btn').fadeOut(200, function() {
						$(this).hide().remove();
					})

					$('.zip-box').removeClass('stretch');
				}
			});
		},

		searchZip: function() {
			$('.zip-box').on('click', '.submit-btn', function() {
				window.location.href = `/results/${app.zipCode}`;
			})
		},

		displayZip: function() {
			let zipCode = window.location.href.split('/')[4];

			let boxOne = $('.sm-zip-box').children()[0];
			let boxTwo = $('.sm-zip-box').children()[1];
			let boxThree = $('.sm-zip-box').children()[2];
			let boxFour = $('.sm-zip-box').children()[3];
			let boxFive = $('.sm-zip-box').children()[4];

			console.log(window.location.href.split('/'));

			for (let i = 0; i <= 4; i++) {
				let box = $('.sm-zip-box').children()[i];
				let number = zipCode[i];

				$(box).text(number);
				// console.log(number);
				// console.log(box);
			}
		}
	}

	init();
})













