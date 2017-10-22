// Responsive Navigation Control

let navMenuCustom = document.querySelector('.nav-menu-custom');
let navBurgerCustom = document.querySelector('.nav-burger-custom');

navBurgerCustom.addEventListener('click', toggle);

function toggle() {
	navMenuCustom.classList.toggle('hidden');
}