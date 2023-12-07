
window.onload = function () {

    // menu 

    let menuBtn = document.getElementById('menuBtn');
    let navList = document.getElementById('navList');
    let navLinks = document.getElementsByClassName('list-item-link');

    // mobile menu button

    menuBtn.addEventListener('click', function () {
        navList.classList.toggle('menu-hidden')
    })

    // hero 

    let slideIndex = 0;
    let slideInterval = 7000;
    let slides = document.getElementsByClassName('carousel-item');

    function carousel() {

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';
        setTimeout(carousel, slideInterval);
    }

    carousel();


    let slidebuttonRight = document.getElementById('slideButtonRight');
    let slidebuttonleft = document.getElementById('slideButtonLeft');


    slideButtonRight.addEventListener('click', function (e) {
        e.preventDefault();

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';

    });


    slideButtonLeft.addEventListener('click', function (e) {
        e.preventDefault();

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex--;

        if (slideIndex === 0) {
            slideIndex = slides.length;
        }

        slides[slideIndex - 1].style.display = 'block';

    });

    // scrollspy

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', scrollIt);
    }


    function scrollIt(e) {
        let targetDiv = document.getElementById(e.target.hash.split('#')[1])
        if (targetDiv) {
            e.preventDefault();
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': targetDiv.offsetTop
            });
            //console.log(targetDiv.offsetTop);
        }
    }




    navLinks[0].classList.add('link-active');
    window.addEventListener('scroll', function (e) {
        let home = this.document.getElementById('home');
        let about = document.getElementById('about');
        let contact = this.document.getElementById('contact');
        if (window.pageYOffset <= home.offsetTop) {
            navLinks[0].classList.add('link-active')
        } else {
            navLinks[0].classList.remove('link-active');
        }

        if (window.pageYOffset >= about.offsetTop && window.pageYOffset < contact.offsetTop  ) {
            navLinks[1].classList.add('link-active')
        } else {
            navLinks[1].classList.remove('link-active');
        }

        if (window.pageYOffset >= contact.offsetTop) {
            navLinks[2].classList.add('link-active')
        } else {
            navLinks[2].classList.remove('link-active');
        }
    });







    // prevent form submit rerender 

    let submitButtons = document.querySelectorAll('button[type=submit]');
    for (let i = 0; i < submitButtons.length; i++) {
        submitButtons[i].addEventListener('click', function (e) {
            e.preventDefault();



        });
    }


}
