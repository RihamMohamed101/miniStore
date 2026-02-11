

var cart = JSON.parse(localStorage.getItem("cart")) || [];


function displayCartItems() {

var cartona2 = ``;
for (let i = 0; i < cart.length; i++) {
   cartona2 += `
            <div class="card shadow-sm border-0 flex-row align-items-center">
                <div><img src="${cart[i].imag}" alt=""  style="width: 150px;"></div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${cart[i].name}</h5>
                    
                    <div class=" d-flex justify-content-between align-items-center">
                            <p class=" text-muted">$${cart[i].price}</p>
                            <span class="text-muted">Qty: ${cart[i].quantity}</span>
                    </div>

                        <div class=" d-flex justify-content-between align-items-center">
                            <p class=" fw-bold">Total: $${cart[i].price * cart[i].quantity}</p>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${i})">Remove</button>
                            </div>
                    </div>
                </div>
   ` 
}

document.getElementById("cart-item").innerHTML = cartona2;
calculateTotal(cart);

}

displayCartItems();

function removeItem (index ){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}


function calculateTotal(cart) {

    document.getElementById("order-summary").innerHTML = `
      <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Order Summary</h5>
                              <div class="d-flex justify-content-between">
                                <p>Total Items: <span>${cart.length}</span></p>
                                    <span class="fw-bold">$${parseInt(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                              </div>

                             <div class="d-flex justify-content-between">
                                   <p>Task</p>
                                    <span class="fw-bold">$100.00</span>
                              </div>

                              <hr>


                               <div class="d-flex justify-content-between">
                                   <p>Total</p>
                                    <span class="fw-bold">$${parseInt(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)) + 100}</span>
                              </div>
                         
                                <button class="btn btn-success w-100 mt-3">Proceed to Checkout</button>

                        </div>
                    </div>
`;
}







