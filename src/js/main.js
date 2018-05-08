import nav from 'nav.js';
import photoswipe from 'photoswipe-init.js';

navBurgerCustom.addEventListener('click', nav.toggle);

document.getElementById('.my-gallery').addEventListener('click', initPhotoSwipeFromDOM('.my-gallery'));
