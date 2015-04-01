var app = app || {};
$(function() {
  app.AppView = Backbone.View.extend({
    el: '#matrix',

    events: {
      'click td' : 'selectCell'
    },

    initialize: function() {
      this.model = new app.Key();
      app.keys = new app.Keys();
      app.keys.add(this.model);

      this.listenTo(this.model, 'changed', this.render);
    },

    render: function(e) {
      console.log("render triggered");
      var matrixCell = this.model.get('key');
      _.each(matrixCell, this.addClass);
    },

    addClass: function(cell) {
      console.log(cell);
      $("td:eq(" + cell+ ")").nextAll().removeClass("checked");
      $("td:eq(" + cell+ ")").prevAll().addBack().addClass("checked");
    },


    selectCell: function(e) {
      cellIndex = $("td").index(e.target);
      matrixKey = this.model.get('key');
      matrixKey[Math.floor(cellIndex/5)] = cellIndex;
      this.model.set('matrixKey');
      this.model.trigger('changed', e);
      //console.log(this.model.get('key'));
    }

  });
  var appView = new app.AppView();
})
