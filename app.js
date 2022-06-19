const navContent = document.querySelector('nav');
const hiddenNavicon = document.querySelector('.hidden-menu-icon');
const showNavContent = document.querySelector('.show-menu svg');
const showNav = document.querySelector('.show-menu');
const content  = document.querySelector('#content');
const addMovieBtn = document.querySelector('#addMovieBtn');
const closeAddFormBtn = document.querySelector('#closeaddformbtn');
const addMovieFormdiv =  document.querySelector('.addMovieForm');
const addMovieForm = document.querySelector('.addMovieForm form');
// input form new film
const inputMoviename = document.querySelector('#movie-name');
const inputMovieauthor = document.querySelector('#movie-author');
const inputMovieposterurl = document.querySelector('#poster-url');
const inputMovieimdb = document.querySelector('#imdb-rank');
const inputMovieHistory = document.querySelector('#radio-history');

const errorMessage = document.querySelector('#error-message');
const errorClose = document.querySelector('.fa-xmark');

const MY_COLLETION = [];
const HISTORY = [];
const WATCH_LATER = [];
const STARRED_FILMS = [];

addEventListener();

function addEventListener(){
    hiddenNavicon.addEventListener('click',NavHidden);
    showNavContent.addEventListener('click',NavbarShow);
    addMovieBtn.addEventListener('click',OpenAddMovieForm)
    closeAddFormBtn.addEventListener('click',CloseAddMovieForm);
    addMovieForm.addEventListener('submit',AddMovieToUI);
    errorClose.addEventListener('click',CloseErrorMessage);
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

// Add movie form open & close
function OpenAddMovieForm(){
    addMovieFormdiv.style.display = 'flex';
    NavHidden();
}
function CloseAddMovieForm(){
    addMovieFormdiv.style.display = 'none';
}

// Close error message
function CloseErrorMessage(){
    errorMessage.style.display = 'none';
}

// new film constructor
function Film(name,director,url,imdb,history){
    this.name = name;
    this.director = director;
    this.url = url;
    this.imdb = imdb;
    this.history = history;
}

function AddMovieToUI(e){
    const filmList = document.querySelector('#movies ul');
    const name = inputMoviename.value;
    const director = inputMovieauthor.value;
    const url = inputMovieposterurl.value;
    const imdb = inputMovieimdb.value;
    const history = inputMovieHistory.checked;

    if(name == "" | director == "" | url == ""| imdb == ""){
        errorMessage.style.display = 'block';
    }else{
        const newfilm = new Film(name,director,url,imdb,history);
        filmList.innerHTML += `
        <li>
            <div class="poster">
                <img src="${newfilm.url}" alt="movie">
                <div class="rank">
                ${newfilm.imdb}
                </div>
            </div>
            <div class="movie-desc">
                <div>
                    <h6 class="movie-name">${newfilm.name}</h6>
                    <p class="author">${newfilm.director}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
        </li>   `
        CloseErrorMessage();
        CloseAddMovieForm();
    }
    e.preventDefault();
}