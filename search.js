const searchInput =
document.getElementById("homeSearch") ||
document.getElementById("productSearch");

const searchResults =
document.getElementById("searchResults");

if (searchInput && searchResults) {

searchInput.addEventListener("input", function () {

const q = this.value.trim().toLowerCase();

searchResults.innerHTML = "";

if(q===""){
searchResults.style.display="none";
return;
}

const results = productsData.filter(product=>{

return (
product.name.toLowerCase().includes(q) ||
product.category.toLowerCase().includes(q) ||
product.weight.toLowerCase().includes(q)
);

});

if(results.length===0){

searchResults.innerHTML=
`<div class="search-empty">
No products found
</div>`;

searchResults.style.display="block";
return;
}
results.forEach(product=>{

searchResults.innerHTML += `

<div class="search-item"
     data-id="${product.id}">

<div class="search-info">

<h4>${product.name}</h4>

<p>${product.category} • ${product.weight}</p>

</div>

</div>

`;

});

searchResults.style.display="block";

document.querySelectorAll(".search-item").forEach(item=>{

item.onclick=()=>{

const id=item.dataset.id;

searchResults.style.display="none";

searchInput.value="";

const card=document.getElementById(`product-${id}`);

if(card){

card.scrollIntoView({
behavior:"smooth",
block:"center"
});

card.style.outline="3px solid #f5b400";

setTimeout(()=>{
card.style.outline="none";
},2000);

}

};

});

});
}
