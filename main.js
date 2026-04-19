document.getElementById('nutriForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Coleta dos dados do formulário
    const data = {
        w: parseFloat(document.getElementById('weight').value),
        h: parseFloat(document.getElementById('height').value),
        a: parseInt(document.getElementById('age').value),
        g: document.getElementById('gender').value,
        act: parseFloat(document.getElementById('activity').value),
        goal: parseFloat(document.getElementById('goal').value)
    };

    // 2. Processamento através da Engine
    const tmb = NutriEngine.calculateTMB(data.w, data.h, data.a, data.g);
    const meta = (tmb * data.act) * (1 + data.goal);
    
    // Aqui está a mudança: macros agora contém { gramas, porcentagens }
    const macros = NutriEngine.calculateMacros(meta);
    
    // Busca a refeição no banco de dados (database.js)
    const cafe = NutriEngine.buscarRefeicao(meta * 0.25); 

    // 3. Atualização da Interface (DOM)
    
    // Calorias
    document.getElementById('resTMB').textContent = Math.round(tmb);
    document.getElementById('resGET').textContent = Math.round(meta);
    
    // Gramas (Acessando o sub-objeto gramas)
    document.getElementById('resP').textContent = macros.gramas.p;
    document.getElementById('resG').textContent = macros.gramas.g;
    document.getElementById('resC').textContent = macros.gramas.c;
    
    // Porcentagens (Acessando o sub-objeto porcentagens)
    // Certifique-se que esses IDs (percP, percG, percC) existem no seu index.html
    document.getElementById('percP').textContent = macros.porcentagens.p;
    document.getElementById('percG').textContent = macros.porcentagens.g;
    document.getElementById('percC').textContent = macros.porcentagens.c;
    
    // Refeição
    document.getElementById('resMeal').innerHTML = `<strong>${cafe.nome}</strong><br>${cafe.descricao}`;
    
    // Mostrar a área de resultado
    document.getElementById('resultArea').classList.remove('hidden');
    // --- No final do seu main.js ---

// Função para Compartilhar no WhatsApp
document.getElementById('btnWhatsApp').addEventListener('click', function() {
    const res = {
        meta: document.getElementById('resGET').textContent,
        p: document.getElementById('resP').textContent,
        g: document.getElementById('resG').textContent,
        c: document.getElementById('resC').textContent,
        refeicao: document.getElementById('resMeal').innerText
    };

    const mensagem = `*Planejamento Nutricional - Coliseu Fitness*%0A%0A` +
        `💪 *Meta Diária:* ${res.meta} kcal%0A` +
        `🥩 *Proteína:* ${res.p}g%0A` +
        `🥑 *Gordura:* ${res.g}g%0A` +
        `🍞 *Carbo:* ${res.c}g%0A%0A` +
        `🍴 *Sugestão:* ${res.refeicao}`;

    window.open(`https://api.whatsapp.com/send?text=${mensagem}`, '_blank');
});

// Função para Gerar PDF usando jsPDF
document.getElementById('btnPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const titulo = "Relatório Nutricional - Coliseu Fitness";
    const meta = document.getElementById('resGET').textContent;
    const macros = `P: ${document.getElementById('resP').textContent}g | G: ${document.getElementById('resG').textContent}g | C: ${document.getElementById('resC').textContent}g`;
    const refeicao = document.getElementById('resMeal').innerText;

    doc.setFontSize(18);
    doc.text(titulo, 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Meta Calórica: ${meta} kcal`, 20, 40);
    doc.text(`Macronutrientes: ${macros}`, 20, 50);
    doc.text(`Sugestão de Dieta:`, 20, 70);
    doc.text(refeicao, 20, 80, { maxWidth: 160 });

    doc.save('Plano_Nutricional_Coliseu.pdf');
});
});