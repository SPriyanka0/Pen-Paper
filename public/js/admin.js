

document.addEventListener('DOMContentLoaded',()=>{
    loadProductsTable();
    
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
            <td> <button>remove</button> <button>edit</button></td>
            `;
            table.appendChild(tableRow);
        });
    }).catch((error)=> console.error("error finding products",error));
}