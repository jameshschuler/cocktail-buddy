import * as firebase from 'firebase/app';
import 'milligram';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/app.scss';

export const app = firebase.initializeApp({
	apiKey: 'AIzaSyCpeTDJJcwgRmPstxWv092NPSH2lUBpHYA',
	authDomain: 'cocktail-buddy-ebdcc.firebaseapp.com',
	databaseURL: 'https://cocktail-buddy-ebdcc.firebaseio.com',
	projectId: 'cocktail-buddy-ebdcc',
	storageBucket: 'cocktail-buddy-ebdcc.appspot.com',
	messagingSenderId: '112177370180',
	appId: '1:112177370180:web:b3cc2df85e3ed245701811',
	measurementId: 'G-BK271LJHN6',
});

function App() {
	return (
		<Router>
			<Header />
			<Content />
			<Footer />
		</Router>
	);
}

export default App;
