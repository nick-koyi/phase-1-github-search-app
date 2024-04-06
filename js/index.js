document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('github-form');
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');
  input.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = e.target.querySelector('input').value.trim();

    fetch(`https://api.github.com/search/users?q=${inputValue}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        userList.innerHTML = ''; // Clear previous search results
        data.items.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `<img src=${item.avatar_url} width='30px'> ${item.login} <a href=${item.html_url} target='_blank'>Github</a>`;
          li.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${item.login}/repos`, {
              headers: {
                Accept: 'application/vnd.github.v3+json',
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((repos) => {
                reposList.innerHTML = ''; // Clear previous repositories
                repos.forEach((repo) => {
                  const repoLi = document.createElement('li');
                  repoLi.textContent = repo.name;
                  reposList.appendChild(repoLi);
                });
              });
          });
          userList.appendChild(li);
        });
      });

    // Clear the input box
    e.target.querySelector('input').value = '';
  });
});
