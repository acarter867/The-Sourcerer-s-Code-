const signUpFormHandler = async (event) => {
  event.preventDefault();
  const firstName = document.getElementById("first-name-sign-up").value;
  const lastName = document.getElementById("last-name-sign-up").value;
  const username = document.getElementById("username-sign-up").value;
  const email = document.getElementById("email-sign-up").value;
  const password = document.getElementById("password-sign-up").value;
  const rePassword = document.getElementById("first-name-sign-up").value;

  const btnCheckUsername = document.getElementById("username-availability");
  btnCheckUsername.addEventListener("click", setStatus);

  const passwordStatus = document.getElementById("password-status");

  if (firstName && lastName && password && rePassword && username && email) {
    let body = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };
    console.log(body);
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("an error has occurred");
    }
  }
};

function setStatus() {
  const username = document.getElementById("username-sign-up").value;
  const usernameStatus = document.getElementById("username-status");
  if (checkUsername(username)) {
    usernameStatus.textContent = "Username is available";
    usernameStatus.style.color = "green";
  } else {
    usernameStatus.textContent = "Username is unavailable";
    usernameStatus.style.color = "red";
  }
}

const btnSubmitNew = document
  .getElementById("submit-sign-up")
  .addEventListener("click", signUpFormHandler);
