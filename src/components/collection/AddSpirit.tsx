import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/AppContext';
import { spiritOptions, tastingNotes } from '../../models/data/data';
import { addSpirit } from '../../service/collectionService';
import { validateImage } from '../../utils/validateImage';
import TastingNote from './TastingNote';

const AddSpirit: React.FC = () => {
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		errors,
		watch,
		clearErrors,
	} = useForm();
	const history = useHistory();
	const { error, setGlobalError } = useContext(UserContext);
	const [spirits, setSpirits] = useState(spiritOptions);
	const [selectedTastingNotes, setSelectedTastingNotes] = useState<
		Array<string>
	>([]);

	const imgValue = watch('img');

	useEffect(() => {
		const isValid = validateImage(imgValue);

		if (!isValid) {
			setError('img', { message: 'Invalid file.' });
			setValue('img', null);
		} else {
			clearErrors('img');
		}
	}, [imgValue]);

	const onSubmit = handleSubmit(
		async ({ brand, name, type, quantity, description, img }) => {
			const error = await addSpirit({
				brand,
				name,
				type,
				quantity,
				description,
				tastingNotes: selectedTastingNotes,
				img,
			});

			if (error) {
				setGlobalError(error.message);
			} else {
				// TODO: add context for global message
				history.push('/collection');
			}
		}
	);

	const toggle = (note: string) => {
		if (selectedTastingNotes.includes(note)) {
			setSelectedTastingNotes(
				selectedTastingNotes.filter((n) => n === note)
			);
		} else {
			setSelectedTastingNotes([...selectedTastingNotes, note]);
		}
	};

	return (
		<div className="form-container">
			<form className="form" onSubmit={onSubmit}>
				<h2>Add Spirit</h2>
				{error && <div className="error-message">{error}</div>}
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
					<label htmlFor="name">Brand *</label>
					<input
						id="brand"
						type="text"
						placeholder=""
						name="brand"
						ref={register({ required: true })}
						className={errors.brand ? 'error' : ''}
					/>
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
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						name="description"
						ref={register()}
					></textarea>
					<label htmlFor="img">Image</label>
					<input
						type="file"
						name="img"
						id="img"
						ref={register({
							validate: (value: any) => {
								const isValid = validateImage(value);

								if (!isValid) {
									setValue('img', null);
								}

								return isValid;
							},
						})}
					/>
					{errors.img && (
						<blockquote className="error">
							<p>
								<em>Must be a jpeg/jpg, png, or gif format.</em>
							</p>
						</blockquote>
					)}
					<label>Tasting Notes</label>
					<div className="tasting-notes">
						{tastingNotes.map((note: string, index: number) => {
							return (
								<TastingNote
									toggle={toggle}
									key={index}
									note={note}
								/>
							);
						})}
					</div>

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
