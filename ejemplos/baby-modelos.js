var Feedback = Backbone.Model.extend({

    url: '/feedback',

    defaults: {
        'email': '',
        'website': '',
        'feedback': ''
    },


     // // Validaciones
    // validate: function (attrs) {
    //     if (!attrs.email) {
    //         return 'Please fill email field.';
    //     }
    //     if (!attrs.feedback) {
    //         return 'Please fill feedback field.';
    //     }
    // }

validate: function (attrs) {
    var errors = [];

    if (!attrs.email) {
        errors.push({name: 'email', message: 'Please fill email field.'});
    }
    if (!attrs.feedback) {
        errors.push({name: 'feedback', message: 'Please fill feedback field.'});
    }

    return errors.length > 0 ? errors : false;
}

});