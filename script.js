const spinner = document.getElementById('spinner');
const userInput = document.getElementById('user-input');
const notFoundElem = document.getElementById('not-found');
const loadMoreBtn = document.getElementById('load-more-btn');

// user phone search button event handler
document.getElementById('user-btn').addEventListener('click', function (e) {
  e.preventDefault();
  spinner.classList.remove('d-none');
  loadData(userInput.value, 10);
});

// load more data
loadMoreBtn.addEventListener('click', function () {
  spinner.classList.remove('d-none');
  loadMoreBtn.classList.remove('d-none');
  loadData(userInput.value);
});

// load data from api call
const loadData = async (name, quantity) => {
  try {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${name}`;
    const res = await fetch(URL);
    const data = await res.json();
    spinner.classList.add('d-none');
    displayData(data.data, quantity);
  } catch (err) {
    console.log(err);
  }
};

// display data on ui
const displayData = (data, quantity) => {
  const phoneContainer = document.getElementById('phone-container');

  phoneContainer.innerHTML = '';
  // slice show 10 phones
  if (quantity && data.length > 10) {
    data = data.slice(0, 10);
    loadMoreBtn.classList.remove('d-none');
  } else {
    loadMoreBtn.classList.add('d-none');
  }

  data.forEach((phone) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}" />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <button onclick="handleDetails('${phone.slug}')" class="btn btn-primary" 
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">Details</button>
            </div>
        </div>
    `;
    console.log(phone);
    phoneContainer.appendChild(div);
  });
  if (data.length === 0) {
    notFoundElem.classList.remove('d-none');
  } else {
    notFoundElem.classList.add('d-none');
  }
};

async function handleDetails(id) {
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  showDataInModal(data.data);
}

// show data on modal
function showDataInModal(data) {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  modalTitle.innerText = data.name;
  modalBody.innerHTML = `
    <h3>Brand: ${data?.brand}</h3>
    
  `;
  console.log(data);
}
