const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: function(req, res, next) {

		let data = products.reduce(function (result, product) {
		  if (product.category == 'visited') {
			result.visited.push(product);
		  } else {
			result.inSale.push(product);
		  }
		  return result;
		}, { inSale: [], visited: [], toThousand: toThousand });
  
		  res.render('index', data);
		},
	search: (req, res) => {
		let resultados = [];
		var busqueda = req.query.keywords;
		let resultado = {};
		products.forEach(producto => {
			if(producto.name.includes(req.query.keywords)) {
				resultados.push(producto);
			}
	});

		//resultado = products.find(producto => producto.name == req.query.keywords);

		/*function search(palabras, productos){
			for (var i=0; i < products.length; i++) {
				if (products[i].name === busqueda) {
					return products[i];
				}
			}
		}
		resultado = search(busqueda, products);
		*/
		console.log(resultados);
		
		let cantidad = 0;
		if (resultados == undefined) {
			cantidad = 0;
		} else cantidad = resultados.length;

		res.render('results', {producto: resultado, toThousand: toThousand, cantidad: cantidad});
		}
	
};

module.exports = controller;
