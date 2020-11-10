import React from 'react';
import { Link } from 'react-router-dom';

const Collection: React.FC = () => {
	return (
		<div id="my-collection">
			<h2>My Collection</h2>
			<Link className="circle-button" to="/collection/add">
				<i className="fas fa-fw fa-plus"></i>
			</Link>
		</div>
	);
};

export default Collection;
