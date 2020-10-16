import 'milligram';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/app.scss';

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
