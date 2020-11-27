import React, { Component } from 'react';
import './App.css';
import ListItems from './ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

library.add(faTrash);

export class App extends Component {
	state = {
		items: [],
		currentItem: {
			text: '',
			key: '',
		},
	};

	handleInput = (e) => {
		this.setState({ currentItem: { text: e.target.value, key: Date.now() } });
	};

	addItem = (e) => {
		e.preventDefault();
		const newItem = this.state.currentItem;
		if (newItem.text !== '') {
			const items = [...this.state.items, newItem];
			this.setState({
				items: items,
				currentItem: {
					text: '',
					key: '',
				},
			});
		}
	};

	setUpdate = (text, key) => {
		const items = this.state.items;
		items.map((item) => {
			if (item.key === key) {
				item.text = text;
			}
		});
		this.setState({ items: items });
	};

	deleteItem = (key) => {
		const filteredItems = this.state.items.filter((item) => item.key !== key);
		this.setState({ items: filteredItems });
	};

	render() {
		return (
			<div>
				<div className='App'>
					<h2 style={{ color: '#66CCCC', padding: '10px' }}>
						Either you have done everything already or there are still things to
						add to your list. Add it here
					</h2>
					<header>
						<form id='todo_form' onSubmit={this.addItem}>
							<input
								type='text'
								placeholder='Enter task'
								value={this.state.currentItem.text}
								onChange={this.handleInput}
							/>
							<button type='submit'>Add</button>
						</form>
					</header>
					<ListItems
						items={this.state.items}
						deleteItem={this.deleteItem}
						setUpdate={this.setUpdate}
					/>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
