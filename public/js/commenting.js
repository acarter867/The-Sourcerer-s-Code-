// create comment
const newCommentHandler = async (event) => {};

// new-comment handler
document.querySelectorAll(".comment-box").forEach((btn) => {
  btn.lastElementChild.addEventListener("click", async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute("data-id");
    const body = btn.firstElementChild.value;
    if (body) {
      const response = await fetch("/api/comments/" + postId, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to post comment.");
      }
    }
  });
});
