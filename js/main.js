//console.log("Super lista!")

let listaproductos = [
    { sesion: 'New Born', fecha: "13/12/19 17:30" },
    { sesion: 'Maternity', fecha: "13/12/19 17:30"},
    { sesion: '1 Año', fecha: "13/12/19 17:30" },
    { sesion: 'New Born', fecha: "13/12/19 17:30" },
    { sesion: 'Navideña', fecha: "13/12/19 17:30" }
]

/* document.querySelector("#ingreso-producto").addEventListener("input",e=>{
    console.log(e.target.value);
}); */

let iniRenderLista = true;
let ul;

function configurarListeners() {
    document.querySelector("#btn-entrada-producto").addEventListener("click", e => {
        let input = document.querySelector("#sesion");
        console.log(input.value);
        let producto = input.value;
        
        if (producto != "") {
            console.log(producto);
            listaproductos.push({
                sesion: producto, fecha: ""
            })
            input.value = "";
            renderLista();
        }
    })

    document.querySelector("#btn-borrar-productos").addEventListener("click", e => {
        listaproductos = [];
        renderLista();
    })
}

function borrarProd(index) {
    listaproductos.splice(index, 1);
    renderLista();
}

function cambiarCantidad(index, e) {
    let cantidad = parseInt(e.value);
    console.log("cambiando Cantidad ", index, cantidad)
    listaproductos[index].tipo = cantidad;
}

function cambiarPrecio(index, e) {
    let precio = Number(e.value);
    console.log("cambiando Precio ", index, precio)
    listaproductos[index].fecha = precio;
}

function renderLista() {
    if (iniRenderLista) {
        ul = document.createElement('ul');
        ul.classList.add('demo-list-item', 'mdl-list')
    }

    ul.innerHTML = '';
    listaproductos.forEach((prod, index) => {
        ul.innerHTML += `
                <li class="mdl-list__item">
                <span class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored w-10" >
                    <i class="material-icons"> photo_camera </i>
                </span>
                <span class="mdl-list__item-primary-content w-30 ml-item">
                    ${prod.sesion}
                </span>
                <span class="mdl-list__item-primary-content w-20 ml-item">

                    <div class="mdl-textfield mdl-js-textfield">
                        <textarea class="mdl-textfield__input fuenteCombo" type="text" rows= "2" id="sample-precio-${index}" >${prod.fecha}</textarea>
                    </div>

                </span>
                <span class="mdl-list__item-primary-content w-20 ml-item md-18">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"  onclick="borrarProd(${index})">
                            <i class="material-icons">remove</i>
                        </button>
                    </button>
                </span>
            </li>
    `
    })

    let lista = document.querySelector('#lista');
    lista.appendChild(ul);

    if (!iniRenderLista) //Lo aplica a partir de la segunda Renderizacion, sino da error
    {
        //Resetea los elementos y les vuelve a ejecutar su javascript para mantener los estilos
        componentHandler.upgradeElements(ul);
    }
    else
        iniRenderLista = false;

}

function configurarSW() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => {
                console.log("SW registrado exitosamente!")//, reg)
            })
            .catch(err => {
                console.log("ERROR! registro service worker")//, err)
            })
    }
}

function start() {
    configurarListeners()
    renderLista()

    //Configuracion del Service Worker
    configurarSW()
}

//-----------------------------------
//----EJECUCION-----------------------
//-----------------------------------

window.onload = start;