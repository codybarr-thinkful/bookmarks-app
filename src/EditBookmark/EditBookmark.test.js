import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import EditBookmark from './EditBookmark'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<BrowserRouter>
			<EditBookmark />
		</BrowserRouter>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
