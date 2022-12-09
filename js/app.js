
//Carrito de Compras



let productos = []
      

let carrito = JSON.parse(localStorage.getItem(`carrito`)) || []


const cardContainer = document.querySelector(`#cardContainer`) 
const mostrarCarrito = document.getElementById(`mostrarCarrito`)
const containerModal = document.getElementById(`containerModal`)
const contadorDelCarrito = document.getElementById(`contadorDelCarrito`)


const agregarProductoAlCarrito = (e) => {
	const idProductoElegido = e.target.getAttribute(`data-id`)
    const productoElegido = productos.find((producto) => producto.id == idProductoElegido)

	const repetido = carrito.some((productoRepetido) => productoRepetido.id == productoElegido.id)
  	
    repetido ? carrito.map((producto) => {if (producto.id  == productoElegido.id){producto.cantidad++}}) : carrito.push(productoElegido);

   
    counterCarrito()
    

    localStorage.setItem(`carrito`, JSON.stringify(carrito))   

}

 

const renderizarProductos = () =>{
	productos.forEach((producto) =>{
	const nuevaCard = document.createElement(`div`)
	nuevaCard.className = `card`
    nuevaCard.innerHTML = `
	   <h3 class="carTitle"> ${producto.nombre} </h3>
	   <img src="${producto.imgSrc}" class="cardImg">
	   <p class="carDesc"> ${producto.descripcion}</p>
	   <span class="cardPrice"> $${producto.precio} </span>
	   <button class="buttonCTA" data-id="${producto.id}"> Agregar al Carrito </button>
	   `       
	   cardContainer.append(nuevaCard)
	})
	const buttonsCTA = document.querySelectorAll(`.buttonCTA`)
	buttonsCTA.forEach((button) =>{
		button.addEventListener(`click`, agregarProductoAlCarrito)

	})

 }



const modalCarrito = () =>{ 
	containerModal.innerHTML = ``
	containerModal.style.display = `flex`
	const modalHeader = document.createElement(`div`)
	modalHeader.className = `modal-header`
	modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
	`
	containerModal.append(modalHeader)

	const modalbutton = document.createElement(`h1`)
	modalbutton.innerText = `X`
	modalbutton.className = `modal-header-button`

	modalbutton.addEventListener(`click`,() =>{
		containerModal.style.display = `none`
	})

	modalHeader.append(modalbutton)


	carrito.forEach((producto) =>{
		let carritoContent = document.createElement(`div`)
	    carritoContent.className = `modalContent`
	    carritoContent.innerHTML = `
	    <img src="${producto.imgSrc}" class="cardImg">
	    <h3 class="carTitle"> ${producto.nombre} </h3>
	    <span class="cardPrice"> $ ${producto.precio} </span>
	    <span> Cantidad ${producto.cantidad} </span>
	    <span> Total $ ${producto.cantidad * producto.precio} </span>
	    `

	    containerModal.append(carritoContent)

	    

	    let eliminarProducto = document.createElement(`span`)
	    eliminarProducto.innerText = `x`
	    eliminarProducto.className = `eliminar-producto`
	    carritoContent.append(eliminarProducto)

	    eliminarProducto.addEventListener(`click`, removeProduct)

	})

	const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

	const totalCompra = document.createElement(`div`)
	totalCompra.className = `totalContent`
	totalCompra.innerHTML = `Total a Pagar $ ${total}
	<button id="btnPagar" class="btnPagar"> Pagar </button>
	`
	containerModal.append(totalCompra)
    
    const btnPagar = document.getElementById(`btnPagar`)
		btnPagar.addEventListener(`click`, popupPagar)		
	
}


 mostrarCarrito.addEventListener(`click`, modalCarrito)


const removeProduct = () => {
	const foundid = carrito.find((e) => e.id)

	carrito = carrito.filter((carritoid) => {
		return carritoid !== foundid
	})
    
    counterCarrito()
	modalCarrito()

}


const counterCarrito = () => {
	contadorDelCarrito.style.display = `block`
	contadorDelCarrito.innerText = carrito.length
}


const popupPagar = () => {
	Swal.fire({
		title: `Gracias Por Su Compra!`,
		text: `Su pago fue realizado con Exito`,
		icon: `success`
	})
}



fetch('../json/data.json')
    .then((response) => response.json())
    .then((data) => {
    	productos = data
    	renderizarProductos()
    })

