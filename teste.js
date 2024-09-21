class Funcionario {
  constructor(nome, idade, cargo) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
  }

  seApresentar() {
    return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
  }

  trabalhar() {
    return `${this.nome} está trabalhando como ${this.cargo}.`;
  }
}

class Gerente extends Funcionario {
  constructor(nome, idade, cargo, departamento) {
    super(nome, idade, cargo);
    this.departamento = departamento;
  }

  gerenciar() {
    return `${this.nome} está inserida no departamento de ${this.departamento}.`;
  }
}

class Desenvolvedor extends Funcionario {
  constructor(nome, idade, cargo, linguagem) {
    super(nome, idade, cargo);
    this.linguagem = linguagem;
  }

  programar() {
    return `${this.nome} está programando em ${this.linguagem}.`;
  }
}

function exibirErro(mensagem) {
  const divErro = document.getElementById("erro");
  divErro.innerText = mensagem;
  divErro.style.display = "block";
}

document
  .getElementById("form-funcionario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const divErro = document.getElementById("erro");
    divErro.style.display = "none"; 
    divErro.innerText = ""; 

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ""; 

    try {
      const nome = document.getElementById("nome").value;
      const idade = parseInt(document.getElementById("idade").value);
      const cargo = document.getElementById("cargo").value;
      const departamento = document.getElementById("departamento").value;
      const linguagem = document.getElementById("linguagem").value;

      
      if (!nome || !cargo) {
        throw new Error(
          "Por favor, preencha todos os campos obrigatórios (nome e cargo)."
        );
      }

      if (isNaN(idade) || idade <= 0) {
        throw new Error("Idade deve ser um número positivo.");
      }

      let funcionario;
      if (cargo.toLowerCase() === "gerente") {
        if (!departamento) {
          throw new Error(
            "O campo 'departamento' é obrigatório para gerentes."
          );
        }
        funcionario = new Gerente(nome, idade, cargo, departamento);
      } else if (cargo.toLowerCase() === "desenvolvedor") {
        if (!linguagem) {
          throw new Error(
            "O campo 'linguagem' é obrigatório para desenvolvedores."
          );
        }
        funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
      } else {
        throw new Error(
          "Cargo inválido. Informe 'gerente' ou 'desenvolvedor'."
        );
      }

      
      resultadoDiv.innerHTML = `
      <p>${funcionario.seApresentar()}</p>
      <p>${funcionario.trabalhar()}</p>
      ${
        cargo.toLowerCase() === "gerente"
          ? `<p>${funcionario.gerenciar()}</p>`
          : ""
      }
      ${
        cargo.toLowerCase() === "desenvolvedor"
          ? `<p>${funcionario.programar()}</p>`
          : ""
      }
    `;

      
      document.getElementById("form-funcionario").reset();
    } catch (error) {
      exibirErro(error.message); 
    }
  });
