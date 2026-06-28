const searchInput = document.getElementById("homeSearch");
const searchResults = document.getElementById("searchResults");

let products = [];

fetch("products.json")
    .then(res => res.json())
    .then(data => {
        products = data;
    });

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    if (keyword === "") {
        searchResults.classList.remove("active");
        searchResults.innerHTML = "";
        return;
    }

    const results = products.filter(product => {

        return (
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword) ||
            product.tamil.toLowerCase().includes(keyword) ||
            product.tanglish.toLowerCase().includes(keyword)
        );

    });

    displayResults(results);

});

function displayResults(results){

    searchResults.classList.add("active");

    if(results.length===0){

        searchResults.innerHTML=`
        <div class="search-empty">
            No products found
        </div>
        `;

        return;
    }

    searchResults.innerHTML=results.map(product=>`

        <div class="search-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="search-info">

                <h4>${product.name}</h4>

                <p>${product.category}</p>

            </div>

        </div>

    `).join("");

}
