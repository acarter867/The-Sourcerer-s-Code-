// edit-post handler
document.querySelectorAll(".edit-post").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const postId = event.target.getAttribute("data-id");
    window.location.replace("/api/posts/" + postId);
  });
});

// delete-post handler
document.querySelectorAll(".delete-post").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const postId = event.target.getAttribute("data-id");
    const response = await fetch("/api/posts/" + postId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert("Unable to delete.");
    }
  });
});

// create-post handler
document
  .getElementById("newpost")
  .addEventListener("click", () => window.location.replace("/api/posts"));
