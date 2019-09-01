let firestore = firebase.firestore();

const load_ads = () => {
  document.querySelector('.cards-container').innerHTML = "";
  category = document.querySelector('#category-select').value;
  console.log(category);
  let users;
  if(category == 'all'){
    users = [];
    firestore.collection('users').get().then((res) => {
      res.forEach((e) => {
        users.push(e.id);
      })
      console.log(users);
      for (let user of users) {
        firestore.collection(user).get().then((id) => {
          console.log(`Fetching data from ${user}...`);
          id.forEach((e) => {
            document.querySelector('.cards-container').innerHTML += `
              <div class="card">
                <img src='${e.data().img}' class="card-img"/>
                <div class="card-body">
                  <h2>${e.data().title}</h2>
                  <p class="price">Rs. ${e.data().price}</p>
                  <p class='location'><i class="fa fa-map-marker-alt"></i> ${e.data().location}</p>
                </div>
                <div class='btn-group'>
                  <button class="btn" onclick='modal("show", ${JSON.stringify(e.data().obj)})'>View More</button>
                <div>
              </div>
              `;
          });
        })

      }
    })

  }else if (category == 'automobiles') {
    users = [];
    firestore.collection('users').get().then((res) => {
      res.forEach((e) => {
        users.push(e.id);
      })
      console.log(users);
      for (let user of users) {
        firestore.collection(user).where('category', '==', 'automobiles').get().then((id) => {
          console.log(`Fetching data from ${user}...`);
          id.forEach((e) => {
            document.querySelector('.cards-container').innerHTML += `
              <div class="card">
                <img src='${e.data().img}' class="card-img"/>
                <div class="card-body">
                  <h2>${e.data().title}</h2>
                  <p class="price">Rs. ${e.data().price}</p>
                  <p class='location'><i class="fa fa-map-marker-alt"></i> ${e.data().location}</p>
                </div>
                <div class='btn-group'>
                  <button class="btn" onclick='modal("show", ${JSON.stringify(e.data().obj)})'>View More</button>
                <div>
              </div>
              `;
          });
        })

      }
    })
  }else if(category == 'gadgets') {
    users = [];
    firestore.collection('users').get().then((res) => {
      res.forEach((e) => {
        users.push(e.id);
      })
      console.log(users);
      for (let user of users) {
        firestore.collection(user).where('category', '==', 'gadgets').get().then((id) => {
          console.log(`Fetching data from ${user}...`);
          id.forEach((e) => {
            document.querySelector('.cards-container').innerHTML += `
              <div class="card">
                <img src='${e.data().img}' class="card-img"/>
                <div class="card-body">
                  <h2>${e.data().title}</h2>
                  <p class="price">Rs. ${e.data().price}</p>
                  <p class='location'><i class="fa fa-map-marker-alt"></i> ${e.data().location}</p>
                </div>
                <div class='btn-group'>
                  <button class="btn" onclick='modal("show", ${JSON.stringify(e.data().obj)})'>View More</button>
                <div>
              </div>
              `;
          });
        })

      }
    })
  }else if (category == 'tools') {
    users = [];
    firestore.collection('users').get().then((res) => {
      res.forEach((e) => {
        users.push(e.id);
      })
      console.log(users);
      for (let user of users) {
        firestore.collection(user).where('category', '==', 'tools').get().then((id) => {
          console.log(`Fetching data from ${user}...`);
          id.forEach((e) => {
            document.querySelector('.cards-container').innerHTML += `
              <div class="card">
                <img src='${e.data().img}' class="card-img"/>
                <div class="card-body">
                  <h2>${e.data().title}</h2>
                  <p class="price">Rs. ${e.data().price}</p>
                  <p class='location'><i class="fa fa-map-marker-alt"></i> ${e.data().location}</p>
                </div>
                <div class='btn-group'>
                  <button class="btn" onclick='modal("show", ${JSON.stringify(e.data().obj)})'>View More</button>
                <div>
              </div>
              `;
          });
        })

      }
    })
  }else if (category == 'property') {
    users = [];
    firestore.collection('users').get().then((res) => {
      res.forEach((e) => {
        users.push(e.id);
      })
      console.log(users);
      for (let user of users) {
        firestore.collection(user).where('category', '==', 'property').get().then((id) => {
          console.log(`Fetching data from ${user}...`);
          id.forEach((e) => {
            document.querySelector('.cards-container').innerHTML += `
              <div class="card">
                <img src='${e.data().img}' class="card-img"/>
                <div class="card-body">
                  <h2>${e.data().title}</h2>
                  <p class="price">Rs. ${e.data().price}</p>
                  <p class='location'><i class="fa fa-map-marker-alt"></i> ${e.data().location}</p>
                </div>
                <div class='btn-group'>
                  <button class="btn" onclick='modal("show", ${JSON.stringify(e.data().obj)})'>View More</button>
                <div>
              </div>
              `;
          });
        })

      }
    })
  }
}
window.onload = load_ads('all');


const modal = (state, obj) =>{
  if(state == 'hide'){
    document.querySelector('.modal').style.visibility = 'hidden';
  }else if (state == 'show') {
    document.querySelector('#m-img').setAttribute("src", obj.img)
    document.querySelector('#m-title').innerHTML = obj.title;
    document.querySelector('#m-price').innerHTML = "Rs. " + obj.price;
    document.querySelector('#m-location').innerHTML = obj.location;
    document.querySelector('#m-number').innerHTML = obj.number;
    document.querySelector('#m-desc').innerHTML = obj.desc;
    document.querySelector('.modal').style.visibility = 'visible';
  }

}
