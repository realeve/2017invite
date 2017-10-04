(function(){
    var video = document.querySelector('#mainvideo');
    $('.begin').on('touchstart', function () {
        // $('.loading').hide();
        video.play();
        video.pause();
    });    
})();