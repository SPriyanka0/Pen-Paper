

document,addEventListener('DOMContentLoaded',()=>{
    //add form
const addProductFrorm = document.getElementById('addProductFrorm');
addProductFrorm.addEventListener('submit',addOneProduct);
});

function addOneProduct(event){
    //
    event.preventDefault();

    const newProduct = {
        product_id: document.getElementById("productId").value,
        product_name: document.getElementById("productName").value,
        product_desc: document.getElementById("productDesc").value,
        product_price: document.getElementById("productPrice").value,
        product_quantity: document.getElementById("productQuantity").value,
        product_imageURL: document.getElementById("productImageURL").value,
        category_id: document.getElementById("productCategory").value,
    };
    fetch('/api/products',{method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(newProduct),
    }).then((response)=>{
        //add 
        response.text();
        
    }).catch((error)=>console.error("error adding product",error));


}