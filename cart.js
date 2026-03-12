function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.getElementById("cart-body");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  tbody.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}" class="cart__img">
        ${item.name}
      </td>
      <td>Ksh ${item.price.toFixed(2)}</td>
      <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
      <td>Ksh ${itemTotal.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(row);
  });

  // Shipping flat rate (example: Ksh 200)
  const shipping = cart.length > 0 ? 200 : 0;
  const total = subtotal + shipping;

  subtotalEl.textContent = `Ksh ${subtotal.toFixed(2)}`;
  shippingEl.textContent = `Ksh ${shipping.toFixed(2)}`;
  totalEl.textContent = `Ksh ${total.toFixed(2)}`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function updateQuantity(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Initialize cart display
displayCart();
