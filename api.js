//  Set Product cart Count in Navbar Section 
let cartCount = 0;

function addToCart() {
  cartCount += 1;
  document.getElementById('cart-count').innerHTML = cartCount;
  console.log(cartCount);
}

// Trending Products
const loadtranding = () => {
  
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      const topRated = data
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 3);  

      loadingdisplay(topRated);
    })
    
};



//  Category Buttons 
const buttonload = () => {
  
  fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json())
    .then((data) => displaybutton(data))
    
};

// Display category buttons dekhano 
const displaybutton = (categories) => {
  const btncontainer = document.getElementById('Product-btn');
  btncontainer.innerHTML = "";

  categories.forEach((category, index) => {
    const btn = document.createElement("button");

    btn.innerText = category;
    btn.className =
      "px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition";

    btn.id = `category-btn-${index}`;

    btn.onclick = () => {
      
      const allButtons = btncontainer.querySelectorAll('button');
      allButtons.forEach(b => b.classList.remove('bg-orange-800', 'font-bold'));

     
      btn.classList.add('bg-orange-400', 'font-bold');

      
      filterByCategory(category);
    };

    btncontainer.appendChild(btn);
  });

  
};


// Fetch products by category
const filterByCategory = (category) => {
    
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => displayProductCards(data))
    .catch(err => console.log(err));
      
};

//  Display Products 
const AllProduct = () => {
       

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProductCards(data))
     
};

// jodi kono Product na thake tahoel 
const displayProductCards = (products) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (!products || products.length === 0) {
    cardContainer.innerHTML = `
      <div class="col-span-full flex flex-col items-center text-center p-10 rounded-xl">
        <img src="./error.webp" alt="">
        <p class="text-red-600">
          No products found.
        </p>
      </div>
    `;
    return;
  }

  products.forEach((product) => {
    const carddiv = document.createElement("div");

    carddiv.innerHTML = `
      <div class="bg-white rounded-2xl shadow-md p-4 m-2">

        <!-- Product Image -->
        <div class="bg-gray-100 rounded-xl p-6 flex justify-center">
          <img src="${product.image}" class="h-48 object-contain" />
        </div>

        <!-- Category + Rating -->
        <div class="flex justify-between items-center mt-4">
          <span class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            ${product.category}
          </span>

          <div class="flex items-center text-gray-600 text-sm">
            <i class="fa-regular fa-star"></i> ${product.rating.rate} (${product.rating.count})
          </div>
        </div>

        <!-- Title -->
        <h2 class="mt-3 font-semibold text-lg text-gray-800">
          ${product.title}
        </h2>

        <!-- Price -->
        <p class="text-2xl font-bold mt-2">
          $${product.price}
        </p>
<!-- Buttons -->
        <div class="flex gap-3 mt-4">
          <button onclick="adcardDetail(${product.id})" class="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <i class="fa-solid fa-eye"></i> Details
          </button>

          <button onclick="addToCart()" class="flex-1 bg-blue-700 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:opacity-90">
            <i class="fa-solid fa-cart-arrow-down" id="cart-btn"></i> Add
          </button>
        </div>
    </div>
    `;

    cardContainer.appendChild(carddiv);
  });
};

// Product  Modal SEction 
  
const adcardDetail = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    displaycarddetailes(data);
  } catch (err) {
    console.log(err);
  }
};

//  Display Product Details in Modal 
const displaycarddetailes = (product) => {
  const detailsbox = document.getElementById("details-container");

  detailsbox.innerHTML = `
  
    <img src="${product.image}" 
         class="w-48 h-48 mb-4 rounded-lg"/>
           <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
    <p><strong>Price:</strong> $${product.price}</p>
    <p><strong>Category:</strong> ${product.category}</p>
    <p class="max-h-40 overflow-y-auto"><strong>Description:</strong> ${product.description}</p>
    <p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count})</p>
  `;

  document.getElementById("my_modal_5").showModal();
};

// Trending Product Cards 
const loadingdisplay = (items) => {
   

  const container = document.getElementById("trading-product");
  container.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="bg-white rounded-2xl shadow-md p-4 m-2">

        <!-- Product Image -->
        <div class="bg-gray-100 rounded-xl p-6 flex justify-center">
          <img src="${item.image}" class="h-48 object-contain" />
        </div>

        <!-- Category + Rating -->
        <div class="flex justify-between items-center mt-4">
          <span class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            ${item.category}
          </span>

          <div class="flex items-center text-gray-600 text-sm">
            <i class="fa-regular fa-star"></i> ${item.rating.rate} (${item.rating.count})
          </div>
        </div>

        <!-- Title -->
        <h2 class="mt-3 font-semibold text-lg text-gray-800">
          ${item.title}
        </h2>

        <!-- Price -->
        <p class="text-2xl font-bold mt-2">
          $${item.price}
        </p>

        <!-- Buttons -->
        <div class="flex gap-3 mt-4">
          <button onclick="adcardDetail(${item.id})"
                  class="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <i class="fa-solid fa-eye"></i> Details
          </button>
<button onclick="addToCart()" class="flex-1 bg-gradient-to-r bg-blue-700 from-indigo-600 to-purple-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:opacity-90">
            <i class="fa-solid fa-cart-arrow-down" id="cart-btn"></i> Add
          </button>
        </div>

      </div>
    `;

    container.appendChild(div);
  });
};


loadtranding();
buttonload();
AllProduct();


































