'use strict';
// Custom scripts
$(document).ready(function(){
  
  
  function cbpAnimatedHeader() {
    var docElem = document.documentElement,
      didScroll = false,
      changeHeaderOn = 300;
    function init() {
      window.addEventListener( 'scroll', function( ) {
        if( !didScroll ) {
          didScroll = true;
          setTimeout( scrollPage, 250 );
        }
      }, false );
    }
    function scrollPage() {
      var sy = scrollY();
      if ( sy >= changeHeaderOn ) {
        $( '.navbar-default' ).addClass('navbar-shrink' );
      }
      else {
        $( '.navbar-default' ).removeClass('navbar-shrink' );
      }
      didScroll = false;
    }
    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }
    init();
  }
  
  cbpAnimatedHeader();

  var scrollToPosition = function(event) {
    var target;
    if (event !== null) {
      event.preventDefault();
    }
    target = $(this).attr('href');
    $('body').animate({
      scrollTop: $(target).offset().top + 1
    }, 500, function() {
      window.location.hash = target;
    });
  };
  $('#main-nav a').click(scrollToPosition);
  
  var clickedModalNavigationItem = false;
  function loadDifferentContent() {
  $('.load-different-content').each(function () {
      $(this).on('click', function (e) {
          e.preventDefault();
          //get to be loaded div id
          var toBeLoadedId = $(this).attr('data-content');
          console.log('to be loaded id = ' + toBeLoadedId);
          //copy to be loaded content
          var contentToBeLoaded = $(toBeLoadedId).find('.modal-content').html();
          //get the opened modal
          var openModal = $(this).parents('.basics-modal');
          //get the open modal id
          var openModalId = $(openModal).attr('id');
          console.log('open modal id = ' + openModalId);
          //store original content
          var originalData = $(openModal).html();
          if(!clickedModalNavigationItem){
            $('#basicsModalHolder').html(originalData);
            clickedModalNavigationItem = true;
          }
          //clear old data
          $(openModal).removeData('bs.modal');
          //verify if data needed is new or the original
          if(toBeLoadedId == '#' + openModalId){
            var originalDataContent = $('#basicsModalHolder').find('.modal-content').html();
            //append original data it var request data-content is equal to the original modal id
            $(openModal).find('.modal-content').html(originalDataContent);
          } else {
            //append new data
            $(openModal).find('.modal-content').html(contentToBeLoaded);
          }
          //show new data
          $(openModal).modal('show');
          //make generic nav function available to new content
          loadDifferentContent();
        });
    });
  }

  loadDifferentContent();
  
});



