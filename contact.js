document.getElementById("contactForm").addEventListener("submit", function(event){
  event.preventDefault();
  document.getElementById("successMessage").style.display = "block";
  this.reset();
});
