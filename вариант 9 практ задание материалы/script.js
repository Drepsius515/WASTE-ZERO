const products = [
  {
    id: 1,
    name: "Мыло Greena Avocadova белое дерево, 100 г",
    description: "Натуральное мыло ручной работы для бережной заботы о коже рук и тела.",
    price: 220,
    image: "img/n1.jpg",
    imageWebp: ""
  },
  {
    id: 2,
    name: "Трубочка металлическая длинная для высоких стаканов, прямая, 28 см",
    description: "Многоразовая удлиненная трубочка. Подойдет для высоких стаканов.",
    price: 90,
    image: "img/n2.jpg",
    imageWebp: ""
  },
  {
    id: 3,
    name: "Ёршик для чистки длинных трубочек, 30 см",
    description: "Подходит для многоразовых трубочек из любых материалов. Стержень ёршика гибкий, поэтому им можно чистить не только прямые, но и изогнутые трубочки.",
    price: 70,
    image: "img/n3.jpg",
    imageWebp: ""
  },
  {
    id: 4,
    name: "Авоська для бутылки, мятная",
    description: "Авоська для бутылки подойдет тем, кто не хочет брать с собой сумку ради бутылки с водой.",
    price: 440,
    image: "img/n4.jpg",
    imageWebp: ""
  },
  {
    id: 5,
    name: "Бутылка складная силиконовая Stojo Bottle Carnation Jelly, 20 oz / 590 мл",
    description: "Новая коллекция Jelly у любимого Stojo.",
    price: 2060,
    image: "img/n5.jpg",
    imageWebp: ""
  },
  {
    id: 6,
    name: "Крем противовоспалительный Голодный Леший Тишина и сон, Refill 100 мл",
    description: "Этот товар поставляется в многоразовой упаковке Refill 💧 При оформлении заказа вы дополнительно оплачиваете стоимость упаковки.",
    price: 900,
    image: "img/n6.jpg",
    imageWebp: ""
  },
];

let cart = [];

const productsContainer = document.getElementById('products-container');
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

function renderCatalog() {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <picture>
        <source srcset="${product.imageWebp}" type="image/webp">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </picture>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price.toLocaleString('ru-RU')} ₽</p>
      <button onclick="addToCart(${product.id})">В корзину</button>
    `;
    productsContainer.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartUI();
}


function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;

  renderCartItems();
  updateTotalPrice();
}

function renderCartItems() {
  if (!cartModal.classList.contains('hidden')) {
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Товар не выбран</p>';
    } else {
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <span>${item.product.name} × ${item.quantity}</span>
          <span>${(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
        </div>
      `).join('');
    }
  }
}

function updateTotalPrice() {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  totalPriceEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
}

cartBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  renderCartItems();
  updateTotalPrice();
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add('hidden');
  }
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Товар нет в корзине');
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  alert(`Успешно выкуплен за ${total.toLocaleString('ru-RU')} ₽`);
  cart = [];
  updateCartUI();
  cartModal.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();
});