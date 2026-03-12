// product.js
import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch products from Firestore
async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    displayProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products on the product page
function displayProducts() {
  const list = document.getElementById("product-list");
  if (!list) return; // exit if product list container doesn't exist

  list.innerHTML = "";

  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" alt="${p.name}">
      <p>${p.desc}</p>
      <p><strong>Price:</strong> Ksh ${p.price.toFixed(2)}</p>
      <button class="add-btn">Add to Cart</button>
    `;

    // Attach event listener instead of inline onclick
    const button = card.querySelector(".add-btn");
    button.addEventListener("click", () => addToCart(index));

    list.appendChild(card);
  });
}

// Add product to cart
function addToCart(index) {
  const existingItem = cart.find(item => item.id === products[index].id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...products[index], quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Cart functions
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  if (!cartContainer || !cartTotalEl) return; // exit if not on cart page

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} - Ksh ${item.price.toFixed(2)} x ${item.quantity}</p>
      <button class="increase-btn">+</button>
      <button class="decrease-btn">-</button>
      <button class="remove-btn">Remove</button>
    `;

    // Attach listeners for cart actions
    div.querySelector(".increase-btn").addEventListener("click", () => increaseQuantity(i));
    div.querySelector(".decrease-btn").addEventListener("click", () => decreaseQuantity(i));
    div.querySelector(".remove-btn").addEventListener("click", () => removeItem(i));

    cartContainer.appendChild(div);
  });

  cartTotalEl.textContent = `Total: Ksh ${total.toFixed(2)}`;
}

function increaseQuantity(index) {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Initialize
fetchProducts();
displayCart();
