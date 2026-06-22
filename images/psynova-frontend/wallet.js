let selectedAmount = 50;

function selectAmount(amount) {
  selectedAmount = amount;

  document.querySelectorAll(".amounts button").forEach(btn => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
  document.getElementById("customAmount").value = "";
}

document.getElementById("customAmount").addEventListener("input", function() {
  selectedAmount = this.value;

  document.querySelectorAll(".amounts button").forEach(btn => {
    btn.classList.remove("active");
  });
});

document.querySelector(".pay-btn").addEventListener("click", () => {
  alert("Added $" + selectedAmount + " to wallet 💰");
});