
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      })
      .then((res) => this._checkResponce(res));    
}

getNewCard() {
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    })
    .then((res) => this._checkResponce(res));    
}

}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "260f3e4b-e160-43cd-8335-e153b3805f81",
//     "Content-Type": "application/json",
//   },
// }); 



export default Api;

