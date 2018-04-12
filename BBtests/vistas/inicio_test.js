QUnit.module( 'Vista de inicio', function( hooks ) {

	var vista, 
		$ = jQuery,
		contenedor,
		fixture = $('#qunit-fixture');

	hooks.beforeEach( function( assert ){

		var ajax = assert.async(1);

		var Vista = window.Base.Vista.Inicio;
		assert.ok( ! _.isUndefined( Vista ), 'Vista Inicio definida' );
		assert.ok( _.isFunction(Vista.prototype.setElement ) && _.isFunction( Vista.prototype.delegateEvents ), 'La vista es Backbone');
	
		contenedor = $('<div class="pizarra">Vacia</div>');
		fixture.append( contenedor );

		Coleccion = window.Base.Coleccion.Cartera;
		coleccion = new Coleccion();
		coleccion.fetch();

		setTimeout(function(){
			assert.ok( _.size(coleccion) > 0, 'Coleccion rellenada')
			ajax();
		}, 1000);
		
		vista = new Vista({ collection: coleccion });
		contenedor.append(vista.el);
		vista.render();

	});
	
	QUnit.test( 'La vista de inicio recibe el listado de clientes', function( assert ){

		assert.ok( contenedor.find('tr').length > 1, 'Hay clientes en la vista' );

	});

});