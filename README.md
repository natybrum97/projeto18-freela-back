## Detachment App - MeCansei!

This back-end project is a detachment network, where people can advertise items for sale that they no longer need.

### About the Project

Some project features:

1) User registration;
2) User Login;
3) Registration of product for sale;
4) Remove products that were for sale;
5) Add product to cart;
6) Remove specific product or all products from the cart;
7) Filter products by category;
8) Make product purchases.

### Deployment link

- https://freela-api-vkkh.onrender.com/

### Technologies Used

For this project, the following technologies were used:

- Node (versão 18.16.0);
- Express;
- Javascript;
- Postgres.

### How it Works

This project is a REST API to serve a product detachment app. It has the following entities:

For the `cart` entity, four routes were created:

- POST `/carrinho`: Records cart information;
- GET `/carrinho`: Returns all products in the cart;
- DELETE `/carrinho/:id`: Deletes a specific product from the cart;
- DELETE `/carrinho`: Delete everything from cart.

For the `users` entity, two routes were created:

- POST `/signup`: Registers user registration information in the database;
- POST `/signin`: Registers user login information in the database.

For the `shopping` entity, only one route was created:

- POST `/compra`: Registers the user's purchase.

For the `products` entity, ten routes were created:

- GET `/catalogo`: Returns all available products;
- GET `/produtos/categoria/:categoria`:returns products by category;
- GET `/catalogoUser`: Returns the products published by the user;
- GET `/catalogo/:id`: Select a product by its id;
- GET `/pegaPorIdNaCopia/:id`: Select a product by its ID in the copy;
- DELETE `/deletaproduto/:id`: Deletes a specific product;
- POST `/check`: Saves the states of each check box;
- GET `/check`: Returns the states of each check box;
- DELETE `/excluir`: Deletes products that were sold from the website and products from the customer's cart as soon as the sale is made;
- PUT `/check`: Updates the check box state if it is updated.

### How to Run

1. Clone this repository.

2. Install all dependencies with the command:

```bash
npm i

```
3. Create the local database through the terminal or pgAdmin and then create the tables following the information present in the dump.sql file present in the project root.

4. Configure the .env file using the .env.example file:

    - Username: Database username.
    - Password: Database password.
    - Host: Database host address (e.g. localhost).
    - Port: Database port (e.g. 5432 for PostgreSQL).
    - Database_name: Name of the database.

5. Run the backend in a development environment:

```bash
npm start
```
