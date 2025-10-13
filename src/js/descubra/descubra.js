// FunÃ§Ã£o para filtrar produtos
function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const authorInput = document.getElementById('author').value.toLowerCase();
    const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max').value) || Infinity;
    const newRelease = document.getElementById('new-release').value;
    const onSale = document.getElementById('on-sale').value;

    // Obter os gÃªneros selecionados
    const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(input => input.value.toLowerCase());

    // Obtenha todos os produtos
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        // Obtenha os detalhes do produto
        const title = product.querySelector('.product-card-title').innerText.toLowerCase();
        const author = product.getAttribute('data-author') ? product.getAttribute('data-author').toLowerCase() : "";
        const genre = product.getAttribute('data-genre') ? product.getAttribute('data-genre').toLowerCase() : "";
        const price = parseFloat(product.querySelector('.product-card-price').innerText.replace('R$', '').replace(',', '.'));
        const isNew = product.getAttribute('data-new') === "true";
        const isOnSale = product.getAttribute('data-sale') === "true";

        // Verifique se o produto atende aos critÃ©rios de filtragem
        const matchesSearch = title.includes(searchInput);
        const matchesAuthor = author.includes(authorInput);
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(genre);
        const matchesPrice = price >= priceMin && price <= priceMax;
        const matchesNewRelease = newRelease === "" || (newRelease === "true" && isNew) || (newRelease === "false" && !isNew);
        const matchesOnSale = onSale === "" || (onSale === "true" && isOnSale) || (onSale === "false" && !isOnSale);

        // Exibe ou oculta o produto com uma animaÃ§Ã£o suave
        if (matchesSearch && matchesAuthor && matchesGenre && matchesPrice && matchesNewRelease && matchesOnSale) {
            product.classList.remove('hidden');
            setTimeout(() => { product.style.display = 'block'; }, 300); // Mostrar apÃ³s a animaÃ§Ã£o
        } else {
            product.classList.add('hidden');
            setTimeout(() => { product.style.display = 'none'; }, 300); // Esconder apÃ³s a animaÃ§Ã£o
        }
    });
}

// Adicionar evento de clique ao botÃ£o de filtro
document.getElementById('filter-button').addEventListener('click', filterProducts);

// Adicionar evento de tecla Enter aos campos de filtro
['search', 'author', 'price-min', 'price-max', 'new-release', 'on-sale'].forEach(id => {
    document.getElementById(id).addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
});

// Resetar filtros com animaÃ§Ã£o suave
document.getElementById('reset-button').addEventListener('click', function () {
    // Limpa os inputs de busca
    document.getElementById('search').value = '';
    document.getElementById('author').value = '';
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    document.getElementById('new-release').value = '';
    document.getElementById('on-sale').value = '';

    // Desmarcar todos os checkboxes de gÃªnero
    document.querySelectorAll('input[name="genre"]').forEach(input => input.checked = false);

    // Reexibe todos os produtos com animaÃ§Ã£o
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.classList.remove('hidden');
        setTimeout(() => { product.style.display = 'block'; }, 300);
    });
});