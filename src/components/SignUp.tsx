import React from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
	return (
		<div className="form-container">
			<form id="sign-up-form">
				<h2>Sign up</h2>
				<fieldset>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="awesomeemail@website.com"
						name="email"
					/>

					<label htmlFor="password">Password</label>
					<input id="password" type="password" name="password" />

					<div>
						<input type="checkbox" id="rememberMe" />
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
