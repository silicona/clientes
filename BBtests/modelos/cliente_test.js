QUnit.module('Modelo Cliente', function(hooks){
	
	hooks.beforeEach( function( assert ){

		var Cliente = window.Base.Modelo.Cliente;
		assert.ok( ! _.isUndefined(Cliente), 'El Modelo está definido' );

			// Se comprueba que es Backbone por los metodos propios
		assert.ok( _.isFunction( Cliente.prototype.fetch ) && _.isFunction( Cliente.prototype.sync ), 'El Cliente es Modelo Backbone' );

		cliente = new Cliente();

	});

	QUnit.test( 'El Modelo ', function( assert ){

		var test_ajax = assert.async();

		assert.equal( cliente.url(), Base.Root + "clientes_bd.php", 'cliente sin id no envia Query' );

		cliente.id = 1;
		assert.equal( cliente.url(), Base.Root + "clientes_bd.php?id=1", 'cliente con id tiene url propia' );

		cliente.fetch();

		setTimeout( function(){

			assert.equal( cliente.has('nombre'), true, 'El cliente tiene nombre');
			test_ajax();

		})

	});
});