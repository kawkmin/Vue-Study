import axios from 'axios';

function create(baseURL, options) {
	const instance = axios.create({
		baseURL: baseURL,
		...options,
	});
	return instance;
}

export const posts = create('http://localhost:5000/posts');