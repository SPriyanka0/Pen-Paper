# Pen-Paper

Welcome to the **Pen & Paper** website!

This repository was created for CSC 372: Web Development 
class's term project, to create a simple online store.

My project will sell stationary Items.

## Pages
1. Home Page
2. Products Page
3. About Page(Our Story) 
4. Shopping Cart Page 
5. Log-in/Sign-in 
6. Profile Page 
7. Admin Dashboard 
    - Product Edit page - allows admins to modify details of a product
    - Product Listing page - for each product admins can delete, archive, edit
    - Bulk Upload page - an admin user can select a file with bulk product data
## Technologies Used
- HTML
- CSS
- Bootstrap
- JavaScript
- Node.js
- Express.js
- MySQL
- CORS
- Body Parser
- DBeaver

##Before  running: 
- Node.js
  
  # installs fnm (Fast Node Manager)
winget install Schniz.fnm

# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression

# download and install Node.js
fnm use --install-if-missing 22

# verifies the right Node.js version is in the environment
node -v # should print `v22.12.0`

# verifies the right npm version is in the environment
npm -v # should print `10.9.0`

- MySQL
https://dev.mysql.com/downloads/installer/ 
- npm
npm i dotenv

#To Run
node server.js 
