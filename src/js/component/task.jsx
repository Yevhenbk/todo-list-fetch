import React, { useState } from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li className="list-group-item" onClick={() => props.delete(props.id)}>
			<p>{props.text.label}</p>
			<i onClick={props.onMyClick} className="  fas fa-trash-alt" />
		</li>
	);
};
Task.propTypes = {
	label: PropTypes.string,
	isDone: PropTypes.bool,
	onMyClick: PropTypes.func,
	text: PropTypes.object,
	delete: PropTypes.func,
	id: PropTypes.number
};
export default Task;
