//New user signup
const signUpFormHandler = async (event) => {
  event.preventDefault();
  const firstName = document.getElementById("first-name-sign-up").value;
  const lastName = document.getElementById("last-name-sign-up").value;
  const username = document.getElementById("username-sign-up").value;
  const email = document.getElementById("email-sign-up").value;
  const password = document.getElementById("password-sign-up").value;
  const rePassword = document.getElementById("retype-password").value;

  //Check ALL credentials
  if (firstName && lastName && password && rePassword && username && email && (rePassword === password)) {
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
    //inform users passwords do not match
  }if(password !== rePassword){
    alert("PASSWORDS DO NOT MATCH")
  }
};

const btnSubmitNew = document
  .getElementById("submit-sign-up")
  .addEventListener("click", signUpFormHandler);
