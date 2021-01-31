import { useState } from "react";

const Post = ({ placeholder, onAdd }) => {
	const [text, setText] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();

		if (!text) {
			alert("please add text to post");
			return;
		}

		onAdd(text);

		setText("");
	};

	return (
		<form onSubmit={onSubmit}>
			<textarea
				className='text-content'
				placeholder={placeholder}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button> dont tweet </button>
		</form>
	);
};

export default Post;
