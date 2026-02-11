var arr = [];

var isLogin = JSON.parse(sessionStorage.getItem("isLogin")) || false;

async function getProduct() {
  let response = await fetch("products.json");
  let content = await response.json();
  arr = content;
  var urlParam = window.location.href.split("?")[1].split("=")[1];
  var product = arr.find((p) => p.id == urlParam);

  document.querySelector("#product-details").innerHTML = `
   <div class="col-md-6  ">
              <div class="image text-center">
                   <img src="${product.imag}" class="w-75" alt="">
              </div>
          </div>

          <div class="col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start mt-2 mt-md-0">
              <h2 class="fw-bold">${product.name}</h2>
              <p class="text-muted text-center text-md-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
              <h4 class="fw-bold">$${product.price}</h4>
              <div class="d-flex align-items-center gap-3 mt-4">
                  <div class="input-group" style="width: 120px;">
                      <button class="btn btn-outline-secondary" type="button" id="button-addon1" onclick="decreaseQuantity()">-</button>
                      <input type="text" class="form-control text-center" value="1" id="quantityInput">
                      <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="increaseQuantity()">+</button>
                    </div>
          </div>


            <div
                  class="star my-2 d-flex align-items-center  justify-content-between"
                >
                  <span>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-regular fa-star text-warning"></i>
                  </span>
                </div>
             <a
          href="#" id="addToCart"
          class="text-decoration-none mt-2 px-3 py-2 bg-transparent text-black text-light my-1 d-inline-block rounded-1 border border-1 border-black"
          >Add to Cart</a>
           
        </div>`;

  document.querySelector("#addToCart").addEventListener("click", function (e) {
    if (isLogin) {
      e.preventDefault();
      Add(product, parseInt(document.getElementById("quantityInput").value));
      window.location.href = "cart.html";
    } else {
      window.location.href = "login.html";
    }
  });

  // take product with same category

  var similarProducts = arr.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  display(similarProducts);
}

getProduct();

function goTodetails(id) {
  window.location.href = `product-details.html?id=${id}`;
}

function display(products) {
  var cartona = ``;

  for (let i = 0; i < products.length; i++) {
    cartona += `

     <div class="col-6 col-md-3">
            <div class="product-card-shop rounded-2 shadow-sm p-3" onclick="goTodetails(${products[i].id})">
              <div
                class="product-img position-relative text-center mx-auto"
              >
                <img src= ${products[i].imag}  alt="" />
                <span
                  class="product-off position-absolute top-0 start-0 text-black px-2 py-1 rounded-bottom-end"
                  >20% OFF</span
                >
              </div>

              <div class="product-info mt-3">
                <p
                  class="mb-1 d-flex align-items-center justify-content-between"
                >
                  <span>${products[i].name}</span>
                  <a
                    href="#"
                    class="text-decoration-none text-black cart-product rounded-circle p-4 d-inline-flex justify-content-center align-items-center"
                    style="width: 30px; height: 30px"
                  >
                    <i class="fa-solid fa-cart-shopping fs-4"></i>
                  </a>
                </p>
                <h5 class="fw-bolder my-2">$${products[i].price}</h5>

                <div
                  class="star my-2 d-flex align-items-center justify-content-between"
                >
                  <span>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-regular fa-star text-warning"></i>
                  </span>
                  <a href="" class="text-decoration-none text-black">
                    <i class="fa-regular fa-heart fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
     
    `;
  }

  document.querySelector("#similar-item .row").innerHTML = cartona;
}

function increaseQuantity() {
  var quantityInput = document.getElementById("quantityInput");
  var currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
}

function decreaseQuantity() {
  var quantityInput = document.getElementById("quantityInput");
  var currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
}

function Add(product, quantity) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var existingProductIndex = cart.findIndex((p) => p.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    product.quantity = quantity;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
