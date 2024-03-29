//Edit post
document
  .getElementById("submitpost")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute("data-id");
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;
    if (title && body) {
      const response = await fetch("/api/posts/" + postId, {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });
      //If no error, send back to homepage with rendered post
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to update.");
      }
    }
  });

  
  document.getElementById('btn-back').addEventListener('click', () => {
    document.location.replace('/')
  });
