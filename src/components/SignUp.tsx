import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ErrorContext } from '../contexts/ErrorContext';
import { UserContext } from '../contexts/UserContext';
import { signup } from '../service/accountService';

const SignUp: React.FC = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const userContext = useContext(UserContext);
	const errorContext = useContext(ErrorContext);
	const { state }: any = useLocation();
	const [shouldRedirect, setShouldRedirect] = useState(false);

	const onSubmit = async (data: any) => {
		const error = await signup(data.email, data.password, data.rememberMe);

		if (error) {
			errorContext.message = error;
		} else {
			if (userContext.user) {
				errorContext.message = null;
				setShouldRedirect(true);
			}
		}
	};

	if (userContext.user !== null) {
		return <Redirect to={'/collection'} />;
	}

	if (shouldRedirect) {
		return <Redirect to={state?.from || '/collection'} />;
	}

	return (
		<div className="form-container">
			<form
				className="form"
				id="sign-up-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2>Sign up</h2>
				{errorContext.message && (
					<div className="error-message">{errorContext.message}</div>
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