let cart = [];

function addToCart(item) {
    cart.push(item);
    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = `Cart (${cart.length})`;
}

function checkout() {
    // Implement checkout functionality here
    console.log('Checkout initiated');
}

function openSideMenu() {
    document.getElementById('sideMenu').style.width = '250px';
}

function closeMenu() {
    document.getElementById('sideMenu').style.width = '0px';
}