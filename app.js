let searchAPIUrl = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

let APIUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const imgPath = 'https://image.tmdb.org/t/p/w1280';

const main = document.querySelector('main');

const form = document.getElementById('form');

getMovies(APIUrl );

async function getMovies(url){
    const resp = await fetch(url);
    const respData= await resp.json();
    // console.log(respData.results);

    showMovies(respData.results)

    
    
    return respData;
}

function getVotes(vote){
    if(vote>=8){
        return 'green'
    }else if(vote >= 5){
        return 'yellow'
    }else{
        return 'red'
    }
}

function showMovies(movies){
    main.innerHTML ="";
    movies.forEach((movie)=>{
        const img = document.createElement('div');
        img.classList.add('movie-list');
        const{poster_path, title, vote_average,overview} = movie
        img.innerHTML = `
                <div class="movie">
                    <img
                        src="${imgPath + poster_path}"
                        class="img-fluid"
                        alt="${title}"
                    />
                </div>
                <div class="movie-info">
                    <h3 class="title">
                        ${title}
                    </h3>
                    <span class="rating ${getVotes(vote_average)}">
                        ${vote_average}
                    </span>
                </div>
                <div class="overview">
                    ${overview}
                </div>
        `

        main.appendChild(img);
    })
    
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const search = document.getElementById("take").value;
    // console.log(search);

    if(search){

        getMovies(searchAPIUrl + search );


        search.value = "";
    }

})

