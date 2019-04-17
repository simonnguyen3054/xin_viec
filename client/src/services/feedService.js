export const _loadPosts = () => {
  return fetch("http://localhost:3001/api/feed")
    .then(res => res.json())
}

export const _createPost = (username, job_id, phone_number, post_content, job_location, experience, salary, post_date) => {
	return fetch("http://localhost:3001/api/post/create", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({username, job_id, phone_number, post_content, job_location, experience, salary, post_date})
	  }).then(res => res.json())
}
