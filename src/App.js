import React, { Component } from 'react';
import firebase from './firebaseConfig';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

import './App.css';

class App extends Component {
	state = {
		text: '',
		todos: [],
		user: null,
		isAuthenticated: false,
	};

	// arrow functions uses the 'this' of the whole components itself
	handleChange = event => {
		this.setState({
			text: event.currentTarget.value
		})
	}

	handleSubmit = event => {
		event.preventDefault();
		firebase.database().ref('todos')
			.push({
				text: this.state.text
			})
			.then(() => {
				this.setState({
					text: ''
				})
				console.log('todo written');
			})
	}

	handleRemove = todoId => {
		firebase.database().ref(`todos/${todoId}`)
			.remove()
			.then(() => {
				console.log(todoId, 'removed successfully');
			})
			.catch(error => {
				console.log('remove failed : ', error);
			})
	}

	handleLogin = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
			.then(() => {
				console.log('login success');
			})
			.catch(error => {
				console.log('login failed : ', error);
			})
	}

	handleLogout = () => {
		firebase.auth().signOut()
			.then(() => {
				console.log('logout succes');
			})
			.catch(error => {
				console.log('logout failed : ', error);
			})
	}

	// componentdidmount is a lifecycle method, maybe like constructor?
	componentDidMount() {
		// console.log('firebase databae : ', firebase.database);
		firebase.database().ref('todos')
			.on('value', snapshot => {
				const newStateArray = [];
				snapshot.forEach(childSnapshot => {
					newStateArray.push({
						id: childSnapshot.key,
						...childSnapshot.val()
					})
				})

				this.setState({
					todos: newStateArray
				});
			})

		firebase.auth().onAuthStateChanged(user => {
			user ? (this.setState({
				user: user.displayName,
				isAuthenticated: true,
			})) : (this.setState({
				user: null,
				isAuthenticated: false,
			}));
		})
	}
		
	render() {
		return (
			<div className="App">
				<h1>welcome to react fire todo</h1>

				{
					this.state.isAuthenticated ? (
						<Dashboard 
							textValue={this.state.text} 
							todos={this.state.todos} 
							handleChange={this.handleChange} 
							handleSubmit={this.handleSubmit} 
							handleRemove={this.handleRemove} 
							handleLogout={this.handleLogout} 
						/>	
					) : (
						<Login 
							handleLogin={this.handleLogin}
						/>
					)
				}

			</div>
		);
	}
}

export default App;
