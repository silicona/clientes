QUnit.module( 'views/control-color.js', function( hooks ) {

		//Anulado para Factorizar con el hook beforeEach
 //  QUnit.test( 'Color control view exists and is Backbone view', function( assert ) {
 //     var View = window.ControlColorView;

 //     assert.ok( ! _.isUndefined( View ), 'View is defined' );
 //     assert.ok( _.isFunction( View.prototype.setElement ) && _.isFunction( View.prototype.delegateEvents ), 'View is Backbone view' );

 //  } );

	// QUnit.test( 'Color control view renders markup as expected', function( assert ) {
	//   var view, model;

	//   // Create container element in QUnit's fixture.
	//   jQuery( '#qunit-fixture' ).append( '<div class="control-color-container"></div>' );

	//   // Create dummy model.
	//   model = new Backbone.Model( {

	//      options: [ 'red', 'green', 'blue' ]

	//   } );

	//   // Create view and render it.
	//   view = new window.ControlColorView( {

	//      el:    '.control-color-container',
	//      model: model

	//   } );

	//   view.render();

	//   // Check the output.
	//   // Verde despues de incluir la function render en la vista
	//   assert.equal( jQuery( '.control-color-container' ).find( 'input[type="checkbox"]' ).length, 3, 'vLa vista tiene 3 checkbos' );
	
	//   // Test para el nuevo append de la refactorizacion de render
	//   // Verde despuesde añadir empty() al append
	//   view.render();
 //  	assert.equal( jQuery( '.control-color-container' ).find( 'input[type="checkbox"]' ).length, 3, 'La vista continua teniendo 3 checkbox despues del rerender' );

	// } );


	// QUnit.test( 'Checkboxes have correct values', function( assert ) {
	//   var view, model, values;

	//   jQuery( '#qunit-fixture' ).append( '<div class="control-color-container"></div>' );

	//   model = new Backbone.Model( {
	//      options: [ 'red', 'green', 'blue' ]
	//   } );

	//   view = new window.ControlColorView( {
	//      el:    '.control-color-container',
	//      model: model
	//   } );
	//   view.render();

	//   values = _.pluck( jQuery( '.control-color-container' ).find( 'input[type="checkbox"]' ), 'value' );
	//   assert.notOk( _.isEmpty( values ), 'there are values' );
	//   assert.deepEqual( _.difference( values, [ 'red', 'green', 'blue' ] ), [], 'checkboxes values are as expected' );
	// } );

	var view, container,
     $ = jQuery,
     fixture = $( '#qunit-fixture' );

  hooks.beforeEach( function( assert ) {
     var View, model;

     // Test if view is defined and is a Backbone.js view.
     View = window.ControlColorView;
     assert.ok( ! _.isUndefined( View ), 'View is defined' );
     assert.ok( _.isFunction( View.prototype.setElement ) && _.isFunction( View.prototype.delegateEvents ), 'View is Backbone view' );

     // Create container element in QUnit's fixture.
     container = $( '<div class="control-color-container"></div>' );
     fixture.append( container );

     // Create dummy model.
     model = new Backbone.Model( {
        options: [ 'red', 'green', 'blue' ],
        	// añadido para test3
        checked: [ 'blue', 'red' ]
     } );

     // Create view and render it.
     view = new View( {
        el:    '.control-color-container',
        model: model
     } );

     view.render();
  } );

  QUnit.test( 'Color control view renders markup as expected', function( assert ) {
     assert.equal( container.find( 'input[type="checkbox"]' ).length, 3, 'view contains 3 checkboxes' );
     view.render();
     assert.equal( container.find( 'input[type="checkbox"]' ).length, 3, 'view still contains 3 checkboxes after re-render' );
  } );

  QUnit.test( 'Checkboxes have correct values', function( assert ) {

     var values = _.pluck( container.find( 'input[type="checkbox"]' ), 'value' );
     assert.notOk( _.isEmpty( values ), 'there are values' );
     assert.deepEqual( _.difference( values, [ 'red', 'green', 'blue' ] ), [], 'checkboxes values are as expected' );
  } );

  QUnit.test( 'Some checkboxes are checked based by default', function( assert ) {

	  var checkedValues = _.pluck( container.find( 'input:checked' ), 'value' );

	  // Verde tras añadir 'checked' a render()
	  assert.notOk( _.isEmpty( checkedValues ), 'there are checked inputs' );
	  assert.deepEqual( _.difference( checkedValues, [ 'red', 'blue' ] ), [], 'correct checkboxes are checked' );
	
	} );


	QUnit.test( 'State of the view is bound to the model', function( assert ) {

	  var checkedValues;

	  view.model.set( 'checked', [ 'green' ] );

	  checkedValues = _.pluck( container.find( 'input:checked' ), 'value' );

	  assert.deepEqual( _.size( checkedValues ), 1, 'only 1 checkbox is checked' );
	  assert.deepEqual( checkedValues, [ 'green' ], 'correct checkboxes is checked' );

	} );

	// Test para cablear la vista con el modelo por el evento change
	// Verde al añadir events a la vista
	QUnit.test( 'View sets attributes on the model', function( assert ) {

	  container.find( 'input[value="red"]' ).prop( 'checked', false ).trigger( 'change' );

	  assert.deepEqual( view.model.get( 'checked' ), [ 'blue' ], 'only 1 checkbox is checked now' );
	
	} );
} );