import React, { useEffect, useState } from 'react';
import { auth } from '../App';
import { UserContext } from '../contexts/UserContext';

const UserProvider: React.FC = (props) => {
	const [user, setUser] = useState<firebase.User | null>(null);

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			setUser(userAuth);
		});
	}, []);

	return (
		<UserContext.Provider value={{ user }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
