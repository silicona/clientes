var FeedbackFormView = Backbone.View.extend({
   className: 'row',

    render: function () {

    	this.$el.html(this.template);

       return this;
    },

    template: '<form>\
      <legend>Share the feedback</legend>\
      <div class="control-group">\
       <label>Email</label>\
       <input type="text" id="email" placeholder="Your email address...">\
      </div>\
      <div class="control-group">\
       <label>Web site</label>\
       <input type="text" id="website" placeholder="Your website...">\
      </div>\
      <div class="control-group">\
      <label>Feedback</label>\
      <textarea id="feedback" class="input-xxlarge" placeholder="Feedback text..." rows="6"></textarea>\
      </div>\
      <button type="submit" id="submit" class="btn">Submit</button>\
     </form>\
    ',


events: {
    'click #submit': 'submitClicked'
},

submitClicked: function (e) {
    e.preventDefault();

    var options = {
        success: function () {
            alert('Thanks for the feedback!');
        },
        error: function (model, error) {
            alert(error);
        }
    };

    var feedback = {
        email: this.$('#email').val(),
        website:  this.$('#website').val(),
        feedback: this.$('#feedback').val()
    };

    this.model.save(feedback, options);
}



});