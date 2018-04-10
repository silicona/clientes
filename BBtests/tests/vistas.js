QUnit.module( 'js/funciones.js', function() {

	QUnit.test( 'La vista de inicio existe y es de Backbone', function( assert ){

		var vista_inicio = window.Base.Vista.Inicio;

		assert.ok( ! _.isUndefined( vista_inicio ), 'Vista Inicio definida' );

		//assert.ok( _.isFunction(Model.prototype.fetch ) && _.isFunction( Model.prototype.sync ), 'modelo es un modelo Backbone');


	});

});