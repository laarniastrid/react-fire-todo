import React from 'react';

// implicit returns with jsx is with ()?
// implicit returns is a return without a return statement?
const Dashboard = props => (
	<div>
		<h5>here are your todos</h5>
		<button className="btn-logout" onClick={props.handleLogout} >logout</button>

		<form onSubmit={props.handleSubmit} >
			{/* jsx needs self closing tag on self closing tags */}
			<input 
				className="input"
				value={props.textValue} 
				onChange={props.handleChange}
			/>
			<button className="btn">add todo</button>
		</form>

		<div>
			{/* this is a comment */}
			{/* we'll print our todos */}
			{
				props.todos.map(todo => (
					<h6 key={todo.id}>
						{todo.text}
						<span onClick={() => props.handleRemove(todo.id)} > X </span>
					</h6>
				))
			}
		</div>

	</div>
)

export default Dashboard;
