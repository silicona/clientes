window.ControlColor = Backbone.Model.extend({

	defaults: {
			// Comentado para el initialize
		options: [ /*'all'*/ ],
		checked: [ 'all' ],
	},

	initialize: function( attrs ) {
  
    attrs = _.defaults( attrs || {}, this.defaults );
    attrs.options.push( 'all' );

    this.on( 'change:checked', this.updateChecked );
  
  },

  updateChecked: function( model, checked ) {
    
    // if ( _.contains( checked, 'all' ) ) {
    // 	if ( _.contains( this.previous( 'checked' ), 'all' ) ) {
    //     this.set( 'checked', _.without( checked, 'all' ), { silent: true } );
    //   } else {      
    //   	this.set( 'checked', [ 'all' ], { silent: true } );
    // 	}    
    // }

    	//Factorizacion para extraer this.set fuera del if...else
    	// Realizada despues del test
    var itemsToCheck;

	  if ( _.contains( checked, 'all' ) ) {
	     if ( _.contains( this.previous( 'checked' ), 'all' ) ) {
	        itemsToCheck = _.without( checked, 'all' );
	     } else {
	        itemsToCheck = [ 'all' ];
	     }
	     this.set( 'checked', itemsToCheck, { silent: true } );
	  }
  }

});