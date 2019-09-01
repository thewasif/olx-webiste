let imgs = []

const check_login = () => {
    let auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if(user){
        document.querySelector('main').innerHTML = `
        <h1 style="font-family: 'Raleway'; text-align: center">Create New Add</h1>
        <center>
          <div class="form">
            <input type="text" placeholder="Ad Title" id="title">
            <input type="number" placeholder="Price" id="price">
            <select id="category">
              <option value="automobiles">Auto mobiles</option>
              <option value="gadgets">Gadgets</option>
              <option value="tools">Tools</option>
              <option value="property">Property / House</option>
            </select>
            <input type="text" placeholder="Location" id="location">
            <input type="text" placeholder="Phone Number:" id="phone_number">
            <input type="file" id="img_file">
            <textarea id="desc" rows="4" placeholder="Write a brief detail about your product"></textarea>
            <p id="error-message"></p>
            <button onclick="add_ad_data()" class='btn'><i class="fa fa-upload"></i> Post Ad</button>
          </div>
        </center>
        `;
        // File Reader....for image
        let img = document.querySelector('#img_file');
        img.addEventListener('change', () => {
          let file = img.files[0];
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            imgs.unshift(reader.result);
          });
          if (file) {
            reader.readAsDataURL(file);
          }
        })
      }else{
        document.querySelector('main').innerHTML = `
        <h1 style="font-family: 'Raleway'; text-align: center">To create an ad, login first!</h1>
        `;
      }
    })
}


const add_ad_data = () => {
  let title = document.querySelector('#title').value,
      price = document.querySelector('#price').value,
      location = document.querySelector('#location').value,
      category = document.querySelector('#category').value,
      desc = document.querySelector('#desc').value,
      number = document.querySelector('#phone_number').value,
      img = document.querySelector('#img_file');

      // form varification...
      if (title.length < 4) {
        return notification("Title is too short!", 'warning', 1500);
      }else if (price < 20) {
        return notification("Price is too low", 'warning', 1500);
      }else if (location.length < 4) {
        return notification("Location not found", "warning", 1500);
      }else if(desc.length < 10){
        return notification("Desctiption is too short!", "warning", 1500);
      }else if (img.files[0] == undefined) {
        return notification("Please insert an Image for ad.", "warning", 1500);
      }



      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          let ad_title = title.split(" ").join("_");
          let collection_name = user.displayName.split(' ').join('_');
          // Add data in Firebase Firestore
          let db = firebase.firestore().collection(collection_name).doc(ad_title);
          db.set({
            title,
            price,
            location,
            category,
            desc,
            number,
            img: imgs[0],
            obj: {
              title,
              price,
              location,
              category,
              desc,
              number,
              img: imgs[0],
            }
          }).then(() => notification("Ad has been created succesfully!", "success", 3500))
            .catch((e) =>{console.log(e.message); notification("There is a problem uploading your ad!", 'warning', 35000)});
        }else{
          notification("A problem accoured. Login again!", 'danger', 3000);
        }
      })


}
