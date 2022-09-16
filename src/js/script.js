window.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('nav');

    window.onscroll = function() {
        if (window.pageYOffset>120) {
            navMenu.classList.add('nav_dynamic');
            navMenu.classList.remove('nav_static');
        } else {
            navMenu.classList.add('nav_static'); 
            navMenu.classList.remove('nav_dynamic');
        }
    };
    

    new WOW().init();
});