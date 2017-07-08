$(() => {
	function init() {
		input.detectKey();
	}

	const input = {

		detectKey: function() {
			let inputBoxes = $('.zip-input-box').children();
			let i = 0;
			let selectedBox = inputBoxes[i];
			let inner = $(selectedBox).children()[0];

			$(document).keydown(function(e) {
				let selectedKey;
				if (e.keyCode >= 48 && e.keyCode <= 57 && i <= 4) {
					selectedKey = e.key;

					if (selectedKey && i <= 5) {
						
						$(selectedBox).removeClass('active-number-box');

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

					i--;

					selectedBox = inputBoxes[i];
					inner = $(selectedBox).children()[0];

					$(selectedBox).addClass('active-number-box'); 

					$(inner).text('');
					$(inner).addClass('mark-across active-mark');
					
				} 

				if (i >= 5) {
					let btn = $('<button class="submit-btn" type="submit">Go!</button>');

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

				

			})
		}
	}

	init();
})