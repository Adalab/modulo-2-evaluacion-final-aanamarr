//Al hacer click en el boton de buscar, se debe hacer una peticion a la API para obtener la informacion de un anime en especifico. La informacion que se debe mostrar es la imagen del anime-titulo.
//primero debemos hacer click en el boton de buscar, para eso utilizamos el handleclick
//luego debemos hacer una peticion a la API para obtener la informacion de un anime en especifico
//Al hacer click en el boton de reset, se debe limpiar el input y el contenedor de resultados.
//Al hacer click en el boton de favoritos, se debe agregar el anime a una lista de favoritos.
//Al hacer click en el boton de favoritos, se debe mostrar un listado de los animes favoritos.

const input = document.querySelector('.js-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const btnEliminateFav = document.querySelector('.js-eliminar-fav');
const listResult= document.querySelector('.js-container-result');
const listFav= document.querySelector('.js-container-selected-fav');


let url = 'https://api.jikan.moe/v4/anime?q=';
let search = url;
let animeList = [];
let favAnime = [];




//INICIO evento eliminar fav
const handleClickEliminateAllFav = () => {
    favAnime = [];//para que se borre todos los datos de favAnime
    listFav.innerHTML = '';
    localStorage.setItem('favAnimeServer', JSON.stringify(favAnime));//también debemos borrar todo el localstorage sino al recargar la pagina volverá a salir los datos guardados en fav
}
btnEliminateFav.addEventListener('click', handleClickEliminateAllFav);
//FIN evento eliminar fav



//INICIO evento btn reset
const handleClickReset = () => {//se crea una funcion para limpiar el input, los favoritos y el contenedor de resultados
    input.value = '';
    listFav.innerHTML = '';
    listResult.innerHTML = '';
}
btnReset.addEventListener('click', handleClickReset);//al final de la funtion debemos llamar el boton para que se ejecute
//FIN event reset


//INICIO evento añadir anime favoritos
const favList = ()=>{
    const favAnime = document.querySelectorAll('.js-anime');//ponemos el querySelectorAll para que se seleccione todas las imagenes de los animes
    for (const img of favAnime){
        img.addEventListener('click', handleClickFav);
    }

}

//FIN evento añadir fav



//llamamos al evento de handleclickfav añadimos una funcion para que al hacer click en la imagen del anime se añada a la lista de favoritos
//Ademas debemos comprobar si el anime ya esta en la lista de favoritos (let animeList), si ya esta no se debe añadir a la lista de favoritos
//ademas se añade la funcion de localStorage para que los favoritos no se pierdan al recargar la pagina, se pone al final de esta función ya que es la última que se ejecuta cuando todos los datos ya estan listos.

//INICIO ev de:hacer click en la imagen se añade a la lista de fav y LS
const handleClickFav= (ev) => {
    const imgClick = parseInt(ev.currentTarget.id);
    console.log(imgClick);//con esto se puede ver en el console si se obtiene el id de la imagen al hacer click
    const imgSelected = animeList.find((eachAnimeList) => eachAnimeList.mal_id === imgClick);//se busca el id de la imagen seleccionada en la lista de animes y se mostrara en el console
    console.log(imgSelected);
    const indexAnimeList = favAnime.findIndex((animeListe) => animeListe.mal_id === imgClick);//se busca el id de la imagen seleccionada en la lista de favoritos para que no se repita hacemos una condicion de IF
    if (indexAnimeList === -1){
        favAnime.push(imgSelected);
        ev.currentTarget.style.border = '7px solid purple';//se añade un borde rojo al hacer click en la imagen
        console.log(favAnime);
        renderFavList();

    } else {
        favAnime.splice(indexAnimeList, 1); //sirve para eliminar un elemento de la lista de favoritos
    }
 localStorage.setItem('favAnimeServer', JSON.stringify(favAnime));//se guarda la lista de favoritos en el localstorage y asi no se pierde la lista al recargar la pagina
};
//FIN



//INICIO
//evento para RENDERIZAR FAV EN la lista de fa y en LocalStorage
const renderFavList = () => {
    listFav.innerHTML = '';
    favAnime.forEach((element) => {
        listFav.innerHTML += 
        `<div class="">
            <img class="js-anime" src="${element.images.jpg.image_url}" alt="Imagen del Anime"/> 
            <p class="anime-title">${element.title}</p>
            <button class="btneliminate js-eliminate-fav" id="${element.mal_id}">X</button>
        </div>`;
    });
    localStorage.setItem('favAnimeServer', JSON.stringify(favAnime));
    addEliminateFavListeners();
};
//FIN

const addEliminateFavListeners = () => {
    const btnEliminateFav = document.querySelectorAll('.js-eliminate-fav');
    for (const btn of btnEliminateFav) {
        btn.addEventListener('click', handleClickEliminateFav);
    }
};



const handleClickEliminateFav = (ev) => {
    const favId = parseInt(ev.currentTarget.id); // Obtener el ID del anime desde el botón
    favAnime = favAnime.filter((anime) => anime.mal_id !== favId); 
    renderFavList(); // Volver a renderizar la lista
    localStorage.setItem('favAnimeServer', JSON.stringify(favAnime)); // Actualizar localStorage
};

//INICIO: Eventos btnSearch y API
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
                const imagesUrl = element.images.jpg.image_url;//creamos una variable para guardar la url de la imagen
                const animeTitle = element.title;//creamos una variable para guardar el titulo del anime
                imagesHTML += `<img class="js-anime" src="${imagesUrl}" alt="Imagen del Anime" id="${element.mal_id}"/> <p class="anime-title">${animeTitle}</p>`;// se guarda la url de la variable imagesUrl en una estructura html de <img> en la variable imagesHTML, luego llamamos a la variable imagesHTML más abajo en el listResult.innerHTML
            });
            listResult.innerHTML = imagesHTML;//se pinta en el html
            favList();
        });
};
btnSearch.addEventListener('click', handleClick);
//FIN eventos btnSearch y API



//INICIO LOCALSTORAGE guardar favoritos en LS
const dataFavLS = localStorage.getItem('favAnimeServer');
if (dataFavLS) {
    favAnime = JSON.parse(dataFavLS);
    renderFavList(favAnime);
    console.log("Favoritos cargados");
} else {
    fetch(search);
    console.log("No hay favoritos");
}
//FIN LOCALSTORAGE