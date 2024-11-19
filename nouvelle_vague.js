// Evento de clique no botão de pesquisa
document.getElementById('searchButton').addEventListener('click', function() {
    realizarBusca();
});

// Evento de tecla pressionada no campo de entrada de pesquisa
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        realizarBusca();
    }
});

// Função para realizar a busca
function realizarBusca() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();

        if (productName.includes(searchTerm)) {
            product.style.display = 'block'; // Exibe o produto
        } else {
            product.style.display = 'none'; // Oculta o produto
        }
    });
}

// Evento de clique no botão de categoria
document.getElementById('categoryButton').addEventListener('click', function() {
    const dropdown = document.getElementById('genreDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Filtra os produtos com base no estilo musical selecionado
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const selectedGenre = this.getAttribute('data-genre');
        const products = document.querySelectorAll('.product');

        document.getElementById('categoryButton').textContent = this.textContent;
        document.getElementById('genreDropdown').style.display = 'none';

        products.forEach(product => {
            const productGenre = product.getAttribute('data-genre');
            if (selectedGenre === "todos" || productGenre === selectedGenre) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

// Oculta o dropdown se o usuário clicar fora dele
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('genreDropdown');
    const categoryButton = document.getElementById('categoryButton');
    if (!dropdown.contains(event.target) && event.target !== categoryButton) {
        dropdown.style.display = 'none';
    }
});
// Adiciona um evento de clique à logo
document.getElementById('logo').addEventListener('click', function() {
    location.reload(); // Recarrega a página
});
// Abre o modal de login
document.querySelector('.user-icon').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'block';
});

// Fecha o modal de login
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
});

// Função de login simulada
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        showNotification('Login bem-sucedido!');
        document.getElementById('loginModal').style.display = 'none';
    } else {
        showNotification('Usuário ou senha incorretos!');
    }
});

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target == document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
}
// Selecionar elementos
const cartModal = document.getElementById('cartModal');
const cartIcon = document.getElementById('cartIcon');
const closeCartButton = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cartItems');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutButton = document.getElementById('checkoutButton');
const cartSubtotal = document.getElementById('cartSubtotal');

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.opacity = '1';
    notification.style.visibility = 'visible';

    // Esconder a notificação após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.visibility = 'hidden';
    }, 3000);
}

let cart = [];

// Função para abrir o modal do carrinho
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartSubtotal();
});

// Função para fechar o modal do carrinho
closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Função para adicionar produto ao carrinho (com notificação personalizada)
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const productName = product.getAttribute('data-name');
        const productPrice = parseFloat(product.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCartItems();
        showNotification(`${productName} foi adicionado ao seu carrinho!`);
    });
});

// Função para atualizar os itens no carrinho
function updateCartItems() {
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <div>
                <p style="display: inline;">R$${item.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-name="${item.name}">
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Adicionar evento aos inputs de quantidade
    const quantityInputs = document.querySelectorAll('.item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const name = event.target.getAttribute('data-name');
            const quantity = parseInt(event.target.value);
            const product = cart.find(item => item.name === name);
            if (product) {
                product.quantity = quantity;
                updateCartSubtotal();
            }
        });
    });

    updateCartSubtotal();
}

// Função para atualizar o subtotal do carrinho
function updateCartSubtotal() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartSubtotal.innerText = `Subtotal: R$${subtotal.toFixed(2)}`;
}

// Função para finalizar compra (com notificação personalizada)
checkoutButton.addEventListener('click', () => {
    cart = []; // Limpar o carrinho
    updateCartItems();
    cartModal.style.display = 'none';
    showNotification('Compra finalizada com sucesso!');
});
