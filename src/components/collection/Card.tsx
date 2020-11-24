import React from 'react';
import vodkaSvg from '../../assets/vodka.svg';
import whiskeySvg from '../../assets/whiskey.svg';
import { Spirit } from '../../models/spirit';

interface CardProps {
	spirit: Spirit;
}

const Card: React.FC<CardProps> = ({ spirit }) => {
	const getSvg = (type: string) => {
		switch (type) {
			case 'vodka':
				return vodkaSvg;
			case 'bourbon':
				return whiskeySvg;
			default:
				return '';
		}
	};

	return (
		<article
			key={spirit.name}
			className={`card ${spirit.type.toLowerCase()}`}
		>
			<header className="card-header">
				<h2>{spirit.name}</h2>
				<p>{spirit.brand}</p>
			</header>
			<div className="card-content">
				<div className="card-image">
					<img src={getSvg(spirit.type)} alt="" />
				</div>
				<div className="description">
					<div className="section-title">Description</div>
					{spirit.description}
				</div>
			</div>
			<div className="tasting-notes-display">
				{spirit.tastingNotes && spirit.tastingNotes.length !== 0 && (
					<>
						{spirit.tastingNotes.map(
							(note: string, index: number) => {
								return (
									<div
										key={index}
										className="tasting-note-display"
									>
										{note}
									</div>
								);
							}
						)}
					</>
				)}
			</div>
		</article>
	);
};

export default Card;
