import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { ErrorContext } from '../contexts/ErrorContext';
import { UserContext } from '../contexts/UserContext';
import { signin } from '../service/accountService';

const SignIn: React.FC = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const userContext = useContext(UserContext);
	const errorContext = useContext(ErrorContext);
	const history = useHistory();

	const onSubmit = async (data: any) => {
		const error = await signin(data.email, data.password, data.rememberMe);

		if (error) {
			errorContext.message = error;
		} else {
			if (userContext.user) {
				errorContext.message = null;
				history.push('/collection');
			}
		}
	};

	useEffect(() => {
		if (userContext.user !== null) {
			history.push('/search');
		}
	}, [userContext.user]);

	return (
		<div className="form-container">
			<form id="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
				<h2>Sign in</h2>
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
				<p>Don't have an account?</p>
				<Link className="button" to="/signup">
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default SignIn;
