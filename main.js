// Initialize an empty cart
let cart = [];

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    alert(`${product.name} has been added to your cart.`);
    updateCartCount();
}

// Function to update the cart count displayed
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in your cart.</p>';
        return;
    }

    cart.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(itemDiv);
    });

    const buyNowButton = document.createElement('button');
    buyNowButton.textContent = 'Buy Now';
    buyNowButton.onclick = checkout;
    cartItemsContainer.appendChild(buyNowButton);
}

// Function to proceed to checkout
function checkout() {
    const address = prompt("Please enter your address:");
    const phoneNumber = prompt("Please enter your phone number:");

    if (address && phoneNumber) {
        const confirmation = confirm(`Confirm your order:\nAddress: ${address}\nPhone: ${phoneNumber}`);
        if (confirmation) {
            // Here you would send data to the backend (using fetch or XMLHttpRequest)
            console.log("Order placed:", { address, phoneNumber, cart });
            alert("Order has been placed!");
            cart = []; // Clear the cart after order
            updateCartCount();
        }
    } else {
        alert("Order not placed. Please provide all required information.");
    }
}

// Function to handle product clicks and show product details
function showProductDetails(product) {
    // Navigate to product details page
    window.location.href = `shirt-details.html?productId=${product.id}`;
}

// Example product data (to be replaced with real data from your server or database)
const products = [
    { id: 1, name: 'Shirt 1', price: 700 },
    { id: 2, name: 'Shirt 2', price: 700 },
    // Add more products as needed
];

// Event listeners (if necessary)
document.addEventListener('DOMContentLoaded', () => {
    // Example of displaying cart items on cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }

    // Add click events to product buttons (example)
    products.forEach((product) => {
        const addButton = document.getElementById(`add-to-cart-${product.id}`);
        if (addButton) {
            addButton.onclick = () => addToCart(product);
        }
    });
});