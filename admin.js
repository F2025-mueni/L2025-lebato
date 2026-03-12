// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// -------------------- Firebase config --------------------
const firebaseConfig = {
  apiKey: "AIzaSyD1rncdgnBZIwotnEI4PJMo-ceMsHzfReY",
  authDomain: "lebato-store.firebaseapp.com",
  projectId: "lebato-store",
  storageBucket: "lebato-store.firebasestorage.app",
  messagingSenderId: "426117570447",
  appId: "1:426117570447:web:16086dcf2a714ff1f2f5fa",
  measurementId: "G-8TM46ZR3Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// -------------------- Elements --------------------
const loginSection = document.getElementById("login-section");
const loginBtn = document.getElementById("login-btn");
const loginStatus = document.getElementById("login-status");
const productFormSection = document.getElementById("product-form-section");
const addProductBtn = document.getElementById("add-product-btn");
const status = document.getElementById("status");
const productsList = document.getElementById("products-list"); // List container

// -------------------- Admin Login --------------------
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("admin-email").value.trim();
  const password = document.getElementById("admin-password").value.trim();

  if (!email || !password) {
    loginStatus.textContent = "Please enter email and password ❌";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginStatus.textContent = "Login successful ✅";
    loginSection.style.display = "none";
    productFormSection.style.display = "block";
    loadProducts(); // Load products after login
  } catch (error) {
    console.error("Login error:", error);
    loginStatus.textContent = "Login failed ❌ " + error.message;
  }
});

// -------------------- Add Product --------------------
addProductBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").value.trim();

  if (!name || !desc || isNaN(price) || !image) {
    status.textContent = "Please fill in all fields correctly ❌";
    return;
  }

  try {
    await addDoc(collection(db, "products"), { name, desc, price, image });
    status.textContent = `Product "${name}" added ✅`;

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";

    loadProducts(); // Reload products after adding
  } catch (error) {
    console.error("Add product error:", error);
    status.textContent = "Error adding product ❌ " + error.message;
  }
});

// -------------------- Load Products --------------------
async function loadProducts() {
  productsList.innerHTML = ""; // Clear current list

  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      productsList.innerHTML = "<li>No products found.</li>";
      return;
    }

    querySnapshot.forEach((docSnap) => {
      const product = docSnap.data();
      const id = docSnap.id;

      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${product.name}</strong> - KSh ${product.price.toFixed(2)}
        <br>${product.desc}
        <br><img src="${product.image}" alt="${product.name}" width="100" style="margin:5px 0;">
        <br><button onclick="deleteProduct('${id}')">Delete ❌</button>
        <hr>
      `;
      productsList.appendChild(li);
    });
  } catch (error) {
    console.error("Load products error:", error);
    productsList.innerHTML = "<li>Error loading products ❌</li>";
  }
}

// -------------------- Delete Product --------------------
window.deleteProduct = async function (id) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "products", id));
    alert("Product deleted ✅");
    loadProducts(); // Reload products after deletion
  } catch (error) {
    console.error("Delete product error:", error);
    alert("Error deleting product ❌ " + error.message);
  }
};