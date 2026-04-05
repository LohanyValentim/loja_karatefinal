const api = "http://localhost:3000";


async function carregarProdutos() {
  try {
    const resposta = await fetch(api + "/produtos");
    const produtos = await resposta.json();

    const div = document.getElementById("produtos");
    if (!div) return;

    div.innerHTML = "";

    
    const destaque = produtos.slice(0, 3);

    destaque.forEach(p => {
      div.innerHTML += `
        <div class="card" onclick="abrirDetalhe(${p.id})">
          
          <img src="${p.imagem}" 
               onerror="this.src='https://via.placeholder.com/150'">

          <h3>${p.nome}</h3>
          <p>R$ ${p.preco}</p>

          <button onclick="event.stopPropagation(); comprar(${p.id})">
            Comprar
          </button>

        </div>
      `;
    });

  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}



async function comprar(id) {
  try {
    const resposta = await fetch(api + "/comprar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ produto_id: id })
    });

    const dados = await resposta.json();
    console.log(dados);

    mostrarMensagem();

  } catch (erro) {
    console.error("Erro ao comprar:", erro);
  }
}


function mostrarMensagem() {
  const msg = document.getElementById("mensagem");
  if (!msg) return;

  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 2000);
}


function irParaProdutos() {
  window.location.href = "produtos.html";
}

carregarProdutos();