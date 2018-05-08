// Responsive Navigation Control
define([], function() {
	let navMenuCustom = document.querySelector('.nav-menu-custom');
	let navBurgerCustom = document.querySelector('.nav-burger-custom');

	function toggle() {
		navMenuCustom.classList.toggle('hidden');
	}

	return toggle;

})