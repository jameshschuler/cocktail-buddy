import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorContext';
import { addSpirit } from '../../service/collectionService';

const AddSpirit: React.FC = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const errorContext = useContext(ErrorContext);
	const history = useHistory();

	const [spirits, setSpirits] = useState([
		{ label: 'Bourbon', value: 'bourbon' },
		{ label: 'Brandy', value: 'brandy' },
		{ label: 'Cognac', value: 'cognac' },
		{ label: 'Gin', value: 'gin' },
		{ label: 'Mezcal', value: 'mezcal' },
		{ label: 'Rum', value: 'rum' },
		{ label: 'Scotch', value: 'scotch' },
		{ label: 'Tequila', value: 'tequila' },
		{ label: 'Vermouth', value: 'vermouth' },
		{ label: 'Vodka', value: 'vodka' },
	]);

	const onSubmit = handleSubmit(async ({ name, type, quantity }) => {
		const error = await addSpirit({ name, type, quantity });

		if (error) {
			errorContext.message = error;
		} else {
			// TODO: add context for global message
			history.push('/collection');
		}
	});

	return (
		<div className="form-container">
			<form className="form" onSubmit={onSubmit}>
				<h2>Add Spirit</h2>
				{errorContext.message && (
					<div className="error-message">{errorContext.message}</div>
				)}
				<fieldset>
					<label htmlFor="name">Type *</label>
					<select
						id="type"
						placeholder="-- Select Type --"
						name="type"
						ref={register({ required: true })}
						className={errors.type ? 'error' : ''}
					>
						{spirits.map((option, index) => {
							return (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							);
						})}
					</select>
					<label htmlFor="name">Name *</label>
					<input
						id="name"
						type="text"
						placeholder=""
						name="name"
						ref={register({ required: true })}
						className={errors.name ? 'error' : ''}
					/>
					<label htmlFor="name">Quantity *</label>
					<select
						id="quantity"
						placeholder="-- Select Quantity --"
						name="quantity"
						ref={register({ required: true })}
						className={errors.quantity ? 'error' : ''}
					>
						{Array.from(Array(10).keys(), (index, x) => {
							return (
								<option key={index} value={x + 1}>
									{x + 1}
								</option>
							);
						})}
					</select>
					<button
						className="float-right button-primary"
						type="submit"
					>
						<i className="fas fa-fw fa-lg fa-chevron-circle-right"></i>
					</button>
				</fieldset>
			</form>
		</div>
	);
};

export default AddSpirit;
