
// D.C COMPANY — BLESSED

const whatsapp = "244935251490";

const products = [
  {
    id: 1,
    name: "BLESSED GOLD",
    description: "Relógio clássico com acabamento dourado.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"
  },
  {
    id: 2,
    name: "BLESSED BLACK",
    description: "Design moderno e elegante.",
    price: 95000,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800"
  },
  {
    id: 3,
    name: "BLESSED SILVER",
    description: "Sofisticação com acabamento prateado.",
    price: 110000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  }
];

const container = document.getElementById("products");
const details = document.getElementById("product-details");

let cart = [];

function formatPrice(price) {
  return price.toLocaleString("pt-PT") + " Kz";
}

function buyProduct(product) {
  if (!product) return;

  const message =
    `Olá, D.C COMPANY! Tenho interesse no relógio ${product.name}, ` +
    `da marca BLESSED, no valor de ${formatPrice(product.price)}.`;

  const url =
    `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encodeURIComponent(message)}`;

  window.location.href = url;
}

// DETALHES DOS PRODUTOS

function showDetails(id) {
  const product = products.find(item => item.id === id);

  if (!product || !details) return;

  details.innerHTML = `
    <button class="close-details" onclick="closeDetails()">
      ← VOLTAR À COLEÇÃO
    </button>

    <img src="${product.image}" alt="${product.name}">

    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <strong>${formatPrice(product.price)}</strong>

    <br><br>

    <button onclick="addToCart(${product.id})">
      ADICIONAR À SACOLA
    </button>

    <br><br>

    <button onclick="buyProduct(products.find(p => p.id === ${product.id}))">
      COMPRAR AGORA
    </button>
  `;

  details.classList.add("active");
  details.scrollIntoView({ behavior: "smooth" });
}

function closeDetails() {
  details.classList.remove("active");

  document.getElementById("colecao").scrollIntoView({
    behavior: "smooth"
  });
}

// CATÁLOGO

function displayProducts() {
  if (!container) return;

  container.innerHTML = products.map(product => `
    <article class="product-card">

      <img
        src="${product.image}"
        alt="${product.name}"
        onclick="showDetails(${product.id})"
        style="cursor:pointer"
      >

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>${formatPrice(product.price)}</strong>

        <button onclick="addToCart(${product.id})">
          ADICIONAR À SACOLA
        </button>

        <button
          class="details-button"
          onclick="showDetails(${product.id})">
          VER DETALHES
        </button>
      </div>

    </article>
  `).join("");
}

// SACOLA DE COMPRAS

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();

  document.getElementById("cart-panel").hidden = false;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const count = document.getElementById("cart-count");
  const items = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");
  const totalElement = document.getElementById("cart-total");

  if (!count || !items || !empty || !totalElement) return;

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  count.textContent = totalQuantity;
  totalElement.textContent = formatPrice(total);
  empty.style.display = cart.length === 0 ? "block" : "none";

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>${item.quantity} x ${formatPrice(item.price)}</p>
      </div>

      <button
        class="cart-remove"
        onclick="removeFromCart(${item.id})">
        REMOVER
      </button>
    </div>
  `).join("");
}

// ABRIR E FECHAR SACOLA

document.getElementById("cart-toggle").addEventListener("click", () => {
  const panel = document.getElementById("cart-panel");
  panel.hidden = !panel.hidden;
});

// FINALIZAR PEDIDO PELO WHATSAPP

document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("A tua sacola está vazia!");
    return;
  }

  let message = "Olá, D.C COMPANY! Gostaria de fazer este pedido:%0A%0A";

  cart.forEach(item => {
    message += `• ${item.name} — ${item.quantity} unidade(s) — ${formatPrice(item.price * item.quantity)}%0A`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  message += `%0ATOTAL: ${formatPrice(total)}`;

  const url =
    `https://api.whatsapp.com/send?phone=${whatsapp}&text=${message}`;

  window.location.href = url;
});

// INICIAR

displayProducts();
renderCart();

/* BLESSED — FINAL INTRO */

window.addEventListener("load", function () {
  const loader = document.getElementById("blessed-loader");

  if (!loader) return;

  setTimeout(function () {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    setTimeout(function () {
      loader.style.display = "none";
    }, 1000);

  }, 2500);
});

// BLESSED — VOLTAR AO TOPO

const topButton = document.getElementById("back-to-top");

if (topButton) {
  window.addEventListener("scroll", function () {
    topButton.classList.toggle("visible", window.scrollY > 300);
  });

  topButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
