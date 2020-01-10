import React, { Component } from 'react'
import config from '../config'
import './EditBookmark.css'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import BookmarkContext from '../Context'

const Required = () => <span className="EditBookmark__required">*</span>

class EditBookmark extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	static contextType = BookmarkContext

	state = {
		bookmark: {
			title: '',
			url: '',
			description: '',
			rating: 0
		}
	}

	componentDidMount() {
		fetch(`${config.API_ENDPOINT}/${this.props.match.params.id}`, {
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
			.then(bookmark => this.setState({ bookmark }))
			.catch(error => this.setState({ error }))
	}

	handleSubmit = e => {
		e.preventDefault()
		// get the form fields from the event
		const newBookmark = {
			...this.state.bookmark
		}
		this.setState({ error: null })

		fetch(`${config.API_ENDPOINT}/${newBookmark.id}`, {
			method: 'PATCH',
			body: JSON.stringify(newBookmark),
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok)
					return res.json().then(error => Promise.reject(error))
			})
			.then(() => {
				this.context.updateBookmark(newBookmark)
				this.props.history.push('/')
			})
			.catch(error => {
				console.log({ error })
				this.setState({ error })
			})
	}

	onClickCancel = () => {
		this.props.history.push('/')
	}

	handleInputChange = event => {
		const { name, value } = event.target

		const { bookmark } = this.state
		const updatedBookmark = { ...bookmark, [name]: value }

		this.setState({ bookmark: updatedBookmark })
	}

	render() {
		const { error } = this.state
		const { bookmark } = this.state
		return (
			<section className="EditBookmark">
				<h2>Edit bookmark</h2>
				<form
					className="EditBookmark__form"
					onSubmit={this.handleSubmit}
				>
					<div className="EditBookmark__error" role="alert">
						{error && <p>{error.message}</p>}
					</div>
					<div>
						<label htmlFor="title">
							Title <Required />
						</label>
						<input
							type="text"
							name="title"
							id="title"
							value={bookmark.title}
							onChange={this.handleInputChange}
							placeholder="Great website!"
							required
						/>
					</div>
					<div>
						<label htmlFor="url">
							URL <Required />
						</label>
						<input
							type="url"
							name="url"
							id="url"
							value={bookmark.url}
							onChange={this.handleInputChange}
							placeholder="https://www.great-website.com/"
							required
						/>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							value={bookmark.description}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="rating">
							Rating <Required />
						</label>
						<input
							type="number"
							name="rating"
							id="rating"
							min="1"
							max="5"
							value={bookmark.rating}
							onChange={this.handleInputChange}
							required
						/>
					</div>
					<div className="EditBookmark__buttons">
						<button type="button" onClick={this.onClickCancel}>
							Cancel
						</button>{' '}
						<button type="submit">Save</button>
					</div>
				</form>
			</section>
		)
	}
}

export default withRouter(EditBookmark)
