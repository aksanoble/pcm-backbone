var app = app || {};
$(function() {
  app.Key = Backbone.PubNub.Model.extend({
    name: 'MyModel',
    pubnub: pubnub,
    defaults: {
      key: [0,5,10]
    }
  });

});
