import { baseUrl } from "./info.js";
import { showAlert } from "./utils.js";

document.querySelector("#frmSignup").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim();
  const pwd = e.target.txtPassword.value.trim();
  const repeatPwd = e.target.txtRepeatPassword.value.trim();

  const emailExists = async (email) => {
    console.log("Checking if email exists: " + email);
    try {
      // Fetch all users and check if email exists
      const response = await fetch(baseUrl + "/users");
      const data = await response.json();
      console.log("All users:", data);

      // Check if any user has this email
      const userExists = data.some((user) => user.email === email);

      if (userExists) {
        console.log("Email exists");
        return true;
      }

      console.log("Email does not exist");
      return false;
    } catch (error) {
      console.log("Error checking email:", error);
      return false; // Assume email doesn't exist on error
    }
  };

  const insertUser = (email, pwd) => {
    // Calculate the new ID based on the highest existing one

    return fetch(baseUrl + "/users")
      .then((response) => response.json())
      .then((data) => {
        let newID;
        if (data.length === 0) {
          newID = 1;
        } else {
          newID = parseInt(data[data.length - 1].id) + 1;
        }

        const params = new URLSearchParams();
        params.append("id", String(newID));
        params.append("email", email);
        params.append("pwd", pwd);

        // Insert the new user

        return fetch(baseUrl + "/users", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: newID,
            email: email,
            pwd: pwd,
          }),
        })
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
            return false;
          });
      });
  };

  if (pwd !== repeatPwd) {
    showAlert("The passwords do not match");
  } else {
    const exists = await emailExists(email);
    console.log("Email exists: " + exists);
    if (exists) {
      showAlert("The email already exists");
    } else {
      const ret = await insertUser(email, pwd);
      if (ret) {
        showAlert("The user was created successfully");
        e.target.reset();
      } else {
        showAlert("There was a problem while trying to create the user");
      }
    }
  }
});
