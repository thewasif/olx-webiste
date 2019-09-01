const form_open = (form_name) => {
  if(form_name == 'signup'){
    document.querySelector('.form-body').innerHTML = `
      <h1>Sign Up</h1>
      <input type="text" placeholder="Name: " id="username">
      <input type="email" placeholder="Email" id="email"/>
      <input type="password" placeholder="Password" id="pwd"/>
      <div class="btn-group">
        <button class='btn' onclick="createAccount()">Sign Up</button>
      </div>
    `;
  }else if(form_name == 'login'){
    document.querySelector('.form-body').innerHTML = `
      <h1>Log In</h1>
      <input type="email" placeholder="Email" id="email"/>
      <input type="password" placeholder="Password" id="pwd"/>
      <small  style="color: blue; font-family: 'Raleway'; font-size: small;" onclick="sendResetMail()">Forgot Password?</small>
      <div class="btn-group">
        <button class='btn' onclick="logIn()">Log In</button>
      </div>
    `;
  }
}

console.log("File loaded...!");
let auth = firebase.auth();

const sendResetMail = () => {
  let email = prompt("Please provide us your e-mail...");
  auth.sendPasswordResetEmail(email)
    .then(() => notification("Check your email...!", 'primary', 3000))
    .catch((e) => notification("An error occured. Please try again!", 'warning', 3000));                                
}

const createAccount = () => {
  let email = document.getElementById('email').value,
      password = document.getElementById('pwd').value,
      username = document.getElementById('username').value;
  console.log("Running command...");
  auth.createUserWithEmailAndPassword(email, password).then(() => console.log("Success!")).catch((e) => console.log(e.message));
  auth.onAuthStateChanged((user) => {
    if(user){
      user.updateProfile({
        displayName: username
      }).then(() => notification(`Welcome to OLX, ${username}`, 'success', 2500))
        .catch((e) => notification(e.message, 'danger', 2500));
        console.log("Writing a new user...");
        firebase.firestore().collection("users").doc(username.split(" ").join("_")).set({}).then(() => console.log("Success")).catch((e) => console.log(e.message))


    }
  })
}



const logIn = () => {
  let email = document.getElementById('email').value,
      password = document.getElementById('pwd').value;
      console.log("Running Command...");
    auth.signInWithEmailAndPassword(email, password).then(() => notification(`Logged in successfully!`, 'success', 2500)).catch((e) => notification(e.message, 'danger', 2500))
}
