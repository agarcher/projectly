'use strict';

var React = require('react'),
	LinkTypes = require('../data/LinkTypes'),
	LinkTile = require('./LinkTile');

var Tiles = React.createClass({
	render: function() {
	    var createItem = function(item) {
	      return (
	        <LinkTile label={item.label} image={item.image} />
	      );
	  	};
		return <div className="add-container">{LinkTypes.map(createItem)}</div>
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
	  	setTimeout($.proxy(function() {
	  		console.log("binding modal");
		  	// yield to ensure the modal dom has been created
		  	var modal = $("#addModal").on("show.bs.modal", function(e) {
		  		var modalBody = $("#addModalBody").empty();
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
