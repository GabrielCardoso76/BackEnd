// Função para buscar o produto por ID (GET)
async function buscarProduto() {
    const id = document.getElementById("id").value;
  
    if (!id) {
      alert("Por favor, digite o ID do produto.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/produto/${id}`);
      if (!response.ok) {
        throw new Error("Produto não encontrado");
      }
  
      const produto = await response.json();
  
      // Preenche os campos com os dados do produto
      document.getElementById("nome").value = produto.nome;
      document.getElementById("valor").value = produto.valor;
      document.getElementById("saldo").value = produto.saldo;
      document.getElementById("saldoMinimo").value = produto.saldoMinimo;
  
      // Exibe as informações do produto na tela
      const produtoInfo = document.getElementById("produtoInfo");
      produtoInfo.innerHTML = `
        <h2>Produto Encontrado:</h2>
        <p><strong>Nome:</strong> ${produto.nome}</p>
        <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
        <p><strong>Saldo:</strong> ${produto.saldo}</p>
        <p><strong>Saldo Mínimo:</strong> ${produto.saldoMinimo}</p>
      `;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      document.getElementById("produtoInfo").innerHTML =
        "<p>Produto não encontrado ou erro na requisição</p>";
    }
  }
  
  // Função para atualizar o produto (PUT)
  async function atualizarProduto() {
    const id = document.getElementById("id").value; // Captura o ID do campo de input
    const nome = document.getElementById("nome").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const saldo = parseInt(document.getElementById("saldo").value);
    const saldoMinimo = parseInt(document.getElementById("saldoMinimo").value);
  
    const produto = {
      nome,
      valor,
      saldo,
      saldoMinimo,
    };
  
    try {
      const response = await fetch(`http://localhost:8080/produto/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
  
      if (response.ok) {
        alert("Produto atualizado com sucesso")
        console.log("Produto atualizado com sucesso");
      } else {
        console.error("Erro ao atualizar produto:", response);
        alert("Erro ao atualizar produto:", response);
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  }
  
  // Evento de carregamento da página
  document.addEventListener("DOMContentLoaded", () => {
    const buscarBtn = document.getElementById("buscarBtn");
    const saveBtn = document.getElementById("saveBtn");
  
    if (buscarBtn) {
      buscarBtn.addEventListener("click", async () => {
        await buscarProduto();
      });
    }
  
    if (saveBtn) {
      saveBtn.addEventListener("click", async () => {
        await atualizarProduto();
      });
    }
  });
  