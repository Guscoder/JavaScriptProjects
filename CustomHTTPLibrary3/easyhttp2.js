/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 2.0.0
 * @author  Justin Gustafson
 * @license MIT
 *
 **/

class EasyHTTP {
  // Make HTTP GET Request
  async get(url) {

    const response = await fetch(url);

    const resData = await response.json();

    return resData;

    // return new Promise((resolve, reject) => {
    //   fetch(url)
    //     .then(res => res.json())
    //     .then(data => resolve(data))
    //     .catch(err => reject(err));
    // });
  }

  // Make an HTTP POST Request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const resData = await response.json();
    return resData;

    //      return new Promise((resolve, reject) => {
    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    //     .then(res => res.json())
    //     .then(data => resolve(data))
    //     .catch(err => reject(err));
    // });
  }

  // Make an HTTP PUT Request
  async put(url, data) {
    const response = fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }); 

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP DELETE Request
  async delete(url) {
    const response = fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    }); 
    const resData = await 'Resoucre deleted...';
    return resData;
  }
}

 