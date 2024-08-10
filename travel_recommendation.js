const searchBtn = document.getElementById("search");
const clearBtn = document.getElementById("clear");
const resultDiv = document.getElementById("result");
let data = {};

function searchRecommendations() {
  const inputElement = document.getElementById("searchInput");
  const input = inputElement.value.toLowerCase();
  resultDiv.innerHTML = "";

  function searchInCategory(category) {
    category.forEach((item) => {
      if(item.name.toLowerCase().includes(input) || item.description.toLowerCase().includes(input)) {
        const resulCard = `
            <div class="card">
                <img src="${item.imageUrl}">
                <div class="card-content">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <button>Visit</button>
                </div>
            </div>
        `
        resultDiv.innerHTML += resulCard;
      }
    });
  }

  data.countries.forEach(country => {
    searchInCategory(country.cities);
  })

  searchInCategory(data.temples);

  searchInCategory(data.beaches);
}

function fetchData() {
  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
    })
    .catch((error) => {
      console.log(error);
    });
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    resultDiv.innerHTML = "";
}

searchBtn.addEventListener("click", searchRecommendations);
clearBtn.addEventListener("click", clearSearch);

window.onload = fetchData;