var app = app || {};
$(function() {
  /*app.AppView = Backbone.View.extend({
    el: '#matrix',

    events: {
      'click td' : 'updateKey'
    },

    initialize: function() {
      this.listenTo(app.key, 'all', this.render);
      return this.render();
    },

    render: function(e) {
      console.log('render triggered');
      var matrixCell = app.key.get('key');
      _.each(matrixCell, this.addClass);
    },

    addClass: function(cell) {
      console.log(cell);
      $("td:eq(" + cell+ ")").nextAll().removeClass("checked");
      $("td:eq(" + cell+ ")").prevAll().addBack().addClass("checked");
    },


    updateKey: function(e) {
      cellIndex = $("td").index(e.target);
      matrixKey = app.key.get('key');
      matrixKey[Math.floor(cellIndex/5)] = cellIndex;
      app.key.set({key:matrixKey});
      app.key.trigger('changed', e);
    }

  });
  var appView = new app.AppView();

*/

var MyModel = Backbone.PubNub.Model.extend({
  name: "MyModel",
  pubnub: pubnub,
  defaults: function() {
    return {
      rand: Math.random(),
      title: "My Model",
      key: 1
    };
  }
});

var mymodel = new MyModel;

var MyModelView = Backbone.View.extend({
  el: $('#mainview'),
  template: _.template($('#mymodel-template').html()),
  events: {
    'click #update': 'onUpdateClick',
    'click td' : 'updateKey'

  },
  initialize: function() {
    this.listenTo(mymodel, 'all', this.render);
    return this.render();
  },
  onUpdateClick: function(event) {
    return mymodel.set({
      rand: Math.random()
    });
  },

  updateKey: function(e) {
    console.log("clicked!");
    cellIndex = $("td").index(e.target);
    //matrixKey = mymodel.get('key');
    //matrixKey[Math.floor(cellIndex/5)] = cellIndex;
    return mymodel.set({key : cellIndex});

  },

  addClass: function(cell) {
    console.log(cell);
    $("td:eq(" + cell+ ")").nextAll().removeClass("checked");
    $("td:eq(" + cell+ ")").prevAll().addBack().addClass("checked");
  },

  render: function() {
    console.log('render triggered');
    return $('#mymodel').html(this.template(mymodel.toJSON()));
  }

  /*render: function() {
    this.$el.html(this.template(mymodel.toJSON()));
    console.log('render triggered');
    var matrixCell = app.key.get('key');
    _.each(matrixCell, this.addClass);

  }*/
});

var modelview = new MyModelView;

pubnub.subscribe({
  channel: uuid,
    callback: function(message) {
    //var data;
    //data = message;
    //return Todos.set(data);
  },
    connect: function() {
    return pubnub.publish({
      channel: 'getTodos',
      message: {
        uuid: uuid
      }
    });
  }
});

});
