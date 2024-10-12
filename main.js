// Function to load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Modify addToCart to save the cart after adding an item
function addToCart(product) {
    cart.push(product);
    alert(`${product.name} has been added to your cart.`);
    updateCartCount();
    saveCart(); // Save the updated cart
}

// Modify checkout to clear the cart in localStorage as well
function checkout() {
    const address = prompt("Please enter your address:");
    const phoneNumber = prompt("Please enter your phone number:");

    if (address && phoneNumber) {
        const confirmation = confirm(`Confirm your order:\nAddress: ${address}\nPhone: ${phoneNumber}`);
        if (confirmation) {
            console.log("Order placed:", { address, phoneNumber, cart });
            alert("Order has been placed!");
            cart = []; // Clear the cart after order
            updateCartCount();
            saveCart(); // Clear cart from localStorage
        }
    } else {
        alert("Order not placed. Please provide all required information.");
    }
}

// Call loadCart when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});