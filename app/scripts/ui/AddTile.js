'use strict';

var React = require('react'),
	LinkTypes = require('../data/LinkTypes'),
	LinkTile = require('./LinkTile');

var ModalContent = React.createClass({
    getInitialState: function() {
        return { selection: null, text: "" };
    },
    onChange: function(e) {
    	this.setState({ selection: this.state.selection, text: e.target.value }) ;
    },
    onAdd: function(e) {
    	e.preventDefault();
    	var link = $.extend({url: this.state.text}, this.state.selection);
    	this.props.app.addItem(link);
    },
	render: function() {
	    var createItem = $.proxy(function(item) {
	      var onClick = $.proxy(function(e) {
	      	e.preventDefault();
	      	this.setState({ selection: item, text: "" });
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
              {this.state.selection ?
		  		<div className="add-controls">
		  			<div className="logo">
		  				<img src={this.state.selection.image} alt={this.state.selection.label} />
		  			</div>
		  			<div className="input">
			  			<p>{this.state.selection.label} URL:</p>
			  			<p><input onChange={this.onChange} value={ this.state.text } size="60" /></p>
		  			</div>
		  		</div>
				: LinkTypes.map(createItem)
			  }
            </div>
            <div className={this.state.selection ? "modal-footer" : "hide"}>
              <button onClick={this.onAdd} type="button" className="btn btn-primary" data-dismiss="modal" disabled={this.state.text ? false : true}>Add</button>
            </div>
          </div>
		);
	}
});

var AddTile = React.createClass({
  getInitialState: function() {
  	return {};
  },
  render: function() {
  	if (!this.state.modal) {
		// yield to ensure the modal dom has been created
	  	setTimeout($.proxy(function() {
		  	var modal = $("#addModal").on("show.bs.modal", $.proxy(function(e) {
		  		var modalBody = $("#addModalContent").empty();
		  		React.render(<ModalContent app={this.props.app} />, modalBody[0]);
		  	}, this));
		  	this.setState({modal: modal});
	  	}, this), 0);
  	}
    return (
	    <a href="#addModal" data-toggle="modal" className="add tile">Add</a>
	);
  }
});

module.exports = AddTile;
