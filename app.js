const navContent = document.querySelector('nav');
const hiddenNavicon = document.querySelector('.hidden-menu-icon');
const showNavContent = document.querySelector('.show-menu svg');
const showNav = document.querySelector('.show-menu');
const content  = document.querySelector('#content');
const addMovieBtn = document.querySelector('#addMovieBtn');
const closeAddFormBtn = document.querySelector('#closeaddformbtn');
const addMovieForm =  document.querySelector('.addMovieForm');
console.log(addMovieForm);

addEventListener();

function addEventListener(){
    hiddenNavicon.addEventListener('click',NavHidden);
    showNavContent.addEventListener('click',NavbarShow);
    addMovieBtn.addEventListener('click',OpenAddMovieForm)
    closeAddFormBtn.addEventListener('click',CloseAddMovieForm);
}

// Navbar Show
function NavbarShow(){
    content.classList.remove('container');
    content.classList.add('container-wthmenu');
    navContent.classList.add('show');
    showNav.style.display = 'none';
}

// NAVBAR hidden
function NavHidden(){
    navContent.classList.remove('show');
    content.classList.remove('container-wthmenu');
    content.classList.add('container');
    showNav.style.display = 'block';
}    

function OpenAddMovieForm(){
    addMovieForm.style.display = 'flex';
    NavHidden();
}
function CloseAddMovieForm(){
    addMovieForm.style.display = 'none';
}