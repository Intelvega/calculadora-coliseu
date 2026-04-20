const NutriEngine = {
    // Cálculo da Taxa Metabólica Basal
    calculateTMB: (w, h, a, g) => {
        return g === 'male' 
            ? (10 * w) + (6.25 * h) - (5 * a) + 5 
            : (10 * w) + (6.25 * h) - (5 * a) - 161;
    },

    // Cálculo de Macronutrientes (Gramas e Porcentagens)
    calculateMacros: (calories) => {
        const distribuicao = { p: 0.30, g: 0.30, c: 0.40 }; 

        return {
            gramas: {
                p: Math.round((calories * distribuicao.p) / 4),
                g: Math.round((calories * distribuicao.g) / 9),
                c: Math.round((calories * distribuicao.c) / 4)
            },
            porcentagens: {
                p: distribuicao.p * 100,
                g: distribuicao.g * 100,
                c: distribuicao.c * 100
            }
        };
    },

    // Busca a refeição mais próxima do alvo calórico no database.js
    buscarRefeicao: (alvoCalorico) => {
        // Verifica se o banco existe para evitar erros de runtime
        if (typeof bancoRefeicoes === 'undefined' || bancoRefeicoes.length === 0) {
            return { nome: "Erro", calorias: 0, descricao: "Banco de dados não encontrado." };
        }

        return bancoRefeicoes.reduce((ant, atu) => 
            Math.abs(atu.calorias - alvoCalorico) < Math.abs(ant.calorias - alvoCalorico) ? atu : ant
        );
    }
};