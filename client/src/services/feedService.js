export const _loadPosts = () => {
  return fetch("http://localhost:3001/api/feed")
    .then(res => res.json())
}

export const _createPost = (fullName, job_id, phone_number, post_content, job_location, experience, salary) => {
	return fetch("http://localhost:3001/api/post/create", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({fullName, job_id, phone_number, post_content, job_location, experience, salary})
	  }).then(res => res.json())
}
