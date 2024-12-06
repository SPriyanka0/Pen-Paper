
      //displays product
      fetch('/api/products').then(response => response.json()).then(data=>{
        const productDiv = document.getElementById('products');
        
        data.forEach(product =>{
          const productElement = document.createElement('div');
          productElement.classList.add('col');
          productElement.innerHTML= `
          <div class="card">
          <img src="${product.product_imageURL}"alt="${product.product_name}img" class="card-img-top" style="max-width:300px;max-height:300px;">
          <div class="card-body">
          <h2 class="card-title"><strong> ${product.product_name} </strong></h2>
          <p class="card-text">${product.product_desc}</p>
          <p>Price:$ ${product.product_price}</p>

          <button class="btn btn-primary" onClick="viewDetails('${product.product_id}')">
          View Details </button>

          <button class="btn btn-primary" onClick="addToCart('${product.product_id}')">
          Add to Cart </button>
          <br>
          </div>
          </div>
          `;
          productDiv.appendChild(productElement);
        });
      }).catch(error=>console.error('error fetching products',error));

      //add to cart
      function addToCart(productId){
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item=> item.productId === productId);
        if(productIndex !== -1){
          cart[productIndex].quantity +=1;
        console.log('for now cart adds to quntiy like this');
        }else{
          cart.push({productId,quantity:1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
      }

      //send to product details page by id
      function viewDetails(productId){
        window.location.href = `/details.html?productId=${productId}`;
      }
    

      //load product by id

function loadProductDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if(productId){
        fetch(`/api/products/${productId}`).then(response =>response.json()).then(product => {
            if(product){
                const container = document.getElementById('product-details');
                container.innerHTML = `
                <div class="card">
                <img src="${product.product_imageURL}" alt="${product.product_name} image" class="img-fluid" style="max-width:300px;max-height:300px">
                <h2><strong>${product.product_name}</strong></h2>
                <p>${product.product_desc}</p>
                <p><strong>Price: ${product.product_price}</strong></p>
                <button class="btn btn-primary" onClick="addToCart(productId)">
                Add to Cart </button>
                </div>
                
                
                `;
            }else{
                container.innerHTML= `<h1> PRODUCT NOT FOUND :( </h1>`;
            }
        }).catch(error=>console.error('error fetching product details',error));
    }
}

