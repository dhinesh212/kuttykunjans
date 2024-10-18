let cart = [];

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
async function addToCart(product) {
    cart.push(product);
    alert(`${product.name} has been added to your cart.`);
    updateCartCount();
    saveCart(); // Save the updated cart
}

// Modify checkout to send order to the backend
async function checkout() {
    const address = prompt("Please enter your address:");
    const phoneNumber = prompt("Please enter your phone number:");

    if (address && phoneNumber) {
        const confirmation = confirm(`Confirm your order:\nAddress: ${address}\nPhone: ${phoneNumber}`);
        if (confirmation) {
            // Prepare order data to send to the backend
            const orderData = {
                userId: '123', // Replace with the actual user ID if needed
                productId: cart.map(item => item.id), // Assuming cart items have an id field
                quantity: cart.map(item => item.quantity || 1), // Assuming each product has a quantity field, defaulting to 1
            };

            try {
                const response = await fetch('/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    console.log("Order placed successfully");
                    alert("Order has been placed!");
                    cart = []; // Clear the cart after order
                    updateCartCount();
                    saveCart(); // Clear cart from localStorage
                } else {
                    alert("There was a problem placing your order. Please try again.");
                }
            } catch (err) {
                console.error("Error placing order:", err);
                alert("There was an error processing your order. Please try again.");
            }
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