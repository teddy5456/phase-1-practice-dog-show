document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => {
      const table = document.querySelector('table');

      dogs.forEach(dog => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
            <td>${dog.sex}</td>
          <td><button data-id="${dog.id}" class="edit-btn">Edit</button></td>
        `;
        table.appendChild(tr);
      });
    });
})


const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(button => {
  button.addEventListener('click', () => {
   
    const dogId = button.getAttribute('data-id');

    fetch(`http://localhost:3000/dogs/${dogId}`)
      .then(response => response.json())
     
      .then(dog => {

        document.querySelector('#name').value = dog.name;
         document.querySelector('#breed').value = dog.breed;
        document.querySelector('#sex').value = dog.sex;
        document.querySelector('#dog-id').value = dog.id;
      });
  });
});


const form = document.querySelector('#dog-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const dogId = document.querySelector('#dog-id').value;
  const name = document.querySelector('#name').value;
  const breed = document.querySelector('#breed').value;
  const sex = document.querySelector('#sex').value;

  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex
    })
  })
  .then(response => response.json())
  .then(updatedDog => {
    const tableBody = document.querySelector('#table-body');

   
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      if (row.querySelector('.edit-btn').getAttribute('data-id') === updatedDog.id.toString()) {
        row.innerHTML = `
          <td>${updatedDog.name}</td>
          <td>${updatedDog.breed}</td>
          <td>${updatedDog.sex}</td>
          <td><button data-id="${updatedDog.id}" class="edit-btn">Edit</button></td>
        `;
      }
    });

   
    document.querySelector('#name').value = '';
    document.querySelector('#breed').value = '';
    document.querySelector('#sex').value = '';
    document.querySelector('#dog-id').value = '';
  });
});

