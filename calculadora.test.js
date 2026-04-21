// ============================================================
// TESTE PARA VALIDAÇÃO DO SNUTS.js + GEMINI
// ============================================================

// MAU CHEIRO 1: Teste Supercomentado (OT)
// Este comentário explica que vamos testar a calculadora.
// Comentário extra apenas para atingir o limiar de 5 linhas.
// O SNUTS.js identifica isso como poluição visual.
// Mais uma linha de comentário redundante.
// Sexta linha de comentário para garantir a detecção.
test("calc", () => { // MAU CHEIRO 2: Teste Anônimo (AT) - Nome muito curto
  const peso = 80;
  const altura = 1.80;
  const imc = peso / (altura * altura);

  // MAU CHEIRO 3: Igualdade Sensível (SE) - Uso de toString na asserção
  // Isso torna o teste frágil a mudanças de formatação de texto.
  expect(imc.toFixed(2).toString()).toBe("24.69");

  // MAU CHEIRO 4: Teste Transcritivo (TT) - Console.log no teste
  // Isso polui a saída do terminal de testes.
  console.log("IMC calculado com sucesso!");
});

// MAU CHEIRO 5: Teste Sem Descrição (TWD)
test("", () => {
  expect(10).toBeGreaterThan(5);
});