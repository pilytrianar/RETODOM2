const ADMIN_USER = "admin";
const ADMIN_PASS = "administrador";
const cuponValido = "DESC50";

let productos = [];
let isAdmin = false;

const formularioProducto = document.getElementById("product-form");
const contenedorProductos = document.getElementById("products-container");

const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");
const btnShowLogin = document.getElementById("btn-show-login");
const btnLogout = document.getElementById("btn-logout");
const btnLogin = document.getElementById("btn-login");
const loginError = document.getElementById("login-error");

// Mostrar u ocultar formulario de login
btnShowLogin.addEventListener("click", function () {
  loginSection.classList.toggle("hidden");
});

// Iniciar sesión
btnLogin.addEventListener("click", function () {
  const usuario = document.getElementById("user-input").value.trim();
  const contrasena = document.getElementById("pass-input").value.trim();

  if (usuario === ADMIN_USER && contrasena === ADMIN_PASS) {
    isAdmin = true;
    loginSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
    btnShowLogin.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    loginError.classList.add("hidden");
    renderizarProductos();
  } else {
    loginError.classList.remove("hidden");
  }
});

// Cerrar sesión
btnLogout.addEventListener("click", function () {
  isAdmin = false;
  adminSection.classList.add("hidden");
  btnLogout.classList.add("hidden");
  btnShowLogin.classList.remove("hidden");
  formularioProducto.reset();
  renderizarProductos();
});

// Guardar producto
formularioProducto.addEventListener("submit", function (event) {
  event.preventDefault();

  const image = document.getElementById("image").value.trim();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const coupon = document.getElementById("coupon").value.trim();

  if (!image || !title || !description || isNaN(price) || price <= 0) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  let precioFinal = price;

  if (coupon === cuponValido) {
    precioFinal = price * 0.5;
  }

  const producto = {
    image,
    title,
    description,
    price,
    coupon,
    precioFinal
  };

  productos.push(producto);
  renderizarProductos();
  formularioProducto.reset();
});

// Renderizar productos
function renderizarProductos() {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>${producto.description}</p>
      ${
        producto.coupon === cuponValido
          ? `<p class="original-price">Precio original: $${producto.price.toLocaleString()}</p>
             <p class="final-price">Precio con descuento: $${producto.precioFinal.toLocaleString()}</p>
             <p class="discount-text">Descuento aplicado: 50%</p>`
          : `<p class="final-price">Precio: $${producto.precioFinal.toLocaleString()}</p>`
      }
      ${
        isAdmin
          ? `<button class="edit-btn">Editar</button>
             <button class="delete-btn">Eliminar</button>`
          : ""
      }
    `;

    if (isAdmin) {
      const editButton = productCard.querySelector(".edit-btn");
      const deleteButton = productCard.querySelector(".delete-btn");

      editButton.addEventListener("click", function () {
        document.getElementById("image").value = producto.image;
        document.getElementById("title").value = producto.title;
        document.getElementById("description").value = producto.description;
        document.getElementById("price").value = producto.price;
        document.getElementById("coupon").value = producto.coupon;

        productos.splice(index, 1);
        renderizarProductos();
      });

      deleteButton.addEventListener("click", function () {
        productos.splice(index, 1);
        renderizarProductos();
      });
    }

    contenedorProductos.appendChild(productCard);
  });
}

renderizarProductos();