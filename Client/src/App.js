import { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import NotTweets from "./components/NotTweets";
import Refresh from "./components/Refresh";

function App() {
	const [notTweets, setTweets] = useState([]);
	useEffect(() => {
		const getTweets = async () => {
			const tweetsFromServer = await fetchTweets();
			setTweets(tweetsFromServer);
			console.log(tweetsFromServer);
		};

		getTweets();
	}, []);

	const fetchTweets = async () => {
		const res = await fetch(`http://14.201.198.86:5000/api/posts`);
		const data = await res.json();

		return data;
	};

	const post = async (text) => {
		const res = await fetch(`http://14.201.198.86:5000/api/posts`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ content: text }),
		});

		const data = await res.json();
		setTweets([data, ...notTweets]);
	};

	const refresh = async () => {
		setTweets([notTweets]);
		console.log("refreshed");
	};

	return (
		<div className='App'>
			<Header text='not twitter' />
			<Post placeholder="what's not happening" onAdd={post} />
			<NotTweets notTweets={notTweets}></NotTweets>
			<Refresh onClick={refresh}></Refresh>
		</div>
	);
}

export default App;
