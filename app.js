const navContent = document.querySelector('nav');
const hiddenNavicon = document.querySelector('.hidden-menu-icon');
const showNavContent = document.querySelector('.show-menu svg');
const showNav = document.querySelector('.show-menu');
const content  = document.querySelector('#content');
const addMovieBtn = document.querySelector('#addMovieBtn');
const filmList = document.querySelector('#movies ul');
const closeAddFormBtn = document.querySelector('#closeaddformbtn');
const addMovieFormdiv =  document.querySelector('.addMovieForm');
const addMovieForm = document.querySelector('.addMovieForm form');
// input form new film
const inputMoviename = document.querySelector('#movie-name');
const inputMovieauthor = document.querySelector('#movie-author');
const inputMovieposterurl = document.querySelector('#poster-url');
const inputMovieimdb = document.querySelector('#imdb-rank');
const inputMovieHistory = document.querySelector('#radio-history');
//ERROR
const errorMessage = document.querySelector('#error-message');
const errorClose = document.querySelector('.fa-xmark');
//MOVİE NUMBER
const myCollectionNumber = document.querySelectorAll('.movies-number')[0];
const HistoryNumber = document.querySelectorAll('.movies-number')[1];
const WatchLaterNumber = document.querySelectorAll('.movies-number')[2];
const StarredNumber = document.querySelectorAll('.movies-number')[3];

const showLinksUl = document.querySelector('.main-links ul');
//Search
const searchmovie = document.querySelector('#search-movie');
console.log(searchmovie);

addEventListener();

function addEventListener(){
    document.addEventListener('DOMContentLoaded',LoadAllChangesToUI);
    hiddenNavicon.addEventListener('click',NavHidden);
    showNavContent.addEventListener('click',NavbarShow);
    addMovieBtn.addEventListener('click',OpenAddMovieForm)
    closeAddFormBtn.addEventListener('click',CloseAddMovieForm);
    addMovieForm.addEventListener('submit',AddMovieToUI);
    errorClose.addEventListener('click',CloseErrorMessage);
    filmList.addEventListener('click',DeleteMovieFromUI);
    showLinksUl.addEventListener('click',ShowMoviesToUI);
    searchmovie.addEventListener('keyup',SearchMovieForUser);
}

// all todos list to UI when load page
function LoadAllChangesToUI(e){
    let myCollection = getMoviesFromStorage();
    myCollection.forEach(movie =>{

        filmList.innerHTML += `
        <li>
            <div class="poster">
                <img src="${movie.url}" alt="movie">
                <div class="rank">
                ${movie.imdb}
                </div>
            </div>
            <div class="movie-desc">
                <div>
                    <h6 class="movie-name">${movie.name}</h6>
                    <p class="author">${movie.director}</p>
                </div>
                <div class="movies-icons">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 starred-movie" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 delete-movie" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
            </div>
        </li>   `
    })
    // movies numbers
    myCollectionNumber.innerHTML = myCollection.length;

    let HistoryMovies = getHistoryMoviesFromStorage();
    HistoryNumber.innerHTML = HistoryMovies.length;

    let WatchLaterMovies = getWatchLaterMoviesFromStorage();
    WatchLaterNumber.innerHTML = WatchLaterMovies.length;

    // fill stared movies when page loaded
    let starredmovies = getStarredMoviesFromStorage();
    const starredicon = document.querySelectorAll('.starred-movie');

    starredicon.forEach(staricn =>{
        starredmovies.forEach(starmovie =>{
            if(starmovie.name == staricn.parentNode.previousSibling.previousSibling.firstChild.nextSibling.textContent){
                staricn.style.fill = 'currentColor'; 
            }
        })
        
    })
    StarredNumber.innerHTML = starredmovies.length;
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

function getMoviesFromStorage(){
    let myCollection;

    if(localStorage.getItem('myCollection') == null){
        myCollection = [];
    }else{
        myCollection = JSON.parse(localStorage.getItem('myCollection'));
    }
    return myCollection;
}

function getHistoryMoviesFromStorage(){
    let HistoryMovies;
    if(localStorage.getItem('HistoryMovies') == null){
        HistoryMovies = [];
    }else{
        HistoryMovies = JSON.parse(localStorage.getItem('HistoryMovies'));
    }
    return HistoryMovies;
}

function getWatchLaterMoviesFromStorage(){
    let WatchLaterMovies;
    if(localStorage.getItem('WatchLaterMovies') == null){
        WatchLaterMovies = [];
    }else{
        WatchLaterMovies = JSON.parse(localStorage.getItem('WatchLaterMovies'));
    }
    return WatchLaterMovies;
}

function getStarredMoviesFromStorage(){
    let StarredMovies;
    if(localStorage.getItem('StarredMovies') == null){
        StarredMovies = [];
    }else{
        StarredMovies = JSON.parse(localStorage.getItem('StarredMovies'));
    }
    return StarredMovies;
}

function AddMovieToUI(e){
    
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
                <div class="rank">${newfilm.imdb}</div>
            </div>
            <div class="movie-desc">
                <div>
                    <h6 class="movie-name">${newfilm.name}</h6>
                    <p class="author">${newfilm.director}</p>
                </div>
                <div class="movies-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 starred-movie" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 delete-movie" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
        </li>`
        CloseErrorMessage();
        CloseAddMovieForm();
        inputMoviename.value ="";
        inputMovieauthor.value ="";
        inputMovieposterurl.value="";
        inputMovieimdb.value="";

        //add to local storage
        let myCollection = getMoviesFromStorage();
        myCollection.push(newfilm);
        localStorage.setItem('myCollection',JSON.stringify(myCollection));

        if(newfilm.history == true){
            let historyMovies = getHistoryMoviesFromStorage();
            historyMovies.push(newfilm);
            localStorage.setItem('HistoryMovies',JSON.stringify(historyMovies));
        }else{
            let WatchLaterMovies = getWatchLaterMoviesFromStorage();
            WatchLaterMovies.push(newfilm);
            localStorage.setItem('WatchLaterMovies',JSON.stringify(WatchLaterMovies));
        }

        // movies numbers
        myCollectionNumber.innerHTML = myCollection.length;
        HistoryNumber.innerHTML = historyMovies.length;
        WatchLaterNumber.innerHTML = WatchLaterMovies.length;

    }
    e.preventDefault();
}

function DeleteMovieFromUI(e){

    const filmname = e.target.parentNode.previousSibling.previousSibling.firstChild.nextSibling.textContent;
    confirmMessageforDelete = `Are you sure you want to delete ${filmname}`;

    if(e.target.classList == "h-6 w-6 delete-movie"){
        if(confirm(confirmMessageforDelete) == true){

            // delete from UI
            e.target.parentNode.parentNode.parentNode.remove();

            // delete from storage
            let movies = getMoviesFromStorage();
            movies.forEach( (movie,index)=> {
                if(movie.name == filmname){
                    movies.splice(index,1);
                }
            })
            localStorage.setItem('myCollection',JSON.stringify(movies));

            // delete history array 
            let HistoryMovies = getMoviesFromStorage();
            HistoryMovies.forEach( (movie,index)=> {
                if(movie.name == filmname){
                    movies.splice(index,1);
                }
            })
            localStorage.setItem('HistoryMovies',JSON.stringify(HistoryMovies));

            //delete watch later array
            let WatchLaterMovies = getWatchLaterMoviesFromStorage();
            WatchLaterMovies.forEach( (movie,index)=> {
                if(movie.name == filmname){
                    movies.splice(index,1);
                }
            })
            localStorage.setItem('WatchLaterMovies',JSON.stringify(WatchLaterMovies));

            //movies numbers
            myCollectionNumber.innerHTML = movies.length;
            HistoryNumber.innerHTML = HistoryMovies.length;
            WatchLaterNumber.innerHTML = WatchLaterMovies.length;
        }
    }
    if(e.target.classList == "h-6 w-6 starred-movie"){
        if(e.target.style.fill == ''){
            e.target.style.fill = 'currentColor';
            let starredMovies = getStarredMoviesFromStorage();
            let allfilms = getMoviesFromStorage();
            allfilms.forEach(movie =>{
                if(movie.name == filmname){
                    starredMovies.push(movie);
                    localStorage.setItem('StarredMovies',JSON.stringify(starredMovies));;
                    StarredNumber.innerHTML = starredMovies.length;
                }
            })
        }
        else{
            e.target.style.fill = '';
            let starredmovies = getStarredMoviesFromStorage();
            starredmovies.forEach((movie,index) =>{
                if(movie.name == filmname){
                    starredmovies.splice(index,1);
                    localStorage.setItem('StarredMovies',JSON.stringify(starredmovies));;
                    StarredNumber.innerHTML = starredmovies.length;
                }
            })
        }    
    }   
}

function ShowMoviesToUI(e){
  
    let allmovies = document.querySelectorAll('#movies ul li');

    allmovies.forEach(movie =>{
        let movieName = movie.children[1].children[0].children[0].textContent;
        movie.style.display = 'none';

        if(e.target.id == 'show-mycollection'){
            movie.style.display = 'block';
        }
        else if(e.target.id == 'show-history'){

            let historymovies = getHistoryMoviesFromStorage();
            historymovies.forEach(historymovie =>{
                if(movieName == historymovie.name){
                    movie.style.display = 'block';
                }
            })
            
        }else if(e.target.id == 'show-watchlater'){
            
            let watchlatermovies = getWatchLaterMoviesFromStorage();
            watchlatermovies.forEach(watchlatermovie =>{
                if(movieName == watchlatermovie.name){
                    movie.style.display = 'block';
                }
            })

        }else if(e.target.id == 'show-starredfilms'){
            
            let starredfilms = getStarredMoviesFromStorage();
            starredfilms.forEach(starredfilm =>{
                if(movieName == starredfilm.name){
                    movie.style.display = 'block';
                }
            })

        }
        
    })
}

// search movie func
function SearchMovieForUser(e){
    const searchitem = e.target.value.toLowerCase();

    let allmovies = document.querySelectorAll('#movies ul li');

    allmovies.forEach(movielielement =>{
        const moviename = movielielement.innerText.toLowerCase();

        if(moviename.indexOf(searchitem) === -1){
            movielielement.style.display = 'none';
        }
        else{
            movielielement.style.display = 'block';
        }  
    })
}