import React from 'react';
import { Spirit } from '../../models/spirit';
import Card from './Card';

interface CardsProps {
	spirits: Spirit[];
}

const Cards: React.FC<CardsProps> = ({ spirits }) => {
	return (
		<div className="cards">
			{spirits === null || spirits.length === 0 ? (
				<p className="no-items-message">Nothing here yet...</p>
			) : (
				spirits.map((spirit: Spirit, index: number) => {
					return <Card key={index} spirit={spirit} />;
				})
			)}
		</div>
	);
};

export default Cards;
