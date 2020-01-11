import React, { useContext } from 'react'
import Rating from '../Rating/Rating'
import './BookmarkItem.css'
import { Link } from 'react-router-dom'

import BookmarkContext from '../Context'

export default function BookmarkItem(props) {
	const { deleteBookmark = () => {} } = useContext(BookmarkContext)

	return (
		<li className="BookmarkItem">
			<div className="BookmarkItem__row">
				<h3 className="BookmarkItem__title">
					<a
						href={props.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{props.title}
					</a>
				</h3>
				<Rating value={props.rating} />
			</div>
			<p className="BookmarkItem__description">{props.description}</p>
			<div className="BookmarkItem__buttons">
				<Link
					to={`/edit/${props.id}`}
					className="BookmarkItem__edit_link"
				>
					Edit
				</Link>
				<button
					className="BookmarkItem__delete_button"
					onClick={() => deleteBookmark(props.id)}
				>
					Delete
				</button>
			</div>
		</li>
	)
}
