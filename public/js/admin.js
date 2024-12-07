


document.addEventListener('DOMContentLoaded',()=>{
    loadProductsTable();
    displayEditForm(false);

    document.getElementById('cancelEdit').addEventListener('click',()=>{displayEditForm(false)});
    
});

function loadProductsTable(){
    fetch('/api/products').then((response)=>response.json()).then((data)=>{
        const table = document.querySelector('#productsTable  tbody');
        table.innerHTML="";
        data.forEach((product)=>{
            const tableRow = document.createElement("tr");
            tableRow.innerHTML=`
            <td>${product.product_name}</td>
            <td>${product.product_desc}</td>
            <td>${product.product_price}</td>
            <td>${product.product_quantity}</td>
            <td>${product.category_id}</td>
            <td>
            
             <button class="btn btn-warning" onClick="removeProoduct('${product.product_id}')">
            remove
            </button> 
            <button class="btn btn-primary" onClick="editProoduct('${product.product_id}')" >Edit</button>
            </td>
            `;
            table.appendChild(tableRow);
        });
    }).catch((error)=> console.error("error finding products",error));
}

function removeProoduct(productId){
    fetch(`/api/products/${productId}`,{method:'DELETE',}).then((response)=>{
        loadProductsTable(); //reload...
    }).catch((error)=>console.error('error deleting product',error));
}

function displayEditForm(boolean){
    const showDiv = document.getElementById('showDiv');
    showDiv.style.display = boolean ? 'block' : 'none';
}

function editProoduct(productId){
    displayEditForm(true);

    fetch(`/api/products/${productId}`).then((response)=>response.json()).then((product)=>{
         document.getElementById("editName").value = product.product_name,
         document.getElementById("editDesc").value = product.product_desc,
         document.getElementById("editPrice").value = product.product_price,
         document.getElementById("editQuantity").value = product.product_quantity,
     document.getElementById("editImageURL").value = product.product_imageURL,
     document.getElementById("editCategory").value = product.category_id;

     document.getElementById('editProductbyID').onsubmit = function(event){
        event.preventDefault();
        
    const update = {
        // product_id: document.getElementById("editId").value,
         product_name: document.getElementById("editName").value,
         product_desc: document.getElementById("editDesc").value,
         product_price: document.getElementById("editPrice").value,
         product_quantity: document.getElementById("editQuantity").value,
         product_imageURL: document.getElementById("editImageURL").value,
         category_id: document.getElementById("editCategory").value,
     };
     fetch(`/api/products/${productId}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(update),
    }).then((response)=>{
        loadProductsTable();
       displayEditForm(false);
    }).catch((error)=>console.error('error updating product',error));

     };
    }).catch((error)=>console.error('error edit product',error));

   
}