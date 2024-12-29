// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.querySelectorAll('.product, .innovation, .item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Navigation bar transparency effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scrolled');
    } else {
        nav.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Product hover effect
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    
    product.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;
    
    nav.querySelector('.nav-content').appendChild(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
    });
};

createMobileMenu();

// Add to cart animation
const addToCartAnimation = (event) => {
    const circle = document.createElement('div');
    circle.classList.add('click-circle');
    circle.style.left = `${event.clientX}px`;
    circle.style.top = `${event.clientY}px`;
    document.body.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 1000);
};

document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', addToCartAnimation);
});

// Shopping Cart Functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');

// Create cart modal
const createCartModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('cart-modal');
    modal.innerHTML = `
        <h2>Your Cart</h2>
        <div class="cart-items"></div>
        <div class="cart-total">Total: $0.00</div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
    document.body.appendChild(modal);

    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.body.appendChild(overlay);

    return { modal, overlay };
};

const { modal, overlay } = createCartModal();

// Create notification
const createNotification = () => {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    document.body.appendChild(notification);
    return notification;
};

const notification = createNotification();

// Show notification
const showNotification = (message, duration = 3000) => {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
};

// Update cart display
const updateCartDisplay = () => {
    cartCount.textContent = cart.length;
    const cartItems = modal.querySelector('.cart-items');
    const cartTotal = modal.querySelector('.cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        const product = {
            name: this.dataset.product,
            price: this.dataset.price
        };
        cart.push(product);
        updateCartDisplay();
        showNotification(`${product.name} added to cart!`);
        addToCartAnimation(event);
    });
});

// Shop now buttons
document.querySelectorAll('.shop-now').forEach(button => {
    button.addEventListener('click', function() {
        showNotification('Coming soon! Stay tuned for our collection.');
    });
});

// Cart icon click handler
document.querySelector('.cart-icon').addEventListener('click', () => {
    modal.classList.add('active');
    overlay.classList.add('active');
});

// Close modal when clicking overlay
overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
});

// Checkout button handler
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Thank you for your purchase! Order confirmed.');
    cart = [];
    updateCartDisplay();
    modal.classList.remove('active');
    overlay.classList.remove('active');
});
