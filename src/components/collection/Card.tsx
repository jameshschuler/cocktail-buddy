import React, { useContext } from 'react';
import vodkaSvg from '../../assets/vodka.svg';
import whiskeySvg from '../../assets/whiskey.svg';
import { UserContext } from '../../context/AppContext';
import { MessageType } from '../../models/message';
import { Spirit } from '../../models/spirit';
import { deleteSpirit } from '../../service/collectionService';

interface CardProps {
	spirit: Spirit;
	deleteMode: boolean;
}

const Card: React.FC<CardProps> = ({ deleteMode, spirit }) => {
	const { setGlobalMessage, setShouldReloadCollection } = useContext(
		UserContext
	);
	const getImageSource = (type: string) => {
		if (spirit.imageUrl && spirit.imageUrl !== '') {
			return spirit.imageUrl;
		}

		switch (type) {
			case 'vodka':
				return vodkaSvg;
			case 'bourbon':
				return whiskeySvg;
			default:
				return '';
		}
	};

	const deleteSpiritClicked = async (id?: string) => {
		const error = await deleteSpirit(id!);

		if (error) {
			setGlobalMessage(error, MessageType.error);
		} else {
			setShouldReloadCollection(true);
		}
	};

	return (
		<article
			key={spirit.name}
			className={`card ${spirit.type.toLowerCase()}`}
		>
			<header className="card-header">
				<h2>
					<span>{spirit.name}</span>
					{deleteMode && (
						<span onClick={() => deleteSpiritClicked(spirit.id)}>
							<i className="fas fa-lg fa-trash-alt"></i>
						</span>
					)}
				</h2>
				<p>{spirit.brand}</p>
			</header>
			<div className="card-content">
				<div className="card-image">
					<img src={getImageSource(spirit.type)} alt="" />
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
