document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJson);

document.getElementById('button3').addEventListener('click', getExternal);


// Get local text file data
function getText() {
  fetch('test.txt') // returns a promise
    .then(res => res.txt())
    .then(data => {
      console.log(data);
      document.getElementById('output').innerHTML = data;
    })
    .catch(err => console.log(err)); // if an error is thrown catch will do something with it
}


// Get local JSON file data
function getText() {
  fetch('post.json') // returns a promise
    .then(res => res.json()) // returns a promise
    .then(data => {
      console.log(data);
      let output = '';
      data.forEach(function(post) {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err)); // if an error is thrown catch will do something with it
}


// Get from external API
function getExternal() {
  fetch('https://api.github.com/users') // returns a promise
    .then(res => res.json()) // returns a promise
    .then(data => {
      console.log(data);
      let output = '';
      data.forEach(function(user) {
        output += `<li>${user.login}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}