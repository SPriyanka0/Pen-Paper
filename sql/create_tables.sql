create table users (
    user_id  varchar(8) primary key,
    username varchar(50) not null,
    user_email varchar(255) unique not null,
    user_password varchar(50) not null,
    user_type enum('admin','customer') not null,
    user_first_login timestamp default current_timestamp
);

create table categories(
    category_id varchar(8) primary key,
    category_name varchar(50) not null
);

create table products(
    product_id varchar(8) primary key,
    product_name varchar(50) not null,
    product_desc varchar(255),
    product_imageURL varchar(255),
    product_price numeric(10,2) not null,
    product_quantity int not null,
    category_id varchar(8),
    foreign key (category_id) references categories (category_id) on delete set null
);

create table carts(
    cart_id varchar(8) primary key,
    cart_status enum('active','closed','checked_out') not null,
    user_id  varchar(8),
    cart_create_date  timestamp default current_timestamp,
    foreign key (user_id) references users (user_id) on delete set null
);
create table cartproducts(
    cart_product_id varchar(8) primary key,
    item_quantity varchar(8) not null,
    cart_id varchar(8),
    product_id varchar(8),
    foreign key (cart_id) references carts (cart_id) on delete set null,
    foreign key (product_id) references products (product_id) on delete set null
); 




