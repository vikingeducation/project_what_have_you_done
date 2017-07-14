$(() => {
	function init() {
		app.detectKey();
		app.searchZip();
		app.displayZip();
		app.selectPerson();
		app.returnHome();
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

			if (zipCode) {
				for (let i = 0; i <= 4; i++) {
					let box = $('.sm-zip-box').children()[i];
					let number = zipCode[i];

					$(box).text(number);
				}
			}
			
		},

		selectPerson: function() {
			$('.rep-group-box').on('click', '.rep-box', function() {
				let nameBox = $(this).children()[1];
				let name = $(nameBox).children()[0].innerHTML;

				window.location.href = `/people/${name}`;
			})
		},

		returnHome: function() {
			$('.box-wide').on('click', '.sm-zip-box', function() {
				window.location.href = '/';
			})
		}
	}

	init();
})













