const loadAllPlayer = (searchText) => {
  const url = `https:\\www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayData(data.player);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayData = (data) => {
  const parent = document.getElementById("card-container");
  // to clear inner content of parent mealContainer when it starts the search.
  parent.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");

    card.innerHTML = `
        <div class="card my-3 text-center" style="width: 18rem;">
            <img src="${item.strThumb}" class="card-img-top w-50 mx-auto py-3 rounded-circle" alt="card image">
            <div class="card-body">
                <h5 class="card-title">${item.strPlayer}</h5>
                <p class="card-text">ID: ${item.idPlayer}</p>

                <p class="card-text mt-4 mb-1">Sport:<b> ${item.strSport}</b></p>
                <p class="card-text mt-1 mb-4">Position: <b>${item.strPosition}</b></p>

                <p class="my-1">Team: ${item.strTeam}</p>
                <p class="my-1">Gender: ${item.strGender}</p>

                <div class = "d-flex gap-5 justify-content-center align-items-center my-3">
                  <a href="${item.strFacebook}" target="_blank">
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                  <a href="${item.strInstagram}" target="_blank">
                    <i class="fa-brands fa-square-instagram"></i>
                  </a>
                  <a href="${item.strTwitter}" target="_blank">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                </div>

                <button class="btn btn-info my-3 me-3 id="add-to-cart" onClick="handle_add_to_cart(${item.idPlayer})">Add to cart</button>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary my-3" onclick = "loadPlayerDetails(${item.idPlayer})" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button>
            </div>
        </div>
  `;

    parent.appendChild(card);
  });
};

const handleSearch = () => {
  const search_btn = document.getElementById("search-btn");
  search_btn.addEventListener("click", () => {
    const input = document.getElementById("search-text");
    const input_text = input.value;
    // console.log(input_text);

    if (input_text.length > 0) {
      loadAllPlayer(input_text);
      input.value = "";
    } else {
      // for initial loading
      loadAllPlayer("bolt");
    }
  });
};

const handle_add_to_cart = (id) => {
  const url = `https:\\www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const player = data.players[0];
      //   console.log(player.strPlayer);

      const parent = document.getElementById("cart");
      const player_count = document.getElementById("cart-count");
      let player_count_number = parseInt(player_count.innerText);

      const p = document.createElement("p");
      p.innerText = player.strPlayer;
      player_count_number++;

      const child = parent.childNodes;
      flag = false;
      child.forEach((element) => {
        // console.log(element.innerText);
        if (player.strPlayer == element.innerText) flag = true;
      });

      if (flag == false) {
        if (player_count_number <= 11) {
          parent.appendChild(p);
          player_count.innerText = player_count_number;
        } else {
          alert("You can not add more than 11 members.");
        }
      } else {
        alert(`You have already added "${player.strPlayer}"`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadPlayerDetails = (id) => {
  const url = `https:\\www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const item = data.players[0];
      // console.log(player.strPlayer);

      // to show in the modal window
      document.getElementById("exampleModalLabel").innerText = item.strPlayer;
      const playerDetailsBody = document.getElementById("modal-body");
      playerDetailsBody.innerHTML = `
        <img class="img-fluid rounded-5 w-75 mb-3" src="${item.strThumb}" alt="Thumb image">
        <div class="row text-start">
          <div class="col-12 col-md-6 p-3">
            <h5 class="my-1">${item.strPlayer}</h5>
            <p class="my-1">ID: ${item.idPlayer}</p>

            <p class="mt-4 mb-1">Sport:<b> ${item.strSport}</b></p>
            <p class="mt-1 mb-4">Position: <b>${item.strPosition}</b></p>

            <p class="my-1">Country: ${item.strNationality}</p>
            <p class="my-1">Place of Birth: ${item.strBirthLocation}</p>            
          </div>

          <div class="col-12 col-md-6 p-3">
            <p class="my-1">Date of Birth: ${item.dateBorn}</p>
            <p class="my-1">Ethnicity: ${item.strEthnicity}</p>
            
            <p class="mt-4 mb-1">Height: ${item.strHeight}</p>
            <p class="mt-1 mb-4">Weight: ${item.strWeight}</p>

            <p class="my-1">Gender: ${item.strGender}</p>
            <p class="my-1">Team: ${item.strTeam}</p>
            <p class="my-1">Salary: ${item.strWage}</p>
            
            </div>
            </div>

          <h5 class="mt-4 my-1">Extra Info:</h5>
          <p class="mt-4 my-1">Description: ${item.strDescriptionEN}</p>
    `;
    })
    .catch((err) => {
      console.log(err);
    });
};

handleSearch();

// for initial loading
loadAllPlayer("bolt");
