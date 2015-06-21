
var React = window.React = require('react'),
    AddTile = require('./ui/AddTile'),
    LinkTile = require('./ui/LinkTile'),
    mountNode = document.getElementById("app");

var Tiles = React.createClass({
  getInitialState: function() {
    var items = localStorage.getItem("items");
    return { items: items ? JSON.parse(items) : [] };
  },
  addItem: function(item) {
    var nextItems = this.state.items.concat([item]);
    localStorage.setItem("items", JSON.stringify(nextItems));
    this.setState({ items: nextItems });
  },
  render: function() {
    var createItem = function(item) {
      return (
        <LinkTile label={item.label} image={item.image} href={item.url} />
      );
    };
    return (
      <div>
        <div className="link-tiles">
          {this.state.items.map(createItem)}
          <AddTile app={this} />
        </div>

        <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content" id="addModalContent">
            </div>
          </div>
        </div>
      </div>
    );
  }
});


React.render(<Tiles />, mountNode);

