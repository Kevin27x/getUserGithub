//Requisitos:
//crear 3 funciones: Request, getUser, getRepo. USAR ASYNC/AWAIT
//Capturar nombre, número de pagina y repositorios por páginas
//Mostrar resultados en el DOM. Validar si es que existe el Usuario
//-----------------------DESARROLLO---------------------
const url_base = "https://api.github.com/users";

const request = async (url) => {
    
    const getFetch = await fetch(url);
    if(getFetch.status === 200){
        const parseFetch = await getFetch.json()
        return parseFetch;
    } else {
        return getFetch.status;
    }

}


const getRepo = async(user, nPag, reposPag) => {
    const urlRepo = `${url_base}/${user}/repos?page=${nPag}&per_page=${reposPag}`;
    const reposData = await request(urlRepo);
    if(reposData.length > 0){
        const resRepo = document.getElementById("resRepo");
        resRepo.innerHTML = `<h3>Datos del Repositorio</h3>`;
        reposData.forEach(element => {
        resRepo.innerHTML += `
        <a href="${element.html_url}" target="_blank">${element.name}</a><br>
        `
        });
    }    
}

const getUser = async(user) => {
    const urlUser = `${url_base}/${user}`;
    const userData = await request(urlUser);
    if (userData === 404){
        alert("El usuario no existe")
    } else {
        const resUser = document.getElementById("resUser");
        resUser.innerHTML = `
        <h3>Datos de Usuario</h3>
        <img src="${userData.avatar_url}" class="img">
        <h5>Nombre de Usuario: ${userData.name}</h5>
        <h5>Nombre de login: ${userData.login}</h5>
        <h5>Cantidad de Repositorios: ${userData.public_repos}</h5>
        <h5>Localidad: ${userData.location}</h5>
        <h5>Tipo de usuario: ${userData.type}</h5>
        `
    }
}

const form = document.getElementById("form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const pagina = document.getElementById("pagina").value;
    const repoPagina = document.getElementById("repoPagina").value;
    getUser(nombre);
    getRepo(nombre, pagina, repoPagina);
});
getUser("kfmdklgjn");
getRepo("kfmdklgjn", 1, 30);
