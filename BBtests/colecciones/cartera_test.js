QUnit.module('Coleccion Cartera', function(hooks){

	var cartera,
		$ = jQuery;

	
	hooks.beforeEach( function( assert ){

		var Cartera = window.Base.Coleccion.Cartera;
		assert.ok( ! _.isUndefined(Cartera), 'La coleccion está definida' );

			// Se comprueba que es Backbone por los metodos propios
		assert.ok( _.isFunction( Cartera.prototype.fetch ) && _.isFunction( Cartera.prototype.sync ), 'La Cartera es Coleccion Backbone' );
// url: function(){
// 				return this.id ? 'clientes_bd.php?id=' + this.id : 'clientes_bd.php';
// 			},


		//Cliente.url = '../' + Cliente.url

		cartera = new Cartera();

	});

	QUnit.test( 'La Cartera recibe a todos los clientes', function( assert ){

		assert.ok( cartera.url == "clientes_bd.php", 'Cartera está direccionado a la BD' );
		cartera.url = '../clientes_bd.php'
		//assert.ok( cartera.url == "../clientes_bd.php", 'Cartera está direccionado a la BD' );
	
		cartera.fetch;
		assert.ok(  );
	});
});