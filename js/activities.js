document.addEventListener('DOMContentLoaded', function () {

    // ===== ACTIVIDAD 1: EMPAREJAR axiomas =====
    const pairs = {
        'a1': 'def-a1',
        'a4': 'def-a4',
        'a5': 'def-a5',
        'a6': 'def-a6',
        'a10': 'def-a10'
    };
    let selectedConcept = null;
    const matched = {};

    document.querySelectorAll('.concept-item').forEach(item => {
        item.addEventListener('click', function () {
            if (matched[this.dataset.concept]) return;
            document.querySelectorAll('.concept-item').forEach(c => c.classList.remove('ring-2', 'ring-green-500'));
            selectedConcept = this.dataset.concept;
            this.classList.add('ring-2', 'ring-green-500');
        });
    });

    document.querySelectorAll('.definition-item').forEach(item => {
        item.addEventListener('click', function () {
            if (!selectedConcept) return;
            const defId = this.dataset.definition;
            if (matched[selectedConcept]) return;
            if (pairs[selectedConcept] === 'def-' + defId) {
                matched[selectedConcept] = defId;
                const conceptEl = document.querySelector(`.concept-item[data-concept="${selectedConcept}"]`);
                conceptEl.classList.add('opacity-60');
                conceptEl.querySelector('.hint-text').textContent = '✅';
                this.classList.add('bg-green-100', 'border-green-400');
                const mc = this.querySelector('.matched-concept');
                mc.textContent = '✅ Correcto';
                mc.classList.remove('hidden');
            } else {
                this.classList.add('bg-red-100', 'border-red-400');
                setTimeout(() => this.classList.remove('bg-red-100', 'border-red-400'), 700);
            }
            document.querySelectorAll('.concept-item').forEach(c => c.classList.remove('ring-2', 'ring-green-500'));
            selectedConcept = null;
            if (Object.keys(matched).length === Object.keys(pairs).length) {
                document.getElementById('matching-result').innerHTML =
                    '<span class="text-green-700 font-bold">🎉 ¡Emparejaste todos los axiomas correctamente!</span>';
            }
        });
    });

    document.getElementById('check-matching-btn')?.addEventListener('click', function () {
        const total = Object.keys(pairs).length;
        const done = Object.keys(matched).length;
        document.getElementById('matching-result').innerHTML =
            `<span class="${done === total ? 'text-green-700' : 'text-yellow-700'} font-bold">
            ${done === total ? '🎉 ¡Perfecto!' : `Has emparejado ${done} de ${total}. ¡Continúa!`}
            </span>`;
    });

    document.getElementById('reset-matching-btn')?.addEventListener('click', () => location.reload());

    // ===== ACTIVIDAD 2: VERDADERO O FALSO =====
    const vfAnswers = { vf1: 'V', vf2: 'F', vf3: 'V', vf4: 'F', vf5: 'V', vf6: 'V', vf7: 'F' };

    document.getElementById('check-vf-btn')?.addEventListener('click', function () {
        let score = 0;
        Object.entries(vfAnswers).forEach(([id, correct]) => {
            const input = document.getElementById(id);
            if (!input) return;
            const val = input.value.trim().toUpperCase();
            input.classList.remove('border-green-500', 'border-red-500');
            if (val === correct) { input.classList.add('border-green-500'); score++; }
            else input.classList.add('border-red-500');
        });
        const total = Object.keys(vfAnswers).length;
        document.getElementById('vf-result').innerHTML =
            `<span class="${score === total ? 'text-green-700' : 'text-yellow-700'} font-bold">
            ${score} de ${total} correctas. ${score === total ? '🎉 ¡Excelente!' : '📚 Revisa tus respuestas.'}
            </span>`;
    });

    document.getElementById('reset-vf-btn')?.addEventListener('click', function () {
        Object.keys(vfAnswers).forEach(id => {
            const input = document.getElementById(id);
            if (input) { input.value = ''; input.classList.remove('border-green-500', 'border-red-500'); }
        });
        document.getElementById('vf-result').innerHTML = '';
    });

    // ===== ACTIVIDAD 3: VERIFICADOR DE SUBESPACIOS =====
    const subespData = {
        s1: { es: true,  motivo: '✅ SÍ es subespacio. Pasa C1 (tiene el cero), C2 (suma de soluciones es solución) y C3 (escalar × solución es solución).' },
        s2: { es: false, motivo: '❌ NO es subespacio. Falla C1: el vector (0,0,0) no satisface 0+0=1.' },
        s3: { es: false, motivo: '❌ NO es subespacio. Falla C2: (1,0,0) y (0,1,0) están en W, pero su suma (1,1,0) no (1≠0 y 1≠0).' }
    };

    document.querySelectorAll('.check-sub-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const key = this.dataset.sub;
            const sel = document.querySelector(`input[name="${key}"]:checked`);
            const fb = document.getElementById(`fb-${key}`);
            if (!sel) { fb.innerHTML = '<span class="text-yellow-700">Selecciona una opción primero.</span>'; fb.classList.remove('hidden'); return; }
            const data = subespData[key];
            const userSays = sel.value === 'si';
            fb.innerHTML = data.motivo;
            fb.className = `mt-2 p-3 rounded-lg text-sm font-medium ${data.es === userSays ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
            fb.classList.remove('hidden');
        });
    });
});
