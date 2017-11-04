require(['nav','photoswipe-init'], function(nav, photoswipeInit) {

    navBurgerCustom.addEventListener('click', nav.toggle);

    document.getElementById('.my-gallery').addEventListener('click', initPhotoSwipeFromDOM('.my-gallery'));


})