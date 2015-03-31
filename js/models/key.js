var app = app || {};
app.Todo = Backbone.Pubnub.Model.extend({
  defaults: {
    key: [0,0,0]
  }
});
