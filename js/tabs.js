document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(targetTab) {
        // Remover clase active de todos los botones y paneles
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('bg-green-600', 'text-white');
            btn.classList.add('bg-green-100', 'text-green-700');
        });

        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        // Activar el botón y panel seleccionado
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        const activePane = document.getElementById(targetTab);

        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.classList.remove('bg-green-100', 'text-green-700');
            activeBtn.classList.add('bg-green-600', 'text-white');
        }

        if (activePane) {
            activePane.classList.add('active');
            
            // Agregar animación de entrada a los elementos dentro del panel
            const elements = activePane.querySelectorAll('.bg-green-50, .bg-blue-50, .bg-purple-50, .bg-orange-50, .bg-red-50, .bg-yellow-50');
            elements.forEach((el, index) => {
                el.classList.remove('fade-in-up');
                void el.offsetWidth; // Trigger reflow
                el.classList.add('fade-in-up');
                el.style.animationDelay = `${index * 0.1}s`;
            });
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
        });
    });

    // Inicializar con la primera pestaña activa
    if (tabBtns.length > 0) {
        const firstTab = tabBtns[0].dataset.tab;
        switchTab(firstTab);
    }
});
