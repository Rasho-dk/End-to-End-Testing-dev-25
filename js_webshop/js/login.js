import { getUser } from "./common.js";
import { showAlert } from "./utils.js";

document.querySelector("#frmLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value;
    console.log("Logging in with email: " + email);
  const data = await getUser(email);
  const matchedUser = data.find(user => user.email === email);
    // console.log("User data fetched: ", matchedUser);
  if (!matchedUser) {
    showAlert("Incorrect credentials");
  } else {
    const pwd = e.target.txtPassword.value;
    // console.log("Password entered: " + pwd);
    if (matchedUser.pwd !== pwd) {
        // console.log(matchedUser.pwd + " does not match " + pwd);
      showAlert("Incorrect credentials");
    } else {
      localStorage.setItem("userEmail", email);
      window.location.href = "index.html";
    }
  }
});
