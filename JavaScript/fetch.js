const requestURL = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url, body = null) {
  const headers = {
      "Content-Type": 'application/json'
  };

  return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
  }).then(response => {
      if(response.ok) {
          return response.json()
      }else{
          return response.json().then(err => {
              const e = new Error("oops...");
              e.data = err;
              throw e
          });
      }
  });
}

// get
// sendRequest('GET', requestURL)
//     .then(data => console.log(data))
//     .catch(err => console.error(err));


//post
const body = {
    name: 'denfed',
    age: '23'
};

sendRequest('POST', requestURL, body)
    .then(data => console.log(data))
    .catch(err => console.error(err));