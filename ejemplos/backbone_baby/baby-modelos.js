BASE = 'localhost/clien_test/ejemplos/';

var Feedback = Backbone.Model.extend({

  url: 'feedback.php',

  defaults: {
    'email': '',
    'website': '',
    'feedback': ''
  },

  initialize: function(){
    //this.on('invalid'){    }
  },

  validate: function (attrs) {
    var errors = [];

    if (attrs.email == '') {

      //return 'Please fill mail field.';
      errors.push({name: 'email', message: 'Please fill email field.'});

    }

    if (!attrs.feedback) {

      //return 'Please fill feedback field.';
      errors.push({name: 'feedback', message: 'Please fill feedback field.'});

    }

    console.dir('errores:', errors.length);
    console.dir('atrs:', attrs.email);
    return errors.length > 0 ? errors : false;
  }

});