//Al hacer click en el boton de buscar, se debe hacer una peticion a la API para obtener la informacion de un anime en especifico. La informacion que se debe mostrar es la imagen del anime-titulo.
//primero debemos hacer click en el boton de buscar, para eso utilizamos el handleclick
//luego debemos hacer una peticion a la API para obtener la informacion de un anime en especifico
//Al hacer click en el boton de reset, se debe limpiar el input y el contenedor de resultados.
//Al hacer click en el boton de favoritos, se debe agregar el anime a una lista de favoritos.
//Al hacer click en el boton de favoritos, se debe mostrar un listado de los animes favoritos.

const input = document.querySelector('.js-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const listResult= document.querySelector('.js-container-result');
const listFav= document.querySelector('.js-container-selected-fav');

let url = 'https://api.jikan.moe/v4/anime?q=naruto';
let search = url;
let animeList = [];
let favAnime = [];


//evento añadir anime favoritos

const favList = ()=>{
    const favAnime = document.querySelectorAll('.js-anime');
    for (const img of favAnime){
        img.addEventListener('click', handleClickFav);
    }

}
//llamamos al evento de handleclickfav añadimos una funcion para que al hacer click en la imagen del anime se añada a la lista de favoritos
//Ademas debemos comprobar si el anime ya esta en la lista de favoritos (let animeList), si ya esta no se debe añadir a la lista de favoritos
const handleClickFav= (ev) => {
    const imgClick = parseInt(ev.currentTarget.id);
    console.log(imgClick);//con esto se puede ver en el console si se obtiene el id de la imagen al hacer click
    const imgSelected = animeList.find((eachAnimeList) => eachAnimeList.mal_id === imgClick);//se busca el id de la imagen seleccionada en la lista de animes y se mostrara en el console
    console.log(imgSelected);
    const indexAnimeList = favAnime.findIndex((animeListe) => animeListe.mal_id === imgClick);//se busca el id de la imagen seleccionada en la lista de favoritos y para que no se repita hacemos una condicion de IF
    if (indexAnimeList === -1){
        favAnime.push(imgSelected);
        console.log(favAnime);
        renderFavList();
    }
    //favAnime.splice(indexAnimeList, 1); sirve para eliminar un elemento de la lista de favoritos

};

//evento para mostrar la lista de favoritos

const renderFavList = () => {
    listFav.innerHTML = '';
    favAnime.forEach((element) => {
        listFav.innerHTML += `
        <img class="js-anime" src="${element.images.jpg.image_url}" alt="Imagen del Anime"/> <p class="anime-title">${element.title}</p>`;
    });
};

//Eventos btnSearch y API
const handleClick = (ev) => {
    ev.preventDefault();
    console.log('click');
    const searchInput = input.value.toLowerCase();
    search = url + searchInput;
    console.log(search);
    fetch(search)//se hace la peticion a la API al hacer click en el boton de buscar
        .then(resp => resp.json())
        .then((info) => {
            animeList = info.data;//Almacena los resultados en animeList
            console.log(animeList);
            let imagesHTML = '';//se usa para guardar el siguiente codigo
            //Ahora se accede a la url de la imagen
            info.data.forEach((element) => {
                const styleFav = favAnime.some(animefav => animefav.mal_id === element.mal_id);//si en la lista de fav se encuentra el mismo id del animeList, se le asigna estilo css.
                const css = styleFav ? 'favorite' : '';//si se encuentra poner estilo css sino nada"".
                const imagesUrl = element.images.jpg.image_url;//creamos una variable para guardar la url de la imagen
                const animeTitle = element.title;//creamos una variable para guardar el titulo del anime
                imagesHTML += `<img class="js-anime" src="${imagesUrl}" alt="Imagen del Anime" id="${element.mal_id}" ${css}/> <p class="anime-title">${animeTitle}</p>`;// se guarda la url de la variable imagesUrl en una estructura html de <img> en la variable imagesHTML, luego llamamos a la variable imagesHTML más abajo en el listResult.innerHTML
            });
            listResult.innerHTML = imagesHTML;//se pinta en el html
            favList();
        });
};
btnSearch.addEventListener('click', handleClick);
//final eventos btnSearch y API