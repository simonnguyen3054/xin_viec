export const _loadPosts = () => {
  const settings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return fetch("/api/feed", settings)
    .then(res => res.json())
}

export const _createPost = (fullName, job_id, phone_number, post_content, job_location, experience, salary) => {
	return fetch("/api/post/create", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({fullName, job_id, phone_number, post_content, job_location, experience, salary})
	  }).then(res => res.json())
}

export const _loadPostItem = (post_id) => {

  const settings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return fetch(`/api/posts/${post_id}`, settings)
    .then(res => res.json())
}
