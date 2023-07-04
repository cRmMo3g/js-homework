function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;
  
    cartItemsContainer.innerHTML = '';
  
    cartItems.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <h3>${item.title}</h3>
        <p>Price: ${item.price} eur</p>
          <button onclick="removeItem(${index})">Dzēst preci</button>
      `;
      cartItemsContainer.appendChild(itemElement);
      totalPrice += item.price * item.count;
    });
  
    totalPriceElement.textContent = `Kopējā summa: ${totalPrice} eur`;
  }
  
  
  function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
  }
  
  function goToShop() {
    window.location.href = 'index.html';
  }
  
  window.onload = function () {
    displayCartItems();
  };
  