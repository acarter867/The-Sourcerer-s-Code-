//Handle login request using email and password
const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  //require username and password to be present before comparing values
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      //send user back to homepage if response is good
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .getElementById("btn-submit")
  .addEventListener("click", loginFormHandler);
