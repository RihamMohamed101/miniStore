var wish = JSON.parse(localStorage.getItem("wishlist")) || [];

function displayCartItems() {
  var cartona2 = ``;
  for (let i = 0; i < wish.length; i++) {
    cartona2 += `
            <div class="card bg-transparent shadow-sm border-0 flex-row align-items-center">
                <div><img src="${wish[i].imag}" alt=""  style="width: 150px;"></div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${wish[i].name}</h5>
                    
            
                            <p class=" text-muted">$${wish[i].price}</p>
                

                        <div class=" d-flex justify-content-between align-items-center">
                            <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${i})">Remove</button>
                            </div>
                    </div>
                </div>
   `;
  }

  document.getElementById("wish-item").innerHTML = cartona2;
}

displayCartItems();

function removeItem(index) {
  wish.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wish));
  displayCartItems();
}
