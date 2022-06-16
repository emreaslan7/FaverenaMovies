const navContent = document.querySelector('nav');
const hiddenNavicon = document.querySelector('.hidden-menu-icon');
const showNavContent = document.querySelector('.show-menu svg');
const showNav = document.querySelector('.show-menu');
const content  = document.querySelector('#content');

addEventListener();

function addEventListener(){
    hiddenNavicon.addEventListener('click',NavHidden);
    showNavContent.addEventListener('click',NavbarShow);
}

// NAVBAR hidden
function NavHidden(){
    navContent.classList.add('show');
    content.classList.add('container');
    showNav.style.display = 'block';
}    

// Navbar Show
function NavbarShow(){
    content.classList.remove('container');
    showNav.style.display = 'none';
    navContent.classList.remove('show');
}