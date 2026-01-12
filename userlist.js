const formEl = document.querySelector('.signupform');
const tablecontent = document.querySelector('.tbody');
const users = [];

formEl.addEventListener("submit", (evt)=>{
   evt.preventDefault();

   //converting the form element into array
   let arrayData = Array.from(formEl);
   
   //getting users data from the form using the reduse method.
   const data = arrayData.reduce((acc, d) => ({...acc, [d.name] : d.value}), {})
   console.log(data)

   if(data.fullname == "" || 
      data.username == "" || 
      data.email == "" || 
      data.phone == "" || 
      data.password == "" ||
      data.confirmpassword == ""){
      return showAlert("please fill up the required fields.")
   }

   if(data.password !== data.confirmpassword){
       return showAlert("password mismatch!")
   }

   if(data.password.length < 6){
      return showAlert("password too short!")
   }

   const duplicate = users.some(user => 
     user.username === data.username
   );
   if(duplicate) {
      return showAlert("Username already exists...")
   }

   users.push({
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password
   });
   formEl.reset()
   showAlert("Form submitted successfully, proceed to login.")
   console.log(users)
   createUser(users);
})

function showAlert(message, type = "error") {
  const alertBox = document.getElementById("alertBox");
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 4000);
}

function createUser(users){
   tablecontent.innerHTML = "";
   users.forEach((users,index) =>{
      let record = `
            <tr>
                            <td>${index+1}</td>
                            <td>${users.fullname}</td>
                            <td>${users.username}</td>
                            <td>${users.email}</td>
                            <td>${users.phone}</td>
                            <td>${users.password}</td>
            </tr>
      `
      tablecontent.insertAdjacentHTML("beforeend", record);
   })
}

const loginEl = document.querySelector('.formlogin');

loginEl.addEventListener("submit", (e)=> {
   e.preventDefault();  //prevents my page from reloading...

  const username = loginEl.querySelector('.dbuser').value.trim();
  const password = loginEl.querySelector('.dbpassword').value.trim();

  // Validation: check if fields are filled
  if (!username || !password) {
    return showAlert("Please enter both username and password.");
  }

  // Check if user exists
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return showAlert("Invalid username or password.");
  }

  showAlert(`Welcome back, ${user.fullname}!, login successful...`);
  loginEl.reset();
});