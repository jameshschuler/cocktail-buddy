import React, { useState } from 'react';

interface TastingNoteProps {
	note: string;
	toggle: Function;
}

const TastingNote: React.FC<TastingNoteProps> = ({ note, toggle }) => {
	const [selected, setSelected] = useState(false);

	return (
		<div
			className={`tasting-note ${selected ? 'selected' : ''}`}
			onClick={() => {
				setSelected(!selected);
				toggle(note);
			}}
		>
			<span>{note}</span>
		</div>
	);
};

export default TastingNote;
