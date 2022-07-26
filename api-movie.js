export class Request{
    API_KEY = "41c5c036959690ae51318d3681db0480";
    constructor(url){
        this.url = url;
    }

    async GET(querydata){
        const response = await fetch(this.url+querydata);
        const responseData = await response.json();
        return responseData;
    }
}

// const url = "https://api.themoviedb.org/3/movie/56/images?api_key=41c5c036959690ae51318d3681db0480&language=en-US";
// fetch(url).then(response => response.json())
// .then(response => console.log(response));