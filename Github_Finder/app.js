// Initialize-instantiate new class Github from github.js
const github = new Github;

// Instantiate new class from UI
const ui = new UI;

// Search Input
const searchUser = document.getElementById('searchUser');


// Search Input Event Listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;
  console.log(userText);

  if (userText !== '') {
    // Make http call
    github.getUser(userText) // returns a promise
      .then(data => {
        if (data.profile.message === 'Not Found') {
          // Show Alert
          ui.showAlert('User not found', 'alert alert-danger');
        } else {
          // Show Profile
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      })
  } else {
    // Clear Profile
    ui.clearProfile();  
  }
});
