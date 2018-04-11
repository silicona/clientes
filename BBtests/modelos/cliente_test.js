QUnit.module('Modelo Cliente', function(hooks){
	
	hooks.beforeEach( function( assert ){

		var Cliente = window.Base.Modelo.Cliente;
		assert.ok( ! _.isUndefined(Cliente), 'El Modelo está definido' );

			// Se comprueba que es Backbone por los metodos propios
		assert.ok( _.isFunction( Cliente.prototype.fetch ) && _.isFunction( Cliente.prototype.sync ), 'El Cliente es Modelo Backbone' );
// url: function(){
// 				return this.id ? 'clientes_bd.php?id=' + this.id : 'clientes_bd.php';
// 			},


		//Cliente.url = '../' + Cliente.url

	});

	QUnit.test( 'El Modelo ', function( assert ){

		assert.ok( Cliente.url == "clientes_bd.php", 'Cliente sin id no envia Query' );

	});
});