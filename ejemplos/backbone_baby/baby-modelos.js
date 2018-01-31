BASE = 'localhost/clien_test/ejemplos/'

var Feedback = Backbone.Model.extend({

  url: 'feedback.php',

  defaults: {
    'email': '',
    'website': '',
    'feedback': ''
  },

  validate: function (attrs) {
    var errors = [];

    if (!attrs.email) {

      console.log('sin mail');
      //return 'Please fill mail field.';
      errors.push({name: 'email', message: 'Please fill email field.'});

    }

    if (!attrs.feedback) {

      //return 'Please fill feedback field.';
      errors.push({name: 'feedback', message: 'Please fill feedback field.'});

    }

    return errors.length > 0 ? errors : false;
  }

});