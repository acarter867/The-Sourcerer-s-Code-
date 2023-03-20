//Create new post
const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.getElementById("post-title").value;
  const body = document.getElementById("post-body").value;
  if (title && body) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });
    //If response is ok, send user back to homepage with rendered post
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to post.");
    }
  }
};

document.getElementById('btn-back').addEventListener('click', () => {
  document.location.replace('/')
});
document.querySelector("#submitpost").addEventListener("click", newPostHandler);
