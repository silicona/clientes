window.ControlColorView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, 'change:checked', this.render);
	},

	render: function() {

   //  // _.times( 3, function() {
   //  //     this.$el.append( '<input type="checkbox">' );
   //  // 	}, this );

   //  // Factorizado despues del segundo test de vista
	  // var items = [];
	  // _.times( 3, function() {
	  //    items.push( '<input type="checkbox">' );
	  // }, this );
	  // //this.$el.append( items );
	  
	 	// // Añadido para test2 verde
	  // this.$el.empty().append( items );

	  // Factorizado para test3
	  var items = [];
	  // TEst 3
	  var checked = this.model.get( 'checked' );

    _.each( this.model.get( 'options' ), function( option ) {
      items.push( jQuery( '<input>', {
         type: 'checkbox',
         value: option,
         // Test3
         checked: _.contains( checked, option )
      } ) );
    }, this );

    this.$el.empty().append( items );
  },

  events: {
  	'change input[type="checkbox"]' : 'gestionarCambio',
  },

  gestionarCambio: function(){

  	var checked = _.pluck( this.$( 'input[type="checkbox"]:checked' ), 'value' );
  	
    this.model.set( 'checked', checked );

  }

});