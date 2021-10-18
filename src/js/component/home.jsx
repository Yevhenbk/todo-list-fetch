import React, { useState, useEffect } from "react";
import Task from "./task.jsx";

const Home = () => {
	const [taskList, setTaskList] = useState({ task: "" });
	const [listMap, setListMap] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Yevhenbk", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setTaskList(data);
			})
			.catch(error => {
				console.log(error, "epa");
			});
	}, []);

	useEffect(() => {
		if (taskList.length) {
			setListMap(
				taskList.map((task, index) => {
					return (
						<Task
							text={task}
							id={index}
							key={index.toString()}
							delete={deleteTask}
						/>
					);
				})
			);
		}
	}, [taskList]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Yevhenbk", {
			method: "PUT",
			body: JSON.stringify(taskList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [taskList]);

	const deleteTask = indexDelete => {
		setTaskList(taskList.filter((_, index) => index !== indexDelete));
	};
	return (
		<div className="container">
			<div className="mb-6">
				<section className="toDoList">
					<header>Todo App</header>
					<form
						className="form"
						onSubmit={event => {
							event.preventDefault();
						}}>
						<input
							type="tasks"
							onKeyPress={event => {
								if (event.key == "Enter") {
									if (event.key === "Enter") {
										setTaskList([
											...taskList,
											{
												label: event.target.value,
												done: false
											}
										]);
										event.currentTarget.value = "";
									}
								}
							}}
							placeholder="What needs to be done?"
						/>
					</form>
				</section>
				<ul className="list-group-flush">{listMap}</ul>
				<footer>
					<span className="footerNum">You have {listMap.length}</span>
					<span className="footerTask"> pending task(s)</span>
				</footer>
			</div>
		</div>
	);
};

export default Home;
