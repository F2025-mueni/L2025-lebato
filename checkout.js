document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = this;
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("successMessage").style.display = "block";
      form.reset();
    } else {
      response.json().then(data => {
        alert(data.error || "Oops! There was a problem submitting your order.");
      });
    }
  })
  .catch(error => {
    alert("Oops! There was a problem submitting your order.");
  });
});