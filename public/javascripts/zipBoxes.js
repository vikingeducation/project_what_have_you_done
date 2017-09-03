function Box(element) {
  this.value = null
  this.$element = element


  this.create = function() {
    $(element).removeClass('active');
    if (this.value){
      $(element).removeClass('empty');
    } else {
      $(element).addClass('empty');
    }
    $(element).find('.zip-text').text(this.value || "-")
  }

  this.activate = function() {
    $(element).addClass('active');
  }



}

$(function(){

  let boxes = [];
  let $boxes = $('.zip-box');

  $boxes.each(function(idx, el){
    boxes.push(new Box(el))
  })

  function makeBoxes() {
    boxes.forEach(function(element){
      element.create();
    });

  }

  function addNumber(number){
    let $first = $('.empty:first');
    $first.removeClass('empty');
    $first.addClass('full')
    $first.find('.zip-text').text(number);
    checkSlide();
  };

  function deleteNumber(number){
    let $last = $('.full').last()
    $last.removeClass('full')
    $last.addClass('empty')
    $last.find('.zip-text').text('-')
    checkSlide();
  }

  $(document).keydown(function(e){
    let key = e.originalEvent.key
    var numKey = parseInt(key)

    if (numKey || numKey === 0){
      addNumber(numKey);
    } else if (key === 'Backspace'){
      deleteNumber();
    }
  });

  function checkSlide(){
    if ($('.empty').length){
      $('.submit').slideUp();
    } else {
      $('.submit').slideDown();
      setZip('.zip-text');

    }
  }

  function setZip(element) {
    let zip = [];
    for (let i=0; i<5; i++){
      zip.push($(element).eq(i).text())
    }
    $('.submit input').eq(0).val(zip.join('')) 
  }

  // $('.submit').click(function(){
  //   let zip = getValues('.zip-text');
  //   $('')
  // })

  makeBoxes();
  checkSlide();

});
