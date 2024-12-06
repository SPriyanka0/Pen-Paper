const express = require('express'); //server
const mysql = require('mysql2'); //db handing
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

//db connect
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9898',
    database: 'pen_paper',
    port:3306,
});

//check connection
db.connect((err) =>{
    if(err) {
        console.error('error cnnecting to db: ', err.message);
        return;
    }
    console.log('connected to db');
});

//products - get
app.get('/api/products', (req,res)=>{
    db.query('SELECT * FROM products', (err,results) => {
        if(err){
            return res.status(500).send('error getting ALL products');
        }
        res.json(results);
    });
});

app.get('/api/products/:id', (req,res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE product_id = ? ' , [id] , (err,result) =>{
        if(err) {
            return res.status(500).send('error getting product by id');
        }
        if(result.length > 0 ){
            res.json (result[0]);
        }else{
            res.status(404).send('product not found?');
        }
    });
});


//product - post
app.post('/api/products', (req,res) => {
    const{product_name, product_desc,product_imageURL,product_price, product_quantity, category_id} = req.body;

    const sql = ` INSERT INTO products (product_name, product_desc,product_imageURL,product_price, 
    product_quantity, category_id)
    VALUES (?,?,?,?,?,?)`;

    db.query(sql, [product_name, product_desc,product_imageURL,product_price, product_quantity, category_id], (err,result)=>{
        if(err) {
            return res.status(500).send('error adding product');
        }
        res.status(201).send('product added ');
    });
});

// products - put
app.put('/api/products/:id', (req,res)=>{
    const { id } = req.params;
    const{product_name, product_desc,product_imageURL,product_price, product_quantity, category_id} = req.body;
    const sql =` UPDATE products SET
    product_name = ?, 
    product_desc = ?,
    product_imageURL = ? ,
    product_price = ?,
    product_quantity = ?,
    category_id = ? 
    WHERE product_id = ? `;
    
    db.query(sql, [product_name, product_desc,product_imageURL,product_price, product_quantity, category_id,id], (err,result) =>{
        if(err) {
            return res.status(500).send('error updating');
        }
        if(result.affectedRows > 0){
            res.send(`product with id: ${id} updated`);
        }else{
            res.status(404).send('product nit found');
        }
    });
});

//prducts - delete
app.delete('/api/products/:id', (req,res) =>{
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE product_id = ?`;
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).send('error deleting product');
        }
        if(result.affectedRows>0){
            res.send('product  deleted');
        }else{
            res.status(404).send('product not found');
        }
    });
});

//cart - post 
app.post('/api/cart/:userId',(req,res)=>{
    const {userId} =req.params;
    const{productId,quantity} = req.body;

    const findCart = `SELECT * FROM carts WHERE user_id = ? AND cart_status = "active"`;
    db.query(findCart,[userId],(err, cartResult)=>{
        if(err){
            return res.status(500).send('error cart');
        }
        let cartId;
        if(cartResult.length >0 ){
            cartId = cartResult[0].cart_id;
        }else{
            const createCart = 'INSERT INTO carts (user_id, cart_status) VALUES (?, "active")';
            db.query(createCart,[userId],(err,cartResult)=>{
                if(err){
                    return res.status(500).send('error creating new cart');
                }
                cartId=createCart.insertId;
            }
        );
        }

        const addProducts =  `INSERT INTO cartproducts(cart_id,product_id,item_quantity) VALUES(?,?,?)
        ON  DUPLICATE KEY UPDATE item_quantity = item_quantity +?`;
        
        db.query(addProducts,[cartId,productId,quantity,quantity],(err,result)=>{
            if(err){
                return res.status(500).send('error adding toc art');
            }
            res.status(201).send('product added to cart');
        });
    });
    
});

//start server
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})
