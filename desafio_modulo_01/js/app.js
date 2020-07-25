let tabUsers = null;

let allUsers = [];

addEventListener('load', () => {
  tabUsers = document.querySelector('#users');

  const search = document.querySelector('#search');
  const btnSearch = document.querySelector('#btnSearch');

  const genderMale = document.querySelector('#gender_m');
  const genderFemale = document.querySelector('#gender_f');
  const sum_ages = document.querySelector('#sum_ages');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const data = await res.json();

  allUsers = data.results
    .map((user) => {
      const { name, age, avatar, gender } = user;
      return {
        name,
        age: user.dob.age,
        avatar: user.picture.thumbnail,
        gender,
      };
    })
    .filter((user) =>
      user.name.first.toUpperCase().startsWith(search.value.toUpperCase())
    );

  render();
}

function render() {
  renderUser();
}

function renderUser() {
  let usersHTML = '<div id="users-list">';

  allUsers.forEach((user) => {
    const { name, age, avatar } = user;

    const userHTML = `
      '<div className="row valign-wrapper">'
        <div class="col s2">
          <img src="${avatar}" alt="${name.first} ${name.last}"/>
        </div>
        <div class="col s10">
          <span className="black-text">${name.first} ${name.last} ,${age}</span>
        </div>
      </div>
    `;
    usersHTML += userHTML;
  });

  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;
}

function clearDivUsers() {
  users.innerHTML = '';
}

function handleStatitics(data) {
  const totalAges = data.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  const totalMales = data.reduce((accumulator, current) => {
    return accumulator + current.gender;
  }, 0);

  sum_ages.textContent = totalAges;
}
