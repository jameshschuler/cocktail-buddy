import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spirit, SpiritType, ToArray } from '../../models/spirit';
import { loadCollection } from '../../service/collectionService';

const Collection: React.FC = () => {
	const [collectionMap, setCollectionMap] = useState<Map<
		string,
		Spirit[]
	> | null>(null);

	useEffect(() => {
		const loadData = async () => {
			const data = await loadCollection();
			// setCollection(data);

			const map = new Map<string, Spirit[]>();
			ToArray(SpiritType).forEach((spiritType: string) => {
				map.set(
					spiritType,
					data.filter(
						(spirit: Spirit) =>
							spirit.type === spiritType.toLowerCase()
					)
				);
			});
			setCollectionMap(map);
		};

		loadData();
	}, []);

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
