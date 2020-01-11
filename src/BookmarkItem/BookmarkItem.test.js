import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import BookmarkItem from './BookmarkItem'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<App>
			<BrowserRouter>
				<BookmarkItem />
			</BrowserRouter>
		</App>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
