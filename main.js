const platosList = document.querySelector("#platosList");
const crearPlatoForm = document.querySelector("#crearPlatoForm");
const url = "http://localhost:8080/api/platos";

addEventListener("DOMContentLoaded", async()=>{
    const response = await fetch(url);
    const platos = await response.json();
    platos.map(plato => {
        platosList.insertAdjacentHTML("beforeend", `
        <div class="contenedor">
        <div class="plato">
            <img src="${plato.link}">
            <h3>Nombre del plato: ${plato.nombre}</h3>
            <p>Descripción del plato: ${plato.descripcion}</p>
            <p>Precio del plato: ${plato.precio}</p>
            <p> Minimo de espera: ${plato.minDeEspera}</p>
        </div>
        <div class="botones">
            <button id="${plato.id}" class="botonEditar">Editar</button>
            <button id="${plato.id}" class="botonEliminar">Eliminar</button>
        </div>
        </div>
        `)
    })

    crearPlatoForm.addEventListener("submit", async(e)=>{
        
        const formato = 
        {
            nombre: e.target[0].value,
            descripcion: e.target[1].value,
            precio: e.target[2].value,
            minDeEspera: e.target[3].value
        }
        console.log(formato);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formato)
        });
    })

    document.getElementById("search").addEventListener("input", async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const response = await fetch("http://localhost:8080/api/platos");
        const platos = await response.json();
        const platosFiltrados = platos.filter(plato => plato.nombre.toLowerCase().includes(searchTerm));
        console.log();
        console.log(platos);
        platosList.innerHTML = "";
        platosFiltrados.map(plato => {
            platosList.insertAdjacentHTML("beforeend", `
            <div class="contenedor">
            <div class="plato">
                <img src="${plato.link}">
                <h3>Nombre del plato: ${plato.nombre}</h3>
                <p>Descripción del plato: ${plato.descripcion}</p>
                <p>Precio del plato: ${plato.precio}</p>
                <p> Minimo de espera: ${plato.minDeEspera}</p>
            </div>
            <div class="botones">
                <button id="${plato.id}" class="botonEditar">Editar</button>
                <button id="${plato.id}" class="botonEliminar">Eliminar</button>
            </div>
            </div>
            `)
        })
        let botonEliminar = document.querySelectorAll(".botonEliminar");
        let botonEditar = document.querySelectorAll(".botonEditar");
        botonEliminar.forEach((boton)=>{
            boton.addEventListener("click", (e)=>{
                console.log(e.target.id);
                const response = fetch(`${url}/${e.target.id}`, {
                    method: "DELETE"
                })
                location.reload();
            })
        })
        botonEditar.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                e.preventDefault();
                crearPlatoForm.style.display = "none";
                document.querySelector("#actualizarPlatoForm").style.display = "block";
        
                const platoId = e.target.id;
                const response = fetch(`${url}/${platoId}`, {
                    method: "GET"
                }).then((response) => {
                    return response.json().then((plato) => {
                        console.log(plato);
                        document.querySelector("#actualizarPlatoForm input[name='link']").value = plato.link;
                        document.querySelector("#actualizarPlatoForm input[name='id']").value = plato.id;
                        document.querySelector("#actualizarPlatoForm input[name='nombre']").value = plato.nombre;
                        document.querySelector("#actualizarPlatoForm input[name='descripcion']").value = plato.descripcion;
                        document.querySelector("#actualizarPlatoForm input[name='precio']").value = plato.precio;
                        document.querySelector("#actualizarPlatoForm input[name='minDeEspera']").value = plato.minDeEspera;
                    });
                });
        
                document.querySelector("#actualizarPlatoForm").addEventListener("submit", (e) => {
                    e.preventDefault();
                    const platoupdate = {
                        link: document.querySelector("#actualizarPlatoForm input[name='link']").value,
                        id: document.querySelector("#actualizarPlatoForm input[name='id']").value,
                        nombre: document.querySelector("#actualizarPlatoForm input[name='nombre']").value,
                        descripcion: document.querySelector("#actualizarPlatoForm input[name='descripcion']").value,
                        precio: document.querySelector("#actualizarPlatoForm input[name='precio']").value,
                        minDeEspera: document.querySelector("#actualizarPlatoForm input[name='minDeEspera']").value
                    };
        
                    fetch(`${url}/${platoId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(platoupdate)
                    }).then(() => {
                        console.log("Plato actualizado");
                    }).catch((error) => {
                        console.error("Error al actualizar el plato:", error);
                    });
                    location.reload();
                });
            });
            
        });
    });
    let botonEliminar = document.querySelectorAll(".botonEliminar");
    let botonEditar = document.querySelectorAll(".botonEditar");

    botonEliminar.forEach((boton)=>{
        boton.addEventListener("click", (e)=>{
            console.log(e.target.id);
            const response = fetch(`${url}/${e.target.id}`, {
                method: "DELETE"
            })
            location.reload();
        })
    })
    
    botonEditar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            crearPlatoForm.style.display = "none";
            document.querySelector("#actualizarPlatoForm").style.display = "block";
    
            const platoId = e.target.id;
            const response = fetch(`${url}/${platoId}`, {
                method: "GET"
            }).then((response) => {
                return response.json().then((plato) => {
                    console.log(plato);
                    document.querySelector("#actualizarPlatoForm input[name='link']").value = plato.link;
                    document.querySelector("#actualizarPlatoForm input[name='id']").value = plato.id;
                    document.querySelector("#actualizarPlatoForm input[name='nombre']").value = plato.nombre;
                    document.querySelector("#actualizarPlatoForm input[name='descripcion']").value = plato.descripcion;
                    document.querySelector("#actualizarPlatoForm input[name='precio']").value = plato.precio;
                    document.querySelector("#actualizarPlatoForm input[name='minDeEspera']").value = plato.minDeEspera;
                });
            });
    
            document.querySelector("#actualizarPlatoForm").addEventListener("submit", (e) => {
                e.preventDefault();
                const platoupdate = {
                    link: document.querySelector("#actualizarPlatoForm input[name='link']").value,
                    id: document.querySelector("#actualizarPlatoForm input[name='id']").value,
                    nombre: document.querySelector("#actualizarPlatoForm input[name='nombre']").value,
                    descripcion: document.querySelector("#actualizarPlatoForm input[name='descripcion']").value,
                    precio: document.querySelector("#actualizarPlatoForm input[name='precio']").value,
                    minDeEspera: document.querySelector("#actualizarPlatoForm input[name='minDeEspera']").value
                };
    
                fetch(`${url}/${platoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(platoupdate)
                }).then(() => {
                    console.log("Plato actualizado");
                }).catch((error) => {
                    console.error("Error al actualizar el plato:", error);
                });
                location.reload();
            });
        });
    });


    
})
