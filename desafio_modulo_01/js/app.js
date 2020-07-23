const users = document.querySelector('#users');

addEventListener('load', () => {
  doFetch();
});

async function doFetch() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const data = await res.json();
  showData(data);
}

function showData(data) {
  const dataResults = data.results;

  for (let dataResult of dataResults) {
    addUser(dataResult);
  }
}

function addUser(data) {
  const rowValignWrapper = document.createElement('div');
  rowValignWrapper.classList.add('row', 'valign-wrapper');

  function addImageProfile() {
    const col = document.createElement('div');
    col.classList.add('col', 's2');

    const imageUser = document.createElement('img');
    imageUser.src = data.picture.thumbnail;
    imageUser.classList.add('circle', 'responsive-img');

    col.appendChild(imageUser);
    rowValignWrapper.appendChild(col);
    users.appendChild(rowValignWrapper);
  }

  function addDescriptionProfile() {
    const col = document.createElement('div');
    col.classList.add('col', 's10');

    const descriptionUser = document.createElement('span');
    descriptionUser.classList.add('black-text');
    descriptionUser.innerText = `${data.name.first} ${data.name.last}, ${data.dob.age} anos`;

    col.appendChild(descriptionUser);
    rowValignWrapper.appendChild(col);
    users.appendChild(rowValignWrapper);
  }

  addImageProfile();
  addDescriptionProfile();
}
