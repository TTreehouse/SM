import { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import NotTweets from "./components/NotTweets";

function App() {
	const [notTweets, setTweets] = useState([]);
	useEffect(() => {
		const getTasks = async () => {
			const tweetsFromServer = await fetchTweets();
			setTweets(tweetsFromServer);
			console.log(tweetsFromServer);
		};

		getTasks();
	}, []);

	const fetchTweets = async () => {
		const res = await fetch(`http://25.20.184.203:5000/api/posts`);
		const data = await res.json();

		return data;
	};

	const post = async (text) => {
		const res = await fetch(`http://25.20.184.203:5000/api/posts`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ content: text }),
		});

		const data = await res.json();
		setTweets([data, ...notTweets]);
	};

	return (
		<div className='App'>
			<Header text='not twitter' />
			<Post placeholder="what's not happening?" onAdd={post} />
			<NotTweets notTweets={notTweets}></NotTweets>
		</div>
	);
}

export default App;
