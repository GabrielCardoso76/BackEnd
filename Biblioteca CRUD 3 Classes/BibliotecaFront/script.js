const apiBase = "http://localhost:8080";

// 📘 Livros

// Função para listar os livros
async function listarLivros() {
    const response = await fetch(`${apiBase}/livro`);
    const livros = await response.json();
    const livrosList = document.getElementById("livrosList");
    livrosList.innerHTML = livros.map(livro => `
        <li>
            ${livro.nome} - ${livro.autor} - ${livro.isbn} - ${livro.genero}
            <button class="delete-btn" onclick="deletarLivro(${livro.id})">Deletar</button>
            <button onclick="abrirFormularioEdicao(${livro.id})">Editar</button>
        </li>
    `).join("");
}

// Função para abrir o formulário de edição do livro
async function abrirFormularioEdicao(id) {
    const response = await fetch(`${apiBase}/livro/${id}`);
    const livro = await response.json();
    
    // Preenche o formulário de edição com os dados do livro
    document.getElementById("livroNome").value = livro.nome;
    document.getElementById("livroAutor").value = livro.autor;
    document.getElementById("livroISBN").value = livro.isbn;
    document.getElementById("livroGenero").value = livro.genero;
    
    // Adiciona o ID do livro ao formulário para enviar na atualização
    document.getElementById("livroId").value = livro.id; 
    
    // Adiciona um atributo data-editing para saber que o livro está sendo editado
    document.getElementById("livroForm").setAttribute("data-editing", id);
}

// Função para adicionar ou atualizar um livro
document.getElementById("livroForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const livro = {
        nome: document.getElementById("livroNome").value,
        autor: document.getElementById("livroAutor").value,
        isbn: parseInt(document.getElementById("livroISBN").value), // Conversão para inteiro
        genero: document.getElementById("livroGenero").value,
    };

    const form = document.getElementById("livroForm");
    const isEditing = form.getAttribute("data-editing");

    if (isEditing) {
        const id = isEditing; // O ID do livro será usado para atualizar
        await fetch(`${apiBase}/livro/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });

        alert("Livro atualizado com sucesso!");
    } else {
        await fetch(`${apiBase}/livro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });

        alert("Livro cadastrado com sucesso!");
    }

    form.reset();
    form.removeAttribute("data-editing");
    listarLivros(); // Atualiza a lista de livros
});

// Função para deletar um livro
async function deletarLivro(id) {
    await fetch(`${apiBase}/livro/${id}`, {
        method: "DELETE",
    });
    alert("Livro deletado!");
    listarLivros(); // Atualiza a lista de livros
}

// 🧑‍🤝‍🧑 Clientes

// Função para listar os clientes
async function listarClientes() {
    const response = await fetch(`${apiBase}/cliente`);
    const clientes = await response.json();
    const clientesList = document.getElementById("clientesList");
    clientesList.innerHTML = clientes.map(cliente => `
        <li>
            ${cliente.nome} ${cliente.sobrenome} - ${cliente.cpf}
            <button class="delete-btn" onclick="deletarCliente(${cliente.cpf})">Deletar</button>
            <button onclick="abrirFormularioEdicaoCliente(${cliente.cpf})">Editar</button>
        </li>
    `).join("");
}

// Função para adicionar um novo cliente
document.getElementById("clienteForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();
    const cliente = {
        nome: document.getElementById("clienteNome").value,
        sobrenome: document.getElementById("clienteSobrenome").value,
        cpf: document.getElementById("clienteCPF").value,
    };

    await fetch(`${apiBase}/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });

    alert("Cliente cadastrado com sucesso!");
    this.reset();
    listarClientes(); // Atualiza a lista de clientes
});

// Função para deletar um cliente
async function deletarCliente(cpf) {
    await fetch(`${apiBase}/cliente/${cpf}`, {
        method: "DELETE",
    });
    alert("Cliente deletado!");
    listarClientes(); // Atualiza a lista de clientes
}

// 📝 Emprestimos

// Função para listar os empréstimos
async function listarEmprestimos() {
    const response = await fetch(`${apiBase}/emprestimo`);
    const emprestimos = await response.json();
    const emprestimosList = document.getElementById("emprestimosList");
    emprestimosList.innerHTML = emprestimos.map(emprestimo => `
        <li>
            Cliente: ${emprestimo.cliente.nome} ${emprestimo.cliente.sobrenome} - Livros: ${emprestimo.livros.map(livro => livro.isbn).join(", ")} - De ${emprestimo.dataInicial} até ${emprestimo.dataFinal}
            <button class="delete-btn" onclick="deletarEmprestimo(${emprestimo.id})">Deletar</button>
        </li>
    `).join("");
}

// Função para adicionar um novo empréstimo
document.getElementById("emprestimoForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();
    const emprestimo = {
        dataInicial: document.getElementById("dataInicial").value,
        dataFinal: document.getElementById("dataFinal").value,
        cliente: { cpf: document.getElementById("emprestimoCPF").value },
        livros: document.getElementById("emprestimoISBNs").value.split(',').map(isbn => ({ isbn: isbn.trim() }))
    };

    await fetch(`${apiBase}/emprestimo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emprestimo)
    });

    alert("Empréstimo cadastrado com sucesso!");
    this.reset();
    listarEmprestimos(); // Atualiza a lista de empréstimos
});

// Função para deletar um empréstimo
async function deletarEmprestimo(id) {
    await fetch(`${apiBase}/emprestimo/${id}`, {
        method: "DELETE",
    });
    alert("Empréstimo deletado!");
    listarEmprestimos(); // Atualiza a lista de empréstimos
}

// Chama as funções de listagem ao carregar a página
window.onload = () => {
    listarLivros(); // Lista os livros
    listarClientes(); // Lista os clientes
    listarEmprestimos(); // Lista os empréstimos
};
