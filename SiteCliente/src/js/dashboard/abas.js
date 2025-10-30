// --- LÓGICA PARA TROCAR ABAS SEM RECARREGAR ---

// Espera o documento HTML carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Pega todos os itens do menu (os <li> dentro do .side-menu)
    const menuItems = document.querySelectorAll('#sidebar .side-menu li');
    
    // 2. Pega todos os painéis de conteúdo (as divs .content-panel)
    const contentPanels = document.querySelectorAll('main .content-panel');

    // 3. Adiciona um 'ouvidor' de clique para CADA item do menu
    menuItems.forEach(item => {
        
        // Pega o link <a> dentro do <li>
        const link = item.querySelector('a');

        // Ignora o item se for o link de "Sair" (logout)
        if (link && link.classList.contains('logout')) {
            return; // Pula este item e não adiciona o listener
        }

        // Adiciona o listener no <li>
        item.addEventListener('click', function(event) {
            
            // Previne o comportamento padrão do link <a> (que é navegar)
            if (link) {
                event.preventDefault();
            }

            // Pega o alvo do atributo 'data-target' (ex: "pedidos")
            const targetId = item.getAttribute('data-target');
            
            // Se o item clicado não tiver um 'data-target', não faz nada
            if (!targetId) {
                return;
            }

            // --- Troca de Menu ---
            // Remove a classe 'active' de TODOS os itens do menu
            menuItems.forEach(i => {
                i.classList.remove('active');
            });
            // Adiciona 'active' APENAS no item que foi clicado
            item.classList.add('active');

            // --- Troca de Conteúdo ---
            // Esconde TODOS os painéis de conteúdo
            contentPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            // Mostra APENAS o painel de conteúdo correspondente ao ID
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // (Seu código original do dashboard.js pode vir aqui embaixo)
    // Exemplo (se você tiver o código do modo escuro, menu, etc.):
    /*
    const switchMode = document.getElementById('switch-mode');
    switchMode.addEventListener('change', function () {
        if(this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    })
    */
});