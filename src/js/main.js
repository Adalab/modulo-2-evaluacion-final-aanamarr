//Al hacer click en el boton de buscar, se debe hacer una peticion a la API para obtener la informacion de un anime en especifico. La informacion que se debe mostrar es la imagen del anime.
//primero debemos hacer click en el boton de buscar, para eso utilizamos el handleclick
//luego debemos hacer una peticion a la API para obtener la informacion de un anime en especifico
//Al hacer click en el boton de reset, se debe limpiar el input y el contenedor de resultados.
//Al hacer click en el boton de favoritos, se debe agregar el anime a una lista de favoritos.
//Al hacer click en el boton de favoritos, se debe mostrar un listado de los animes favoritos.

const input = document.querySelector('.js-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const listResult= document.querySelector('.js-result');
const listFav= document.querySelector('.js-container-fav');

let url = 'https://api.jikan.moe/v4/anime?q=naruto';
let search = url;


//Eventos btnSearch
const handleClick = (ev) => {
    ev.preventDefault();
    console.log('click');
    const searchInput = input.value.toLowerCase();
    search = url + searchInput;
    console.log(search);
    fetch(search)//se hace la peticion a la API al hacer click en el boton de buscar
        .then(resp => resp.json())
        .then((info) => {
            console.log(info);
            let imagesHTML = '';//se usa para guardar el siguiente codigo
            //Ahora se accede a la url de la imagen
            info.data.forEach((element) => {
                const imagesUrl = element.images.jpg.image_url;//creamos una variable para guardar la url de la imagen
                imagesHTML += `<img class="anime" src="${imagesUrl}" alt="Imagen del Anime"/>`;// se guarda la url de la variable imagesUrl en una estructura html de <img> en la variable imagesHTML, luego llamamos a la variable imagesHTML más abajo en el listResult.innerHTML
            });
            listResult.innerHTML = imagesHTML;//se pinta en el html
        });

};
btnSearch.addEventListener('click', handleClick);
//final eventos btnSearch y API