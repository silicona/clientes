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

    this.model.on('invalid', function(model,error){ 
              me.showErrors(error);
      //alert(error[0].message);

    })

    var feedback = {
      
      email: this.$('#email').val(),
      
      website:  this.$('#website').val(),
      
      feedback: this.$('#feedback').val()

    };

    //this.model.set('email', this.$('#email').val())

    this.model.save(feedback , options);
  },

  showErrors: function(errors) {
    //console.log('veo errores');
      _.each(errors, function (error) {
        var control = this.$('#' + error.name);
        padre = control.parent();
        //var controlGroup = this.$('.' + error.name);
        control.addClass('error');
        padre.append($('<small>', { class: 'help-inline' }));
        $('.help-inline').html(error.message);
        console.log('control: ', error);
      }, this);
  },

  hideErrors: function () {
      this.$('.control-group').removeClass('error');
      this.$('.help-inline').text('');
  }

});