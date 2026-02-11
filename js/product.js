var arr = [];
var wishList = JSON.parse(localStorage.getItem("wishlist")) || [ ]


async function getProduct() {
  let response = await fetch("products.json");
  let content = await response.json();
  arr = content;
  
  display(arr);

}


document.querySelectorAll(".bntt").forEach((e) => {
  e.addEventListener("click", (el) => {
   document.querySelectorAll(".bntt").forEach((e) => e.classList.remove("activ-product"));

    el.target.classList.add("activ-product");

    var category = el.target.dataset.category;
    
  
    

    if (category == "All") {
      display(arr);
    } else {
      var filterData = arr.filter((e) => {
        return e.category === category;
      });
      display(filterData);
    }
    
  });
});

getProduct();

function goTodetails(id) {
  window.location.href = `product-details.html?id=${id}`;
}



var wishList = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(id) {
    const product = arr.find(p => p.id == id);
    const indexInWishlist = wishList.findIndex(p => p.id == id);

    if (indexInWishlist > -1) {
        wishList.splice(indexInWishlist, 1);
    } else {
        wishList.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishList));
    display(currentDisplayedProducts); 
}

function display(products) {
  currentDisplayedProducts = products; 
  var cartona = ``;

  for (let i = 0; i < products.length; i++) {
    const isInWishlist = wishList.some(p => p.id == products[i].id);
    const heartClass = isInWishlist ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart";


    let discountBadge = "";
    if (i % 5 == 0) { 
        discountBadge = `<span class="product-off position-absolute top-0 start-0 text-black px-2 py-1 rounded-bottom" style="background-color: #ffc107;">20% OFF</span>`;
    }

    cartona += `
     <div class="col-12 col-md-4" >
            <div class="product-card-shop rounded-2 shadow-sm p-3">
              <div class="product-img position-relative text-center mx-auto">
               ${discountBadge}
                <img src="${products[i].imag}" alt="" />
              </div>
              <div class="product-info mt-3">
                <p class="mb-1 d-flex align-items-center justify-content-between">
                  <span>${products[i].name}</span>
                  <a href="#" class="text-decoration-none text-black" onclick="goTodetails(${products[i].id})">
                    <i class="fa-solid fa-cart-shopping fs-4"></i>
                  </a>
                </p>
                <h5 class="fw-bolder my-2">$${products[i].price}</h5>
                <div class="star my-2 d-flex align-items-center justify-content-between">
                  <span>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-regular fa-star text-warning"></i>
                  </span>
                  <a href="javascript:void(0)" onclick="toggleWishlist(${products[i].id})" class="text-decoration-none text-black">
                    <i class="${heartClass} fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>`;
  }
  document.querySelector("#shop").innerHTML = cartona;
}

