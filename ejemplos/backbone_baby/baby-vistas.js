var FeedbackFormView = Backbone.View.extend({
 className: 'row',

  render: function () {

  	this.$el.html(this.template);

    return this;

  },

  template: _.template($('#formulario').html()),

  events: {
    'click #submit': 'submitClicked'
  },

  submitClicked: function (e) {

    e.preventDefault();

    // var options = {

    //   success: function () { alert('Thanks for the feedback!'); },

    //   error: function (model, error) { alert(error); }

    // };

    var me = this;
    var options = {
          success: function () {
              me.hideErrors();
          },
          error: function (model, errors) {
              me.showErrors(errors);
          }
      };

    var feedback = {
      
      email: this.$('#email').val(),
      
      website:  this.$('#website').val(),
      
      feedback: this.$('#feedback').val()

    };

    this.model.save(feedback, options);
  },

  showErrors: function(errors) {
    _.each(errors, function (error) {
        var controlGroup = this.$('.' + error.name);
        controlGroup.addClass('error');
        controlGroup.find('.help-inline').text(error.message);
    }, this);
},

hideErrors: function () {
    this.$('.control-group').removeClass('error');
    this.$('.help-inline').text('');
}

});