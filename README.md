# BAKARIN BOSS
## Description
This is Website uses React JS for Developer Technical Test in Implementation Test - Frontend at Next JS.

## Technologies
### Frontend
- React JS
- HTML
- CSS
- JavaScript
### Backend
- Next JS

### Database or Data
- Local Storage
- No connection to Database!

## Folder Structure
- config
  - config.json
  - database.js
- components
  - app.module.css
  - Navbar.tsx
  - Footer.tsx
  - ShoppingCart
  - layout.tsx
- migrations
  - cart.js
  - order.js
  - orderProduct.js
  - products.js
- models
  - products.js
  - cart.js
  - order.js
  - orderProduct.js
- pages
  - api
    - cart.js
    - menuFavorite.js
    - order.js
    - orderProduct.js
    - products.js
  - _app.tsx
  - about.tsx
  - blog.tsx
  - cart.tsx
  - contact.tsx
  - index.tsx
  - menu.tsx
  - order-confirmationtsx
  - product.tsx
- public
  - template
- seeders
  - cart.js
  - order.js
  - orderProduct.js
  - products.js

## Demo *(in development)*
<b>Please wait.</b>

<details>
	<summary>Home Page</summary>
	
![Home Blank Page](public/assets/home.png)
</details>

<details>
	<summary>List Page</summary>
	
![List Page](public/assets/list.png)
</details>

<details>
	<summary>Animation</summary>
	
![Animation](public/assets/animation.png)
</details>

<details>
	<summary>Filter Todo</summary>
	
![Filter Todo](public/assets/filter.png)
</details>

## Installation
### Clone Repo

```bash
git clone https://github.com/GrahadiM/bakarin-boss.git
```
### Go to folder

```bash
cd bakarin-boss
```
### Install and build App with npm

```bash
npm install
```
and
```bash
npm run dev
```
### Run App

```bash
npm run start
```
### Push Migrate & Seeder

```bash
npx sequelize-cli db:migrate
```
```bash
npx sequelize-cli db:seed:all
```
