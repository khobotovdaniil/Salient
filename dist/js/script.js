
window.addEventListener('DOMContentLoaded', () => {

    //static/dynamic menu
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

    //skills
    const progressBars = document.querySelectorAll('.skills__list__item__bar_fill');

    function progressBarsData() {
        progressBars.forEach ((item) => {
            item.setAttribute('data-width',item.parentElement.previousElementSibling.innerHTML);
        });
    }

    progressBarsData();

    function fillProgressBar () {
        let progressBarWidth = 0;
        let timerID = setTimeout(function setWidth() {
            progressBars.forEach ((item) => {
                if (progressBarWidth<parseInt(item.getAttribute('data-width'))) {
                    item.style.width = `${progressBarWidth}%`;
                }
            });
            progressBarWidth+=1;
    
            timerID = setTimeout(setWidth, 10);
            if (progressBarWidth>=100) {
                clearTimeout(timerID);
            }
        }, 10);
    }

    //highlight menu objects
    const getId = (link) => link.getAttribute('href').replace('#', '');
    let progressBarFilled = 0;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav__navbar__item__link').forEach((link) => {
                    link.classList.toggle('nav__navbar__item__link_active',
                    getId(link) === entry.target.id
                    );
                });
                if(entry.target.className=='skills' && !progressBarFilled) {
                    fillProgressBar ();
                    progressBarFilled=1;
                }
            }
        });
    }, {
        threshold: 0.4,
    });

    document.querySelectorAll('section').forEach((section) => {
        sectionObserver.observe(section);
    });

    //smooth scroll on click
    document.querySelector('.nav__navbar').addEventListener('click', (event) => {
        if (event.target.classList.contains('nav__navbar__item__link')) {
            event.preventDefault();

            window.scrollTo({
                top: document.getElementById(getId(event.target)).offsetTop,
                behavior: 'smooth',
            });
        }
    });

    //slider
    var glide = new Glide('.works__glide', {
        type: 'carousel',
        startAt: 0,
        autoplay: 2000,
        hoverpause: true,
        perView: 5,
        animationDuration: 1000,
        cloningRatio: 3,
        breakpoints:{
            1199: {
                perView: 3
            },
            768: {
                    perView: 2
            },
            479: {
                perView: 1
            }
        },
    });
    
    glide.mount();

    //wow
    wow = new WOW({
        boxClass:     'wow',      
        animateClass: 'animated', 
        offset:       20,          
        mobile:       false,       
        live:         true        
    });

    wow.init();

});