QUnit.module( 'models/control-color.js', function() {

  QUnit.test( 'El Control Color existe y es un modelo Backbone', function( assert ) {

     var Model = window.ControlColor;

     	// Test verde con linea 1 de ../models/control-color.js
     assert.ok( ! _.isUndefined( Model ), 'modelo esta definido' );

     	// Test Verde al incluir la referencia a Backbone en la definicion del modelo
     assert.ok(_.isFunction(Model.prototype.fetch ) && _.isFunction( Model.prototype.sync ), 'modelo es un modelo Backbone');

  } );


  QUnit.test( 'Model has required properties', function( assert ) {
    var model = new window.ControlColor();

    	// Test verde al incluir defaults en el modelo
    assert.ok( model.has( 'options' ), 'model has "options" property' );
    assert.ok( _.isArray( model.get( 'options' ) ), '"options" is array' );

    assert.ok( model.has( 'checked' ), 'model has "checked" options property' );
    assert.ok( _.isArray( model.get( 'checked' ) ), '"checked" options is array' );

    	// Test verde al incluir la opcion 'all' en el array options
    assert.ok( _.contains( model.get( 'options' ), 'all' ), 'options property contains "all" option' );
  } );

  	// Test de comprobacion de inicializacion
  QUnit.test( 'El modelo es instanciado con las opciones correctas', function( assert ) {

    var model, options;

    model = new window.ControlColor( {
       options: [ 'red', 'green', 'blue' ]
    } );
    options = model.get( 'options' );

    	// Test verde con metodo initialize del modelo
    /*
    assert.ok( _.contains( options, 'red' ), '"options" contains "red"' );
    assert.ok( _.contains( options, 'green' ), '"options" contains "green"' );
    assert.ok( _.contains( options, 'blue' ), '"options" contains "blue"' );
    assert.ok( _.contains( options, 'all' ), '"options" contains "all"' );
    */

    	// Factorizacion de los ok previos
    assert.notOk( _.isEmpty( options ), '"options" is not empty' );
    	// _.difference compara el array actuala y el esperado
  	assert.deepEqual( _.difference( options, [ 'all', 'red', 'green', 'blue' ] ), [], '"options" array match the expectations' );
  } );


  	// Test para Checked
  QUnit.test( 'Checked array is handled properly', function( assert ) {
    var model;

    model = new window.ControlColor();
     	// Verde al incluir 'all' en array checked de defaults
    assert.deepEqual( model.get( 'checked' ), [ 'all' ], '"all" option is checked by default' );

    model = new window.ControlColor( {
		   checked: [ 'red', 'green' ]
		} );
		 
		assert.notOk( _.isEmpty( model.get( 'checked' ) ), '"checked" is not empty' );
		 
		assert.deepEqual( _.difference( model.get( 'checked' ), [ 'red', 'green' ] ), [], 'default options are checked as expected' );

		 	// Añadiendo el tercer elemento al array
		model.set( 'checked', [ 'all', 'red', 'green' ] );

		 	// Verde con updateChecked del model
		assert.deepEqual( model.get( 'checked' ), [ 'all' ], '"all" options unchecks other ones');

		model.set( 'checked', [ 'all', 'blue' ] );

  		// Verde con if interior de actualizarCheck
  	assert.deepEqual( model.get( 'checked' ), [ 'blue' ], '"all" option is removed if it is passed once again' );

  } );

} );