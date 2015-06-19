'use strict';

var React = require('react');

var LinkTile = React.createClass({
  render: function() {
    return <a href={this.props.href || "#"} className="tile">{this.props.label}</a>;
  }
});


module.exports = LinkTile;
