import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
	isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	isAuthenticated,
	children,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: {
								from: location,
							},
						}}
					/>
				);
			}}
		/>
	);
};

export default ProtectedRoute;
