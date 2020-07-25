let tabUsers = null;
let allUsers = [];
let globalFilterUsers = [];
let mediaAges = 0;

addEventListener('load', () => {
  tabUsers = document.querySelector('#users');
  mediaAges = document.querySelector('#media_ages');

  fetchUsers();
});

async function fetchUsers() {
  /**
   * API FORA DO AR
   * const fetchAllUsers = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
   *const data = await fetchAllUsers.json();
   */

  // API JAVASCRIPT
  const data = users;

  allUsers = data.results.map((user) => {
    const { name, age, avatar, gender } = user;
    return {
      name,
      age: user.dob.age,
      avatar: user.picture.thumbnail,
      gender,
    };
  });

  globalFilterUsers = [...allUsers];
  render();
}

function render() {
  renderUser();
  filteredUsers();
  totalAges();
  totalGenderMale();
  totalGenderFemale();
  totalMediaAges();
}

function renderUser() {
  tabUsers.innerHTML = '';
  let usersHTML = `
    <div id="users-list">
    <span class="card-title">${globalFilterUsers.length} usuários (as)</span>
    `;

  globalFilterUsers.forEach((user) => {
    const { name, age, avatar } = user;

    const userHTML = `
      <div class="row valign-wrapper">
        <div class="div-image col s2">
          <img src="${avatar}" alt="${name.first} ${name.last}"/>
        </div>
        <div class="col s10">
          <span class="black-text">${name.first} ${name.last}, ${age} anos</span>
        </div>
      </div>
    `;
    usersHTML += userHTML;
  });

  usersHTML += '</div>';
  tabUsers.innerHTML += usersHTML;
}

function filteredUsers() {
  const btnSearch = document.querySelector('#btnSearch');
  const search = document.querySelector('#search');

  btnSearch.addEventListener('click', () => {
    const inputSearch = search.value.toLowerCase();
    searchingUsers(inputSearch);
  });

  search.addEventListener('keyup', (event) => {
    const { key } = event;
    const { value } = event.target;

    if (key !== 'Enter') {
      return;
    }

    searchingUsers(value.toLowerCase());
  });
}

function searchingUsers(inputSearch) {
  globalFilterUsers = allUsers.filter((item) => {
    return (
      item.name.first.toLowerCase().includes(inputSearch) +
      item.name.last.toLowerCase().includes(inputSearch)
    );
  });

  render();
}

function totalGenderMale() {
  const genderMale = document.querySelector('#gender_m');
  const totalMales = globalFilterUsers.filter((user) => user.gender === 'male');
  const sumMales = totalMales.length;

  genderMale.textContent = sumMales;
}

function totalGenderFemale() {
  const genderFemale = document.querySelector('#gender_f');
  const totalFemales = globalFilterUsers.filter(
    (user) => user.gender === 'female'
  );

  const sumFemales = totalFemales.length;

  genderFemale.textContent = sumFemales;
}

function totalAges() {
  const sumAges = document.querySelector('#sum_ages');
  const totalAges = globalFilterUsers.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  sumAges.textContent = totalAges;
}

function totalMediaAges() {
  const totalAges = Number(document.querySelector('#sum_ages').textContent);
  const totalIndexs = globalFilterUsers.length;
  const res = totalAges / totalIndexs;

  mediaAges.textContent = res.toFixed(2);
}
