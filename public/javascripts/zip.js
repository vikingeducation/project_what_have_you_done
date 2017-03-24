$( document ).ready(function() {
  $('.zip-box').on('click', function(e){
    $('.zip-box').removeClass('active')

    $(this).toggleClass('active')
  })
});