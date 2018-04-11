QUnit.module( 'Vista de inicio', function( hooks ) {

	var vista, 
		$ = jQuery,
		contenedor,
		fixture = $('#qunit-fixture');

	hooks.beforeEach( function( assert ){

		var Vista = window.Base.Vista.Inicio;
		assert.ok( ! _.isUndefined( Vista ), 'Vista Inicio definida' );
		assert.ok( _.isFunction(Vista.prototype.setElement ) && _.isFunction( Vista.prototype.delegateEvents ), 'La vista es Backbone');
	
		contenedor = $('<div class="pizarra">Vacia</div>');
		fixture.append( contenedor );

		coleccion = new window.Base.Coleccion
		vista = new Vista({});

		vista.render();
	});
	
	QUnit.test( 'La vista de inicio recibe el listado de clientes', function( assert ){

		assert.ok( contenedor.find(''))

	});

});