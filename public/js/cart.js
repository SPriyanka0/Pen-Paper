

document.addEventListener('DOMContentLoaded',loadCartItems());

function loadCartItems(){
    //hardcode..to be changed after user auth setup
    const userId=1;

    fetch(`/api/cart/${userId}`).then(response=>response.json()).then( cartItems =>{
            
            const cartContainer = document.querySelector('.list-group');

            if(cartItems.length === 0){
                cartContainer.innerHTML=`<p>empty</p>`;
                return;
            }
            let subtotal =0;

            cartItems.forEach(cartItem =>{
                const itemTotal = cartItem.product_price * cartItem.item_quantity;
                subtotal += itemTotal;
                const cartElement = document.createElement('li');
                cartElement.classList.add('list-group-items', 'd-flex', 'justify-content-between','lh-condensed');

                cartElement.innerHTML=`
                <div>
                <h6 class="my-0">${cartItem.product_name}</h6>
                <img src="${cartItem.product_imageURL}" alt="${cartItem.product_name}" class="card-img-top" style"max-width:100px;">
                <p>Price: $ ${cartItem.product_price}</p>
                <a href="#" class="remove" onClick="removeFromCart(${cartItem.cart_product_id})"Remove</a>
                </div>
                <span class="text-muted">$ ${itemTotal.toFixed(2)} </span>
                `;

                cartContainer.appendChild(cartElement);

                document.querySelector('.subtotal').innerText=`$ ${subtotal.toFixed(2)}`;
                const tax = subtotal*0.0675;
                document.querySelector('.tax').innerText =`$ ${tax.toFixed(2)}`;
                document.querySelector('.total').innerText=`$ ${(subtotal+tax).toFixed(2)}`;
            });
        }
    ).catch(error=>console.error('error loading cart',error));
    
}

function addToCart(productId){
    //hardcode..to be changed after user auth setup
    const userId=1;
    const quantity=1;
    fetch(`/api/cart/${userId}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({productId,quantity})
    }).then(response => {
        //added to cart?
    }).catch(error=>console.error('error adding to cart',error));
}

function removeFromCart(cartProductId){
    fetch(`/api/cart/item/${cartProductId}`,{
        method: 'DELETE'
    }).then(response=> {
        if(response.ok){
            location.reload();
        }else{
            console.log('failed to remove from cart');
        }
    }).catch(error => console.error('error removing from cart',error));
}