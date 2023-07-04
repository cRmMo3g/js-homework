
async function fetchShopItems() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }

  async function displayShopItems() {
    const shopItemsContainer = document.getElementById('shopItems');
    const shopItems = await fetchShopItems();
  
    shopItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('product');
      itemElement.innerHTML = `
        <h3>${item.title}</h3>
        <p><img width=" 50%" height="100px"src="${item.thumbnail}"/></p>
        <p>${item.description}</p>
        <p>Cena: ${item.price} eur</p>
        <button onclick="addToCart('${item.title}', ${item.price})">Pievienot</button>
        <span id="${item.id}-count" class="item-count"></span>
      `;
      shopItemsContainer.appendChild(itemElement);
    });
  }
  
  function addToCart(title, price) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItem = cartItems.find(item => item.title === title);
  
    if (existingItem) {
      existingItem.count += 1;
    } else {
      cartItems.push({ title, price, count: 1 });
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
  }
  
  function updateCartCount() {
    const cartButton = document.getElementById('cartButton');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalCount = 0;
  
    cartItems.forEach(item => {
      totalCount += item.count;
    });
  
    if (totalCount > 0) {
      cartButton.innerText = `Doties uz grozu (${totalCount})`;
    } else {
      cartButton.innerText = 'Doties uz grozu';
    }
  }
  
  function goToCart() {
    window.location.href = 'cart.html';
  }
  
  window.onload = function () {
    displayShopItems();
    updateCartCount();
  };
  