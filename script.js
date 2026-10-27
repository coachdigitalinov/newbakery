// Scroll to the About section when the button is clicked
document.getElementById("explore-btn").addEventListener("click", function () {
  document.getElementById("about").scrollIntoView();
});

// Order form
var form = document.getElementById("order-form");
var nameInput = document.getElementById("customer-name");
var productSelect = document.getElementById("product");
var quantityInput = document.getElementById("quantity");
var totalDisplay = document.getElementById("total-price");
var nameError = document.getElementById("name-error");
var quantityError = document.getElementById("quantity-error");
var summary = document.getElementById("order-summary");

function getPrice() {
  return Number(productSelect.options[productSelect.selectedIndex].dataset.price);
}

function updateTotal() {
  var quantity = parseInt(quantityInput.value, 10);
  if (isNaN(quantity) || quantity < 1) {
    totalDisplay.textContent = "₹0";
    return;
  }
  totalDisplay.textContent = "₹" + getPrice() * quantity;
}

productSelect.addEventListener("change", updateTotal);
quantityInput.addEventListener("input", updateTotal);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = nameInput.value.trim();
  var quantityText = quantityInput.value.trim();
  var quantity = Number(quantityText);
  var valid = true;

  nameError.textContent = "";
  quantityError.textContent = "";
  nameInput.classList.remove("invalid");
  quantityInput.classList.remove("invalid");

  if (name === "") {
    nameError.textContent = "Please enter your name.";
    nameInput.classList.add("invalid");
    valid = false;
  }

  if (quantityText === "" || !Number.isInteger(quantity) || quantity < 1) {
    quantityError.textContent = "Quantity must be a whole number, at least 1.";
    quantityInput.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    summary.hidden = true;
    return;
  }

  var product = productSelect.value;
  var total = getPrice() * quantity;

  summary.innerHTML = "";
  var heading = document.createElement("h3");
  heading.textContent = "Order Summary";
  summary.appendChild(heading);

  var lines = [
    "Customer: " + name,
    "Product: " + product,
    "Quantity: " + quantity,
    "Total: ₹" + total
  ];
  lines.forEach(function (text) {
    var p = document.createElement("p");
    p.textContent = text;
    summary.appendChild(p);
  });

  var thanks = document.createElement("p");
  thanks.className = "thanks";
  thanks.textContent = "Thank you, " + name + "! Your order has been received. We'll start baking your treats with love.";
  summary.appendChild(thanks);

  summary.hidden = false;
  summary.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Contact form (demo only: nothing is sent anywhere)
var contactForm = document.getElementById("contact-form");
var contactName = document.getElementById("contact-name");
var contactEmail = document.getElementById("contact-email");
var contactMessage = document.getElementById("contact-message");
var contactConfirmation = document.getElementById("contact-confirmation");

function setContactError(input, errorId, text) {
  document.getElementById(errorId).textContent = text;
  input.classList.toggle("invalid", text !== "");
  return text === "";
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = contactName.value.trim();
  var email = contactEmail.value.trim();
  var message = contactMessage.value.trim();

  var emailText = "";
  if (email === "") {
    emailText = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailText = "Please enter a valid email address.";
  }

  var nameOk = setContactError(contactName, "contact-name-error", name === "" ? "Please enter your name." : "");
  var emailOk = setContactError(contactEmail, "contact-email-error", emailText);
  var messageOk = setContactError(contactMessage, "contact-message-error", message === "" ? "Please write a message." : "");

  if (!(nameOk && emailOk && messageOk)) {
    contactConfirmation.hidden = true;
    return;
  }

  contactConfirmation.textContent = "Thank you, " + name + "! Your message has been received. (This is a demo, so it was not sent to a real inbox.)";
  contactConfirmation.hidden = false;
  contactForm.reset();
});
