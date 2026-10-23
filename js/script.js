// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // Function to calculate and update the total price of all items
  // -------------------------------------------------------------
  function updateTotalPrice() {
    // Select all remaining product cards in the DOM
    const cards = document.querySelectorAll(".card");
    let total = 0;

    cards.forEach((card) => {
      const unitPriceEl = card.querySelector(".unit-price");
      const quantityEl = card.querySelector(".quantity");

      if (unitPriceEl && quantityEl) {
        // Parse the numeric unit price (e.g., "100 $" -> 100)
        const unitPrice = parseFloat(String(unitPriceEl.textContent).trim()) || 0;
        // Parse the current quantity
        const quantity = parseInt(String(quantityEl.textContent).trim(), 10) || 0;

        total += unitPrice * quantity;
      }
    });

    // Update the total price displayed in the DOM
    const totalEl = document.querySelector(".total");
    if (totalEl) {
      totalEl.textContent = `${total} $`;
    }
  }

  // -------------------------------------------------------------
  // 1. Adjust the quantity of each item through "+" and "-" buttons
  // -------------------------------------------------------------
  // Plus buttons
  const plusButtons = document.querySelectorAll(".fa-plus-circle");
  plusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;

      const quantitySpan = card.querySelector(".quantity");
      if (quantitySpan) {
        let quantity = parseInt(String(quantitySpan.textContent).trim(), 10) || 0;
        quantity++;
        quantitySpan.textContent = String(quantity);
        updateTotalPrice();
      }
    });
  });

  // Minus buttons
  const minusButtons = document.querySelectorAll(".fa-minus-circle");
  minusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;

      const quantitySpan = card.querySelector(".quantity");
      if (quantitySpan) {
        let quantity = parseInt(String(quantitySpan.textContent).trim(), 10) || 0;
        // Quantity should not go below 0
        if (quantity > 0) {
          quantity--;
          quantitySpan.textContent = String(quantity);
          updateTotalPrice();
        }
      }
    });
  });

  // -------------------------------------------------------------
  // 2. Delete items from the cart
  // -------------------------------------------------------------
  const trashButtons = document.querySelectorAll(".fa-trash-alt");
  trashButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (card) {
        // If the card is wrapped in a container (.card-body) inside .list-products, remove the wrapper
        const wrapper = card.parentElement;
        if (
          wrapper &&
          wrapper.parentElement &&
          wrapper.parentElement.classList.contains("list-products")
        ) {
          wrapper.remove();
        } else {
          card.remove();
        }
        // Recalculate total after deletion
        updateTotalPrice();
      }
    });
  });

  // -------------------------------------------------------------
  // 3. Like items through a clickable heart-shaped button
  // -------------------------------------------------------------
  const heartButtons = document.querySelectorAll(".fa-heart");
  heartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle color between initial/black and red
      if (btn.style.color === "red") {
        btn.style.color = "black";
        btn.classList.remove("liked");
      } else {
        btn.style.color = "red";
        btn.classList.add("liked");
      }
    });
  });

  // Initial calculation of total price (defaults to 0 $)
  updateTotalPrice();
});
