'use strict';

var React = require('react'),
	LinkTypes = require('../data/LinkTypes'),
	LinkTile = require('./LinkTile');

var Tiles = React.createClass({
    getInitialState: function() {
        return { selection: null };
    },
	render: function() {
	    var createItem = $.proxy(function(item) {
	      var onClick = $.proxy(function(e) {
	      	e.preventDefault();
	      	console.log(this);
	      	this.setState({ selection: item });
	      }, this);
	      return (
	        <LinkTile label={item.label} image={item.image} onClick={onClick} />
	      );
	  	}, this);
		return (
		  <div>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="addModalLabel">Add a link</h4>
            </div>
            <div className="modal-body">
              {this.state.selection ? <AddControls selection={this.state.selection} /> : LinkTypes.map(createItem) }
            </div>
            <div className={this.state.selection ? "modal-footer" : "hide"}>
              <button type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
		);
	}
});
var AddControls = React.createClass({
  render: function() {
  	return <div>{this.props.selection.label}</div>
  }
});
var AddTile = React.createClass({
  getInitialState: function() {
  	return {};
  },
  onClick: function(e) {
  	e.preventDefault();
  	this.props.parent.addItem(new Date().getTime());
  },
  render: function() {
  	if (!this.state.modal) {
		// yield to ensure the modal dom has been created
	  	setTimeout($.proxy(function() {
		  	var modal = $("#addModal").on("show.bs.modal", function(e) {
		  		var modalBody = $("#addModalContent").empty();
		  		React.render(<Tiles />, modalBody[0]);
		  	});
		  	this.setState({modal: modal});
	  	}, this), 0);
  	}
    return (
	    <a href="#addModal" data-toggle="modal" className="add tile">Add</a>
	);
  }
});


module.exports = AddTile;
