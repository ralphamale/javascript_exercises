(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var UI = TTT.UI = function (game, $el) {
    this.game = game;
    this.$el = $el;
  };

  UI.prototype.bindEvents = function () {
    var ui = this;

    this.$el.on('click', 'li', function (event) {
      ui.makeMove($(this));
    });
  };

  UI.prototype.getPosition = function ($square) {
    return _.map($square.attr('data-pos').split('_'), function (el) {
      return parseInt(el, 10);
    });
  };

  UI.prototype.makeMove = function ($square) {
    var pos = this.getPosition($square);
    var player = this.game.player;

    if (this.game.move(pos)) {
      $square.addClass(player);

      if (this.game.over()) {
        this.$el.off('click');

        var winner = this.game.winner();
        if (winner) {
          this.$el.addClass('winner-' + winner);
        } else {
          this.$el.addClass('over');
        }
      }
    } else {
      alert('Invalid move! Try again.');
    }
  };

  UI.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  UI.prototype.setupBoard = function () {
    var html = '';

    _.times(3, function (rowNum) {
      _.times(3, function (colNum) {
        var pos = '' + rowNum + '_' + colNum;
        html += '<li data-pos="' + pos + '"></li>';
      });
    });

    this.$el.append(html);
  };
})(this);
