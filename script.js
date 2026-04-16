const formularioProducto = document.getElementById("product-form");
const contenedorProductos = document.getElementById("products-container");

const cuponValido = "DESC50";

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

  const productCard = document.createElement("article");
  productCard.classList.add("product-card");

  productCard.innerHTML = `
    <img src="${image}" alt="${title}">
    <h3>${title}</h3>
    <p>${description}</p>
    ${
      coupon === cuponValido
        ? `<p class="original-price">Precio original: $${price.toLocaleString()}</p>
           <p class="final-price">Precio con descuento: $${precioFinal.toLocaleString()}</p>
           <p class="discount-text">Descuento aplicado: 50%</p>`
        : `<p class="final-price">Precio: $${precioFinal.toLocaleString()}</p>`
    }
    <button class="edit-btn">Editar</button>
    <button class="delete-btn">Eliminar</button>
  `;

  const editButton = productCard.querySelector(".edit-btn");
  const deleteButton = productCard.querySelector(".delete-btn");

  editButton.addEventListener("click", function () {
    document.getElementById("image").value = image;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("price").value = price;
    document.getElementById("coupon").value = coupon;

    productCard.remove();
  });

  deleteButton.addEventListener("click", function () {
    productCard.remove();
  });

  contenedorProductos.appendChild(productCard);

  formularioProducto.reset();
});