async function saveProduto(){
    const nome = document.getElementById('nome').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const saldo = parseInt(document.getElementById('saldo').value);
    const saldoMinimo = parseInt(document.getElementById('saldoMinimo').value);

    const produto = {
        nome: nome,
        valor: valor,
        saldo: saldo,
        saldoMinimo: saldoMinimo
    };

    console.log(produto);

    const response = await fetch("http://localhost:8080/produto", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    }).then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) });

    console.log(response);
  
}


// Declara uma função assíncrona chamada loadProdutos
async function loadProdutos() {
    try {
        // 1. Faz uma requisição GET para a API de produtos
        const response = await fetch("http://localhost:8080/produto");
        
        // 2. Converte a resposta para JSON (lista de produtos)
        const produtos = await response.json();
        
        // 3. Obtém a referência para o elemento HTML onde os produtos serão exibidos
        const produtosList = document.getElementById('produtosList');
        
        // 4. Limpa o conteúdo atual do elemento (remove qualquer produto listado anteriormente)
        produtosList.innerHTML = '';
        
        // 5. Verifica se a lista de produtos está vazia
        if (produtos.length === 0) {
            // 6. Se não houver produtos, exibe uma mensagem
            produtosList.innerHTML = '<p>Nenhum produto cadastrado</p>';
            return; // Termina a execução da função
        }
        
        // 7. Cria um elemento <table> para exibir os produtos em formato de tabela
        const table = document.createElement('table');
        
        // 8. Define o cabeçalho da tabela com os nomes das colunas
        table.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Saldo</th>
                <th>Saldo Mínimo</th>
            </tr>
        `;
        
        // 9. Para cada produto na lista recebida da API...
        produtos.forEach(produto => {
            // 10. Cria uma nova linha (<tr>) na tabela
            const row = document.createElement('tr');
            
            // 11. Preenche a linha com os dados do produto:
            // - Nome (texto simples)
            // - Valor (formatado como moeda com 2 casas decimais)
            // - Saldo e Saldo Mínimo (valores numéricos)
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>${produto.saldo}</td>
                <td>${produto.saldoMinimo}</td>
            `;
            
            // 12. Adiciona a linha preenchida à tabela
            table.appendChild(row);
        });
        
        // 13. Adiciona a tabela completa (com cabeçalho e linhas de produtos) ao HTML
        produtosList.appendChild(table);
        
    } catch (error) {
        // 14. Se ocorrer qualquer erro nas etapas anteriores...
        console.error('Erro ao carregar produtos:', error);
        
        // 15. Exibe uma mensagem de erro no lugar da lista de produtos
        document.getElementById('produtosList').innerHTML = 
            '<p>Erro ao carregar lista de produtos</p>';
    }
}



//mantem
document.addEventListener("DOMContentLoaded", () => {
let saveBtn = document.getElementById('saveBtn')
if(saveBtn instanceof HTMLButtonElement){
    saveBtn.addEventListener('click', saveProduto)
}
})


// Atualize o event listener para carregar os produtos quando a página abrir
document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            await saveProduto();
            await loadProdutos(); // Recarrega a lista após salvar
        });
    }
    
    loadProdutos(); // Carrega os produtos quando a página abre
});