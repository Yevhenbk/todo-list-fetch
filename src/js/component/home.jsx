import React, { useState } from "react";
import Task from "./task.jsx";

import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
	const [textTask, setTextTask] = useState({ task: "" });
	const [taskList, setTaskList] = useState([]);

	const sendTextTask = e => {
		e.preventDefault();
		setTaskList([...taskList, textTask]);
		setTextTask({ task: "" });
	};

	const clickDelete = targetIndex => {
		setTaskList(taskList.filter((_, index) => index !== targetIndex));
	};

	let todoList = taskList.map((value, index) => (
		<Task
			inputValue={value.task}
			key={index}
			onMyClick={() => clickDelete(index)}
		/>
	));
	return (
		<div className="container">
			<div className="mb-6">
				<section className="toDoList">
					<header>Todo App</header>
					<form className="form" onSubmit={sendTextTask}>
						<input
							type="text"
							value={textTask.task}
							placeholder="What needs to be done?"
							onChange={e =>
								setTextTask({ task: e.target.value })
							}
						/>
					</form>
				</section>
				<ul className="list-group-flush">{todoList}</ul>
				<footer>
					<span className="footerNum">
						You have {taskList.length}
					</span>
					<span className="footerTask"> pending task(s)</span>
				</footer>
			</div>
		</div>
	);
};

export default Home;
