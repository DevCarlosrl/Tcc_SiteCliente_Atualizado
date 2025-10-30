// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos necessários da página
    const searchToggle = document.getElementById('search-toggle');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.querySelector('.search-container');

    // 1. Funcionalidade de Abrir/Fechar a barra ao clicar na Lupa
    searchToggle.addEventListener('click', (event) => {
        // Impede que o link '#' recarregue a página
        event.preventDefault(); 
        
        // Adiciona ou remove a classe 'active' para mostrar/esconder a barra
        searchInput.classList.toggle('active');
        
        // Se a barra de pesquisa se tornou ativa, foca o cursor nela
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // 2. Funcionalidade de Pesquisa ao pressionar Enter
    searchForm.addEventListener('submit', (event) => {
        // Impede o envio padrão do formulário, que recarregaria a página
        event.preventDefault(); 
        
        // Pega o termo de pesquisa, removendo espaços em branco extras
        const searchTerm = searchInput.value.trim();

        // Se o termo de pesquisa não estiver vazio...
        if (searchTerm) {
            // Redireciona para a página de 'descubra' com o termo como um parâmetro de URL
            // Exemplo: se o usuário digitar "O Hobbit", a URL será "descubra.html?q=O+Hobbit"
            window.location.href = `descubra.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });
    
    // 3. Funcionalidade de Fechar a barra ao clicar Fora dela
    document.addEventListener('click', (event) => {
        // Verifica se o clique foi fora do container da pesquisa (.search-container)
        // e se a barra de pesquisa está atualmente ativa
        if (!searchContainer.contains(event.target) && searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
        }
    });
    
    // 4. Funcionalidade de Fechar a barra ao pressionar a tecla 'Esc'
    document.addEventListener('keydown', (event) => {
        // Verifica se a tecla pressionada foi 'Escape' e se a barra está ativa
        if (event.key === 'Escape' && searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
        }
    });

});

// Seleciona o elemento principal do dropdown
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        // Seleciona a lista que aparece/desaparece
        const profileDropdownList = document.querySelector('.profile-dropdown-list');

        // A função que é chamada pelo onclick no HTML
        function toggle() {
            // Adiciona ou remove a classe 'active' da lista
            profileDropdownList.classList.toggle('active');

            // Adiciona ou remove a classe 'active' do container principal (para girar a seta)
            profileDropdown.classList.toggle('active');
        }

        // Opcional: Fecha o dropdown se o usuário clicar fora dele
        window.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                profileDropdownList.classList.remove('active');
                profileDropdown.classList.remove('active');
            }
        });