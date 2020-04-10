const baseURL = 'http://localhost:3000/api/scores/'


export default {
  getScores(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  postScore(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },
  updateScore(score) {
    return fetch(baseURL + score._id, {
      method: 'PUT',
      body: JSON.stringify(score),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  },
  deleteScore(id){
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  }
}
