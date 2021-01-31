import React from "react";

const NotATweet = ({ notTweets }) => {
	return (
		<div className='text-content not-tweets'>
			<h3> {notTweets.content}</h3>
		</div>
	);
};

export default NotATweet;
