document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.accordion-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = document.querySelector(this.dataset.target);
            if (!target) return;
            const isHidden = target.classList.contains('hidden');
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.add('hidden'));
            document.querySelectorAll('.accordion-btn span:last-child').forEach(s => s.textContent = '➕');
            if (isHidden) {
                target.classList.remove('hidden');
                this.querySelector('span:last-child').textContent = '➖';
            }
        });
    });
});
