import firebase from 'firebase';
import 'milligram';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Loader from './components/helpers/Loader';
import Navbar from './components/Navbar';
import Provider, { UserContext } from './context/AppContext';
import './styles/app.scss';

firebase.initializeApp({
	apiKey: 'AIzaSyCpeTDJJcwgRmPstxWv092NPSH2lUBpHYA',
	authDomain: 'cocktail-buddy-ebdcc.firebaseapp.com',
	databaseURL: 'https://cocktail-buddy-ebdcc.firebaseio.com',
	projectId: 'cocktail-buddy-ebdcc',
	storageBucket: 'cocktail-buddy-ebdcc.appspot.com',
	messagingSenderId: '112177370180',
	appId: '1:112177370180:web:b3cc2df85e3ed245701811',
	measurementId: 'G-BK271LJHN6',
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
	const [loading, setLoading] = useState(true);
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			setUser(userAuth);
			setLoading(false);
		});
	}, [user]);

	return (
		<Router>
			<Provider>
				<Navbar />
				<div id="content">{loading ? <Loader /> : <Content />}</div>
				<Footer />
			</Provider>
		</Router>
	);
}

export default App;
