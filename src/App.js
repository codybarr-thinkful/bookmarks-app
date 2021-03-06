import React, { Component } from 'react'
import AddBookmark from './AddBookmark/AddBookmark'
import EditBookmark from './EditBookmark/EditBookmark'
import BookmarkList from './BookmarkList/BookmarkList'
import Nav from './Nav/Nav'
import config from './config'
import './App.css'

import BookmarkContext from './Context'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
	state = {
		bookmarks: [],
		error: null,
		updateBookmark: () => {}
	}

	addBookmark = bookmark => {
		this.setState({
			bookmarks: [...this.state.bookmarks, bookmark]
		})
	}

	updateBookmark = updatedBookmark => {
		const updatedBookmarks = this.state.bookmarks.map(bm =>
			bm.id === updatedBookmark.id ? updatedBookmark : bm
		)

		this.setState({
			bookmarks: updatedBookmarks
		})
	}

	deleteBookmark = bookmarkId => {
		fetch(`${config.API_ENDPOINT}/${bookmarkId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				} else {
					const updatedBookmarks = this.state.bookmarks.filter(
						bm => bm.id !== bookmarkId
					)

					this.setState({
						bookmarks: updatedBookmarks
					})
				}
			})
			.catch(error => this.setState({ error }))
	}

	fetchBookmarks() {
		fetch(config.API_ENDPOINT, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then(bookmarks => this.setState({ bookmarks }))
			.catch(error => this.setState({ error }))
	}

	componentDidMount() {
		this.fetchBookmarks()

		this.setState({
			updateBookmark: this.updateBookmark,
			deleteBookmark: this.deleteBookmark
		})
	}

	render() {
		const { bookmarks } = this.state
		return (
			<BookmarkContext.Provider value={this.state}>
				<Router>
					<main className="App">
						<h1>Bookmarks!</h1>
						<Nav />
						<div className="content" aria-live="polite">
							<Switch>
								<Route exact path="/">
									<BookmarkList bookmarks={bookmarks} />
								</Route>
								<Route path="/add">
									<AddBookmark
										onAddBookmark={this.addBookmark}
									/>
								</Route>
								<Route path="/edit/:id">
									<EditBookmark />
								</Route>
							</Switch>
						</div>
					</main>
				</Router>
			</BookmarkContext.Provider>
		)
	}
}

export default App
