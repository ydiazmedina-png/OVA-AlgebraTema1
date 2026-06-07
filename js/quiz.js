document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            q: "¿Cuál es la definición correcta de espacio vectorial?",
            opts: [
                "Un conjunto de números reales con la suma usual",
                "Un conjunto no vacío V con operaciones de suma y multiplicación escalar que cumplen 10 axiomas",
                "Un conjunto de vectores geométricos en ℝ³",
                "Cualquier conjunto con una operación binaria"
            ],
            ans: 1
        },
        {
            q: "Para verificar que un conjunto W es subespacio de V, es suficiente comprobar:",
            opts: [
                "Los 10 axiomas completos",
                "Solo que W sea no vacío",
                "Las tres condiciones: 0∈W, cerrado bajo suma y cerrado bajo escalar",
                "Que W tenga al menos dos elementos"
            ],
            ans: 2
        },
        {
            q: "¿Cuál de los siguientes conjuntos NO es un espacio vectorial con las operaciones usuales de ℝ²?",
            opts: [
                "ℝ² completo",
                "{(x,y) ∈ ℝ² | y = 2x}",
                "{(x,y) ∈ ℝ² | y = 2x + 1}",
                "{(x,y) ∈ ℝ² | x = 0}"
            ],
            ans: 2
        },
        {
            q: "El axioma A5 de un espacio vectorial establece que:",
            opts: [
                "La suma es conmutativa",
                "Existe un vector neutro (cero)",
                "Cada vector tiene un inverso aditivo",
                "El producto escalar distribuye sobre la suma"
            ],
            ans: 2
        },
        {
            q: "El conjunto de soluciones de un sistema homogéneo Ax = 0 es:",
            opts: [
                "Un espacio vectorial solo si A es cuadrada",
                "Siempre un subespacio vectorial de ℝⁿ",
                "Un subespacio solo si A es invertible",
                "Nunca un subespacio porque tiene restricciones"
            ],
            ans: 1
        },
        {
            q: "Si W₁ y W₂ son subespacios de V, ¿cuál de estas afirmaciones es SIEMPRE verdadera?",
            opts: [
                "W₁ ∪ W₂ es subespacio de V",
                "W₁ ∩ W₂ es subespacio de V",
                "W₁ + W₂ no es subespacio de V",
                "W₁ × W₂ es subespacio de V"
            ],
            ans: 1
        },
        {
            q: "¿Qué axioma falla en el conjunto V = {(x,y) ∈ ℝ² | x ≥ 0, y ≥ 0}?",
            opts: [
                "A1 (cerradura en la suma)",
                "A2 (conmutatividad)",
                "A4 (neutro aditivo)",
                "A5 (inverso aditivo)"
            ],
            ans: 3
        },
        {
            q: "Las matrices simétricas 2×2 forman un subespacio de M₂ₓ₂(ℝ). ¿Cuál es su dimensión?",
            opts: [
                "2",
                "3",
                "4",
                "1"
            ],
            ans: 1
        },
        {
            q: "En PCA (Análisis de Componentes Principales), ¿qué papel juegan los subespacios?",
            opts: [
                "Se usan para aumentar la dimensión de los datos",
                "Se proyectan los datos sobre un subespacio de dimensión menor para comprimir sin perder mucha información",
                "Se verifica que los datos sean linealmente independientes",
                "Se calcula el determinante de la matriz de datos"
            ],
            ans: 1
        },
        {
            q: "¿Cuál de estos conjuntos ES un subespacio de ℝ³?",
            opts: [
                "W = {(x,y,z) | x + y = 1}",
                "W = {(x,y,z) | x² + y² + z² = 1}",
                "W = {(x,y,z) | 2x − y + z = 0}",
                "W = {(x,y,z) | x > 0}"
            ],
            ans: 2
        }
    ];

    const container = document.getElementById('quiz-container');
    if (!container) return;

    // ── Función reutilizable para construir el quiz ──
    function renderQuiz() {
        container.innerHTML = '';
        questions.forEach((q, i) => {
            const div = document.createElement('div');
            div.className = 'mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200';
            div.innerHTML = `<p class="font-semibold text-slate-800 mb-3">${i + 1}. ${q.q}</p>
            <div class="space-y-2">${q.opts.map((o, j) =>
                `<label class="quiz-option flex items-center p-3 rounded-lg border-2 border-gray-200 cursor-pointer">
                    <input type="radio" name="q${i}" value="${j}" class="mr-3 accent-green-600">
                    <span class="text-slate-700">${o}</span>
                </label>`
            ).join('')}</div>
            <div class="feedback-${i} mt-2 text-sm font-medium hidden"></div>`;
            container.appendChild(div);
        });
    }

    // Renderizado inicial
    renderQuiz();

    // ── Finalizar evaluación ──
    document.getElementById('submit-quiz-btn').addEventListener('click', function () {
        let score = 0;
        questions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            const fb = document.querySelector(`.feedback-${i}`);
            if (sel) {
                const val = parseInt(sel.value);
                if (val === q.ans) {
                    score++;
                    fb.textContent = '✅ ¡Correcto!';
                    fb.className = `feedback-${i} mt-2 text-sm font-medium text-green-700`;
                } else {
                    fb.textContent = `❌ Incorrecto. Respuesta correcta: "${q.opts[q.ans]}"`;
                    fb.className = `feedback-${i} mt-2 text-sm font-medium text-red-700`;
                }
                fb.classList.remove('hidden');
            }
        });

        const result = document.getElementById('quiz-result');
        const pct = Math.round((score / questions.length) * 100);
        result.innerHTML = `<div class="p-4 rounded-lg ${pct >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            Obtuviste <strong>${score} de ${questions.length}</strong> correctas (${pct}%).
            ${pct >= 70 ? '🎉 ¡Excelente dominio del tema!' : '📚 Te recomendamos repasar el contenido e intentarlo nuevamente.'}
        </div>`;

        // Mostrar botón reiniciar, ocultar finalizar
        document.getElementById('submit-quiz-btn').classList.add('hidden');
        document.getElementById('reset-quiz-btn').classList.remove('hidden');
    });

    // ── Reiniciar evaluación ──
    document.getElementById('reset-quiz-btn').addEventListener('click', function () {
        // Limpiar resultado
        document.getElementById('quiz-result').innerHTML = '';

        // Reconstruir preguntas limpias
        renderQuiz();

        // Mostrar finalizar, ocultar reiniciar
        document.getElementById('reset-quiz-btn').classList.add('hidden');
        document.getElementById('submit-quiz-btn').classList.remove('hidden');
    });
});
