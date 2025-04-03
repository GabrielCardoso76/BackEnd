// Função para salvar o produto
async function saveProduto() {
  const nome = document.getElementById("nome").value; // Pega o valor do campo de input com id "nome"
  const valor = parseFloat(document.getElementById("valor").value); // Pega o valor do campo de input com id "valor" e converte para número decimal
  const saldo = parseInt(document.getElementById("saldo").value); // Pega o valor do campo de input com id "saldo" e converte para número inteiro
  const saldoMinimo = parseInt(document.getElementById("saldoMinimo").value); // Pega o valor do campo de input com id "saldoMinimo" e converte para número inteiro

  const produto = {
    // Cria um objeto produto com os dados obtidos dos campos
    nome: nome,
    valor: valor,
    saldo: saldo,
    saldoMinimo: saldoMinimo,
  };

  console.log(produto); // Exibe o objeto produto no console para depuração

  try {
    // Faz uma requisição POST para salvar o produto no backend
    const response = await fetch("http://localhost:8080/produto", {
      method: "POST", // Método POST para enviar dados
      headers: {
        "Content-Type": "application/json", // Especifica que os dados são em formato JSON
      },
      body: JSON.stringify(produto), // Envia o objeto produto convertido para JSON
    });

    if (response.ok) {
      // Se a resposta for positiva
      console.log("Produto salvo com sucesso"); // Exibe uma mensagem de sucesso no console
      await loadProdutos(); // Chama a função para carregar os produtos atualizados
    } else {
      console.error("Erro ao salvar produto:", response); // Exibe uma mensagem de erro no console caso a resposta não seja ok
    }
  } catch (error) {
    // Se ocorrer um erro durante a requisição
    console.error("Erro ao salvar produto:", error); // Exibe o erro no console
  }
}

// Função para carregar os produtos
async function loadProdutos() {
  try {
    // Faz uma requisição GET para buscar todos os produtos do backend
    const response = await fetch("http://localhost:8080/produto");
    const produtos = await response.json(); // Converte a resposta para JSON (lista de produtos)
    const produtosList = document.getElementById("produtosList"); // Obtém o elemento da lista de produtos no HTML

    // Limpa o conteúdo atual da lista antes de adicionar os novos produtos
    produtosList.innerHTML = "";

    if (produtos.length === 0) {
      // Se não houver produtos cadastrados
      produtosList.innerHTML = "<p>Nenhum produto cadastrado</p>"; // Exibe uma mensagem de que não há produtos
      return; // Sai da função
    }

    // Cria uma tabela HTML para exibir os produtos
    const table = document.createElement("table");
    table.innerHTML = `
              <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Saldo</th>
                  <th>Saldo Mínimo</th>
                  <th>Deletar Produto</th>
              </tr>
          `;

    // Para cada produto retornado, cria uma linha na tabela
    produtos.forEach((produto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td>${produto.nome}</td>
                  <td>R$ ${produto.valor.toFixed(2)}</td>
                  <td>${produto.saldo}</td>
                  <td>${produto.saldoMinimo}</td>
                  <td><button class="deletar" data-id="${
                    produto.idProduto
                  }">Deletar</button></td>
              `;
      table.appendChild(row); // Adiciona a linha na tabela
    });

    produtosList.appendChild(table); // Adiciona a tabela na lista de produtos no HTML

    // Adiciona um evento de clique em todos os botões "Deletar"
    const deleteButtons = document.querySelectorAll(".deletar");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id"); // Obtém o id do produto a ser deletado
        await deleteProduto(id); // Chama a função para deletar o produto
      });
    });
  } catch (error) {
    // Caso ocorra algum erro ao carregar os produtos
    console.error("Erro ao carregar produtos:", error); // Exibe o erro no console
    document.getElementById("produtosList").innerHTML =
      "<p>Erro ao carregar lista de produtos</p>"; // Exibe uma mensagem de erro no HTML
  }
}

// Função para deletar o produto
async function deleteProduto(id) {
  try {
    // Faz uma requisição DELETE para remover o produto do backend
    const response = await fetch(`http://localhost:8080/produto/${id}`, {
      method: "DELETE", // Método DELETE para remover o produto
    });

    if (response.ok) {
      // Se a resposta for positiva
      console.log("Produto deletado com sucesso"); // Exibe uma mensagem de sucesso no console
      await loadProdutos(); // Chama a função para carregar a lista de produtos atualizada
    } else {
      console.error("Erro ao deletar produto:", response); // Exibe uma mensagem de erro no console caso a resposta não seja ok
    }
  } catch (error) {
    // Se ocorrer um erro durante a requisição
    console.error("Erro ao deletar produto:", error); // Exibe o erro no console
  }
}

// Evento de carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn"); // Obtém o botão de salvar produto
  const carregarListaBtn = document.getElementById("carregarListaBtn"); // Obtém o botão de carregar lista de produtos
  if (saveBtn) {
    // Se o botão de salvar existir
    saveBtn.addEventListener("click", async () => {
      await saveProduto(); // Chama a função para salvar o produto quando o botão for clicado
    });
    if (carregarListaBtn) {
      // Se o botão de carregar lista existir
      carregarListaBtn.addEventListener("click", async () => {
        await loadProdutos(); // Chama a função para carregar a lista de produtos quando o botão for clicado
      });
    }
  }
});
