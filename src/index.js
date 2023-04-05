document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('table-body');
  const dogForm = document.getElementById('dog-form');

  function renderDog(dog) {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = dog.name;
    tr.appendChild(nameTd);
    const breedTd = document.createElement('td');
    breedTd.textContent = dog.breed;
    tr.appendChild(breedTd);
    const sexTd = document.createElement('td');
    sexTd.textContent = dog.sex;
    tr.appendChild(sexTd);
    const editTd = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      dogForm.setAttribute('data-id', dog.id);
    });
    editTd.appendChild(editButton);
    tr.appendChild(editTd);
    tableBody.appendChild(tr);
  }

  function renderDogs(dogs) {
    tableBody.innerHTML = '';
    dogs.forEach(dog => {
      renderDog(dog);
    });
  }

  function getDogs() {
    fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
      .then(dogs => renderDogs(dogs))
      .catch(error => console.error(error));
  }

  function updateDog(event) {
    event.preventDefault();
    const id = dogForm.getAttribute('data-id');
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
      }),
    })
      .then(resp => resp.json())
      .then(() => {
        getDogs();
        dogForm.reset();
      })
      .catch(error => console.error(error));
  }

  dogForm.addEventListener('submit', updateDog);

  getDogs();
});
