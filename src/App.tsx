import * as firebase from 'firebase/app';
import 'milligram';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserProvider from './providers/UserProvider';
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
	return (
		<Router>
			<UserProvider>
				<Navbar />
				<Content />
				<Footer />
			</UserProvider>
		</Router>
	);
}

export default App;
