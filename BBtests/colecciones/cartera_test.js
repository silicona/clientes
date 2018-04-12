QUnit.module('Coleccion Cartera', function(hooks){

	var cartera,
		$ = jQuery;

	
	hooks.beforeEach( function( assert ){

		var Cartera = window.Base.Coleccion.Cartera;
		assert.ok( ! _.isUndefined(Cartera), 'La coleccion está definida' );

			// Se comprueba que es Backbone por los metodos propios
		assert.ok( _.isFunction( Cartera.prototype.fetch ) && _.isFunction( Cartera.prototype.sync ), 'La Cartera es Coleccion Backbone' );

		cartera = new Cartera();

	});

	QUnit.test( 'La Cartera recibe a todos los clientes', function( assert ){

		assert.expect(8); // ¿Cuentan expect y async?
		test_ajax = assert.async(4);

		assert.ok( cartera.url == Base.Root + "clientes_bd.php", 'Cartera está direccionado a la BD' );
		assert.ok( _.size(cartera) == 0, 'Cartera vacia al inicio' );

		cartera.fetch();

		setTimeout( function(){

			assert.ok( _.size(cartera) > 0, 'La cartera tiene clientes' );
			test_ajax();

			var primer = cartera.at(0);

			assert.equal( primer.id, 1, 'El cliente tiene id 1');
			test_ajax();

			assert.ok( _.isFunction(primer.fetch), 'El cliente es Cliente');
			test_ajax();

			assert.equal( primer.keys().length, 9, 'El cliente tiene 9 atributos')
			test_ajax();

		}, 1000);

	});

	QUnit.test( "two async calls", function( assert ) {
	  
	  assert.expect( 4 );

	  var done1 = assert.async();
	  var done2 = assert.async();

	  setTimeout(function() {
	    assert.ok( true, "test resumed from async operation 1" );
	    done1();
	  }, 500 );

	  setTimeout(function() {
	    assert.ok( true, "test resumed from async operation 2" );
	    done2();
	  }, 150);

	});

});