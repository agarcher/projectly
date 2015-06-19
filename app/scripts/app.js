
var React = window.React = require('react'),
    AddTile = require('./ui/AddTile'),
    LinkTile = require('./ui/LinkTile'),
    mountNode = document.getElementById("app");

var Tiles = React.createClass({
  getInitialState: function() {
    var items = localStorage.getItem("items");
    return { items: items ? JSON.parse(items) : [], text: "" };
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{label: this.state.text}]);
    var nextText = '';
    localStorage.setItem("items", JSON.stringify(nextItems));
    this.setState({items: nextItems, text: nextText});
  },
  addItem: function(itemText) {
    var nextItems = this.state.items.concat([{label: itemText}]);
    var nextText = '';
    localStorage.setItem("items", JSON.stringify(nextItems));
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    var createItem = function(item) {
      return (
        <LinkTile label={item.label} />
      );
    };
    return (
      <div>
        <div className="link-tiles">
          {this.state.items.map(createItem)}
          <AddTile parent={this} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>

        <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="addModalLabel">Add a link</h4>
              </div>
              <div className="modal-body" id="addModalBody">
                <p className="text-muted">Loading...</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


React.render(<Tiles />, mountNode);

