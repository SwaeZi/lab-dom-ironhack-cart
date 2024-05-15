 function updateSubtotal(product) {
   console.log("Calculating subtotal, yey!");

   const price = parseFloat(product.querySelector(".price span").innerText);
   const quantity = parseFloat(product.querySelector(".quantity input").value);

   const subtotalValue = price * quantity;

   const subtotalSpan = product.querySelector(".subtotal span");
   subtotalSpan.innerText = subtotalValue.toFixed(2);

   return subtotalValue;
 }

 function calculateAll() {
   const products = document.getElementsByClassName("product");

   let totalValue = 0;

   for (let product of products) {
     totalValue += updateSubtotal(product);
   }

   document.querySelector("#total-value span").innerText = totalValue;
 }

 function removeProduct(event) {
   const target = event.currentTarget;
   console.log("The target in remove is:", target);

   const row = target.parentNode.parentNode;
   console.log(row);

   const parent = row.parentNode;
   console.log(parent);

   parent.removeChild(row);
 }

 function createProduct() {
   let createRow = document.querySelector(".create-product");
   let newProdNameInput = createRow.querySelector("input");
   let newProdPriceInput = createRow.querySelector("input[type='number']");

   if (
     newProdNameInput.value.trim() === "" ||
     parseFloat(newProdPriceInput.value) === 0
   ) {
     alert("Please fill in both product name and price.");
     return;
   }
   let newProdPriceValue = Number(newProdPriceInput.valueAsNumber).toFixed(2);

   const newTableRow = document.createElement("tr");
   newTableRow.classList.add("product");
   newTableRow.innerHTML = `
    <td class="name">
      <span>${newProdNameInput.value}</span>
    </td>
    <td class="price">
      $<span>${newProdPriceValue}</span>
    </td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

   const parent = document.querySelector("#cart-tbody");
   parent.appendChild(newTableRow);

   const removeBtn = newTableRow.querySelector(".btn-remove");
   removeBtn.addEventListener("click", removeProduct);

   newProdNameInput.value = "";
   newProdPriceInput.value = "";
 }

 window.addEventListener("load", () => {
   const calculatePricesBtn = document.getElementById("calculate");
   calculatePricesBtn.addEventListener("click", calculateAll);

   const removeBtns = document.querySelectorAll(".btn-remove");
   for (let individualBtn of removeBtns) {
     individualBtn.addEventListener("click", removeProduct);
   }

   const createBtn = document.querySelector("#create");
   if (createBtn) {
     createBtn.addEventListener("click", createProduct);
   }
 });
