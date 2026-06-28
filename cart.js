document.addEventListener("DOMContentLoaded", () => {

const emptyCart = document.getElementById("emptyCart");
const cartProductsCard = document.getElementById("cartProductsCard");
const customerDetailsCard = document.getElementById("customerDetailsCard");
const cartItemsList = document.getElementById("cartItemsList");
const cartItemCount = document.getElementById("cartItemCount");
const orderForm = document.getElementById("orderForm");

function getCart(){
    return getCentralCart();
}

function saveCart(cart){
    saveCentralCart(cart);
}

function renderCart(){

    const cart = getCart();

    if(!cart.length){

        if(emptyCart) emptyCart.hidden = false;
        if(cartProductsCard) cartProductsCard.hidden = true;
        if(customerDetailsCard) customerDetailsCard.hidden = true;

        return;
    }

    if(emptyCart) emptyCart.hidden = true;
    if(cartProductsCard) cartProductsCard.hidden = false;
    if(customerDetailsCard) customerDetailsCard.hidden = false;

    cartItemCount.textContent = cart.reduce((t,p)=>t+(p.quantity||1),0);

    cartItemsList.innerHTML = "";

    cart.forEach(product=>{

        cartItemsList.innerHTML += `

<article class="cart-item" data-id="${product.id}">

<div class="cart-product-image">

<img
src="${product.image}"
alt="${product.name}"
loading="lazy"
onerror="this.style.display='none';"
/>

</div>

<div class="cart-item-info">

<span class="cart-item-category">
${product.category}
</span>

<h3 class="cart-item-name">
${product.name}
</h3>

<span class="cart-item-weight">
${product.weight}
</span>

<strong class="cart-item-price">
₹${product.price}
</strong>

<div class="cart-quantity-control">

<button
class="quantity-btn"
data-action="minus"
data-id="${product.id}">
−
</button>

<span class="quantity-value">
${product.quantity}
</span>

<button
class="quantity-btn"
data-action="plus"
data-id="${product.id}">
+
</button>

</div>

</div>

<button
class="remove-item-btn"
data-id="${product.id}">
Remove
</button>

</article>

`;

    });

  }
document.addEventListener("click",(event)=>{

const quantityBtn = event.target.closest(".quantity-btn");
const removeBtn = event.target.closest(".remove-item-btn");

if(!quantityBtn && !removeBtn) return;

let cart = getCart();

if(removeBtn){

cart = cart.filter(item=>String(item.id)!==String(removeBtn.dataset.id));

saveCart(cart);
renderCart();

return;

}

const product = cart.find(
item=>String(item.id)===String(quantityBtn.dataset.id)
);

if(!product) return;

if(quantityBtn.dataset.action==="plus"){

product.quantity++;

}else{

product.quantity--;

if(product.quantity<=0){

cart = cart.filter(
item=>String(item.id)!==String(product.id)
);

}

}

saveCart(cart);

renderCart();

});

document.addEventListener("centralCartUpdated",()=>{

renderCart();

});

window.addEventListener("storage",()=>{

renderCart();

});

renderCart();

if(!orderForm) return;

orderForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name=document.getElementById("customerName").value.trim();

const phone=document.getElementById("customerPhone").value.trim();

const address=document.getElementById("customerAddress").value.trim();

const note=document.getElementById("customerNote").value.trim();

const cart=getCart();

if(!cart.length){

alert("Your cart is empty.");

return;

}
let message = `🛒 *CENTRAL & STORES*
━━━━━━━━━━━━━━━━━━

👤 *Customer Details*
━━━━━━━━━━━━━━━━━━
Name : ${name}
Phone : ${phone}
Address : ${address}
`;

if(note){

message += `

📝 *Additional Note*
${note}
`;

}

message += `

🛍️ *Order Items*
━━━━━━━━━━━━━━━━━━
`;

let totalQty = 0;

cart.forEach(item=>{

const qty = Number(item.quantity)||1;

totalQty += qty;

message += `

• ${item.name}
Qty : ${qty}
`;

if(item.weight){

message += `
Size : ${item.weight}`;

}

if(item.price){

message += `
Price : ₹${item.price}`;

}

});

message += `

━━━━━━━━━━━━━━━━━━
📦 Total Items : ${totalQty}

📞 Please confirm availability, final price and delivery time.

Thank you ❤️
Central & Stores
`;

const whatsappUrl =
"https://wa.me/919344621645?text="+encodeURIComponent(message);

window.open(whatsappUrl,"_blank");

});
});
