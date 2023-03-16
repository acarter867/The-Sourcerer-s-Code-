const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#post-title").value;
  const body = document.getElementById("post-body").value;
  console.log("Body var: ", body);
  if (title && body) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to post.");
    }
  }
};

document.querySelector("#submitpost").addEventListener("click", newPostHandler);
