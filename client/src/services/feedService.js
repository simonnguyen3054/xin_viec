export const _loadPosts = () => {
  return fetch("http://localhost:3001/api/feed")
    .then(res => res.json())
}