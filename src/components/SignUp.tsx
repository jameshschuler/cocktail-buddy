import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { signup } from '../service/accountService';
import { useStoreState } from '../store/storeModel';

const SignUp: React.FC = () => {
	const { register, handleSubmit, errors } = useForm();
	const { state }: any = useLocation();
	const [serviceError, setServiceError] = useState<string>('');
	const history = useHistory();
	const user = useStoreState((state) => state.user);

	const onSubmit = async (data: any) => {
		const error = await signup(data.email, data.password, data.rememberMe);

		if (error) {
			setServiceError(error);
		} else {
			history.push('/collection');
		}
	};

	if (user !== undefined) {
		return <Redirect to={'/collection'} />;
	}

	return (
		<div className="form-container">
			<form
				className="form form-sm"
				id="sign-up-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2>Sign up</h2>
				{serviceError !== '' && (
					<div className="error-message">{serviceError}</div>
				)}
				<fieldset>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Email Address"
						name="email"
						ref={register({ required: true })}
						className={errors.email ? 'error' : ''}
					/>

					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						ref={register({ required: true })}
						className={errors.password ? 'error' : ''}
					/>

					<div>
						<input
							type="checkbox"
							id="rememberMe"
							name="rememberMe"
							ref={register}
						/>
						<label className="label-inline" htmlFor="rememberMe">
							Remember Me
						</label>
					</div>
					<button
						className="float-right button-primary"
						type="submit"
					>
						<i className="fas fa-fw fa-lg fa-chevron-circle-right"></i>
					</button>
				</fieldset>
			</form>
			<div className="secondary">
				<p>Already have an account?</p>
				<Link className="button" to="/signin">
					Sign in
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
