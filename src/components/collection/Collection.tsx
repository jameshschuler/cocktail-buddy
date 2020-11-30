import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/AppContext';
import { Spirit, SpiritType, ToArray } from '../../models/spirit';
import { loadCollection } from '../../service/collectionService';
import Cards from './Cards';

const Collection: React.FC = () => {
	const [collectionMap, setCollectionMap] = useState<Map<
		string,
		Spirit[]
	> | null>(new Map<string, Spirit[]>());
	const [loading, setLoading] = useState(true);
	const [deleteMode, setDeleteMode] = useState(false);
	const { shouldReloadCollection, setShouldReloadCollection } = useContext(
		UserContext
	);

	const loadData = async () => {
		const data = await loadCollection();
		const map = new Map<string, Spirit[]>();
		ToArray(SpiritType).forEach((spiritType: string) => {
			map.set(
				spiritType,
				data.filter(
					(spirit: Spirit) => spirit.type === spiritType.toLowerCase()
				)
			);
		});

		setCollectionMap(map);
		setLoading(false);
	};

	const toggleDeleteMode = () => {
		setDeleteMode(deleteMode ? false : true);
	};

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		loadData();
		setShouldReloadCollection(false);
	}, [shouldReloadCollection]);

	return (
		<div id="my-collection">
			<div className="header">
				<h2>My Collection</h2>
				<div className="actions">
					<button
						className={`button button-outline ${
							deleteMode ? 'hidden' : ''
						}`}
						onClick={() => toggleDeleteMode()}
					>
						<i className="fas fa-lg fa-trash-alt"></i>
						<span>{deleteMode ? 'Done' : 'Delete'}</span>
					</button>
				</div>
			</div>
			<div className="collection-items">
				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						{collectionMap === null || collectionMap?.size === 0 ? (
							<div className="empty-collection-message">
								<span>
									Looks like your collection is empty!
									<i className="far fa-fw fa-lg fa-frown-open"></i>
								</span>
							</div>
						) : (
							[...collectionMap].map((item, index) => {
								const spiritType = item[0];
								const spirits = item[1];

								return (
									<div
										className="collection-item"
										key={index}
									>
										<h3 className="spirit-type">
											{spiritType}
										</h3>
										<Cards
											deleteMode={deleteMode}
											spirits={spirits}
										/>
									</div>
								);
							})
						)}
					</>
				)}
			</div>
			<Link className="circle-button" to="/collection/add">
				<i className="fas fa-fw fa-plus"></i>
			</Link>
		</div>
	);
};

export default Collection;
