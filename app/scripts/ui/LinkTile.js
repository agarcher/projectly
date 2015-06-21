'use strict';

var React = require('react');

var LinkTile = React.createClass({
  render: function() {
    return (
    	<a onClick={this.props.onClick} href={this.props.href || "#"} className="tile">
    		<span className="name">{this.props.label}</span><br />
    		<img src={this.props.image} alt={this.props.label} />
    	</a>
    );
  }
});


module.exports = LinkTile;
