document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent default page reload
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
      form.reset(); // reset form fields
    } else {
      alert("Oops! There was a problem sending your message.");
    }
  })
  .catch(error => {
    alert("Oops! There was a problem sending your message.");
  });
});

