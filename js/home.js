//search form
document.querySelector("#search-btn").onclick = () => {
  document.querySelector(".search-form").classList.toggle("active");
  navBar.classList.remove("active");
  document.querySelector(".cart-wrapper").classList.remove("active");
};

//cart box js
document.querySelector("#cart").onclick = () => {
  document.querySelector(".cart-wrapper").classList.toggle("active");
  navBar.classList.remove("active");
  document.querySelector(".search-form").classList.remove("active");
};

//close button js
document.querySelector("#close-btn").onclick = () => {
  document.querySelector(".cart-wrapper").classList.remove("active");
};

let menu = document.querySelector("#menu-btn");
let navBar = document.querySelector(".navbar");

//menu button js
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navBar.classList.toggle("active");
  document.querySelector(".search-form").classList.remove("active");
  document.querySelector(".cart-wrapper").classList.remove("active");
};
//window ie browser viewport when scrolling
window.onscroll = () => {
  navBar.classList.remove("active");
  document.querySelector(".search-form").classList.remove("active");
  document.querySelector(".cart-wrapper").classList.remove("active");
};

//for next button and prev button working js
let slides = document.querySelectorAll(".slide-container");
let index = 0;

function next() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}
function prev() {
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");
}

//to check if to see if the document is done loading using the if statement
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartitemsButtons = document.getElementsByClassName("remove-btn");
  for (let i = 0; i < removeCartitemsButtons.length; i++) {
    let removeButton = removeCartitemsButtons[i];
    removeButton.addEventListener("click", removeCartItem);
  }
  //incrementing the cart quantity from 1 above
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged); //change event is used for changing values in an input
  }
  //add to cart button working js
  let addToCartButton = document.getElementsByClassName("btn");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addTocartClicked);
  }
  //purchase button working js
  document
    .getElementsByClassName("purchase-btn")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.getElementsByClassName("cart-row")[0];
  while (cartItems.hasChildNodes()) {
    //this means does it have children
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let removeButtonClicked = event.target;
  removeButtonClicked.parentElement.remove(); //to remove the parent element of the remove-btn
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  //using if statement to check if the value of the input is NaN or a number
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1; //setting the input.value to 1 because 1 is the lowest possible value the input can take
  }
  updateCartTotal();
}

function addTocartClicked(event) {
  let button = event.target;
  let boxItem = button.parentElement; //getting the parent element of the addcart class
  let title = boxItem.getElementsByClassName("box-title")[0].innerText;
  let price = boxItem.getElementsByClassName("price")[0].innerText;
  let image = boxItem.getElementsByClassName("box-img")[0].src;
  addItemToCart(title, price, image);
  updateCartTotal();
}

function addItemToCart(title, price, image) {
  let cartBox = document.createElement("div"); //the create element method helps to create any type of element
  cartBox.classList.add("cart-box");
  //adding the div to the cart row
  let cartItems = document.getElementsByClassName("cart-row")[0];
  //using the for loop and if- statement to check if the same item is repeated when clicked
  let cartItemsNames = cartItems.getElementsByClassName("cart-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to the cart");
      return;
    }
  }
  let cartBoxContents = `
        <img src="${image}" alt="">
        <div class="cart-details">
            <p class="cart-title">${title}</p>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fas fa-trash remove-btn"></i>`;
  cartBox.innerHTML = cartBoxContents;
  cartItems.append(cartBox);
  /*adding the eventListeners for both remove btn, quantity again because 
    they were at the ready state when the document finished loading*/
  cartBox
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeCartItem);
  cartBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

//for updating the cart total js
function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-row")[0];
  let cartBoxes = cartItemContainer.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", "")); //to replace the dollar sign with empty string
    let quantity = quantityElement.value; //since the input has a value
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100; //rounding the total to 2 decimal places using math.round and divide by 100
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
