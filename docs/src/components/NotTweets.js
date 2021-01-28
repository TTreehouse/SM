import NotATweet from "./NotATweet";

const NotTweets = ({ notTweets }) => {
	return (
		<>
			{notTweets.map((notTweet, index) => (
				<NotATweet
					className='text-content not-tweets'
					key={index}
					notTweets={notTweet}
				/>
			))}
		</>
	);
};

export default NotTweets;
