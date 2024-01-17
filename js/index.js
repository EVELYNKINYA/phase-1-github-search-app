// index.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const searchInput = document.getElementById('search').value;
  
      
      searchGitHubUsers(searchInput)
        .then(displayUsers)
        .catch(handleError);
    });
  
    // Function to search users
    async function searchGitHubUsers(query) {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await response.json();
      return data.items;
    }
  
    // Function to display user information
    function displayUsers(users) {
      userList.innerHTML = '';
  
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}' />
          <span>${user.login}</span>
          <a href='${user.html_url}' target='_blank'>View Profile</a>
        `;
        listItem.addEventListener('click', function () {
        
          getUserRepos(user.login)
            .then(displayRepos)
            .catch(handleError);
        });
  
        userList.appendChild(listItem);
      });
    }
  
    // Function to handle errors
    function handleError(error) {
      console.error('Error:', error.message);
    }
  
    // Function to get user repositories
    async function getUserRepos(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();
      return data;
    }
  
    
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
        `;
        reposList.appendChild(listItem);
      });
    }
  });
  