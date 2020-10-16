import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Action, search } from '../api/api';

interface SearchProps {
	callback: (searchedSpirit: string, results: any) => any;
}

const Search: React.FC<SearchProps> = ({ callback }) => {
	const [spirits, setSpirits] = useState([
		{ label: 'Vodka', value: 'vodka' },
		{ label: 'Tequila', value: 'tequila' },
		{ label: 'Bourbon', value: 'bourbon' },
		{ label: 'Gin', value: 'gin' },
		{ label: 'Brandy', value: 'brandy' },
		{ label: 'Cognac', value: 'cognac' },
		{ label: 'Mezcal', value: 'mezcal' },
		{ label: 'Rum', value: 'rum' },
		{ label: 'Scotch', value: 'scotch' },
		{ label: 'Vermouth', value: 'vermouth' },
	]);
	const { register, handleSubmit, watch, errors } = useForm();
	const onSubmit = async (data: any) => {
		const results = await search(Action.Filter, data.spirit);
		callback(data.spirit, results);
	};

	// TODO: Implement loader
	return (
		<div id="search">
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<select
						id="spirit-selector"
						name="spirit"
						ref={register({ required: true })}
					>
						{spirits.map((option, index) => {
							return (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							);
						})}
					</select>
					<button
						className="button-primary button-outline"
						type="submit"
					>
						<i className="fas fa-search fa-fw fa-lg"></i>
					</button>
				</fieldset>
			</form>
		</div>
	);
};

export default Search;
