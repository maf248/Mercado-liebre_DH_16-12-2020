const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products: products, toThousand: toThousand});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		var precioFinal = products[req.params.id -1].price - products[req.params.id -1].price / 100 * products[req.params.id -1].discount;
		precioFinal = toThousand(parseInt(precioFinal));

		res.render('detail', {producto: products[req.params.id -1], precioFinal: precioFinal, toThousand: toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		products.push({
			"id": products.length + 1,
			"name": req.body.name,
			"price": req.body.price,
			"discount": req.body.discount,
			"category": req.body.category,
			"description": req.body.description,
			"image": "none"
		   });
		
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form', {productToEdit: products[req.params.id -1]});
	},
	// Update - Method to update
	update: (req, res) => {
		products[req.params.id -1].name = req.body.name;
		products[req.params.id -1].price = req.body.price;
		products[req.params.id -1].discount = req.body.discount;
		products[req.params.id -1].category = req.body.category;
		products[req.params.id -1].description = req.body.description;
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		delete products[req.params.id -1];
		res.redirect('/products');
	}
};

module.exports = controller;