// ===============================
// Central & Stores Search
// ===============================

const searchInput = document.getElementById("homeSearch");
const searchResults = document.getElementById("searchResults");

if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

        const query = this.value.trim().toLowerCase();

        searchResults.innerHTML = "";

        if (query === "") {
            searchResults.style.display = "none";
            return;
        }

        let matches = [];

        Object.keys(SEARCH_DATA).forEach(id => {

            const item = SEARCH_DATA[id];

            const found =

                item.tamil.toLowerCase().includes(query) ||

                item.tanglish.toLowerCase().includes(query) ||

                item.keywords.some(word =>
                    word.toLowerCase().includes(query)
                );

            if (found) {
                matches.push({
                    id: id,
                    ...item
                });
            }

        });

        if (matches.length === 0) {

            searchResults.innerHTML =
                `<div class="search-empty">No products found</div>`;

        } else {

            matches.forEach(product => {

                searchResults.innerHTML += `
                    <div class="search-item">
                        <strong>#${product.id}</strong><br>
                        ${product.tamil}<br>
                        <small>${product.tanglish}</small>
                    </div>
                `;

            });

        }

        searchResults.style.display = "block";

    });

}
