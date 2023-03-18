// get comment thread
const getComments = async (event) => {
  const postId = event.target.getAttribute("data-id");
  let eventState = event.target.getAttribute("data-state");
  const containerEl = event.target.nextElementSibling;
  if (eventState == "show") {
    event.target.innerHTML = "Hide Comments";
    eventState = event.target.setAttribute("data-state", "hide");
    const response = await fetch("/api/comments/" + postId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const allComments = await response.json();
      for (let x in allComments) {
        let displaybox = document.createElement("div");
        let paragraph = document.createElement("p");
        let body = document.createTextNode(allComments[x].body);
        let byline = document.createElement("p");
        let author = document.createTextNode(
          " - " + allComments[x].poster_username
        );
        paragraph.appendChild(body);
        byline.appendChild(author);
        displaybox.appendChild(paragraph);
        displaybox.appendChild(byline);
        containerEl.appendChild(displaybox);
      }
    }
  } else {
    event.target.innerHTML = "See Comments";
    eventState = event.target.setAttribute("data-state", "show");
    containerEl.innerHTML = null;
  }
};

document.querySelectorAll(".render-comments").forEach((btn) => {
  btn.addEventListener("click", getComments);
});

// new-comment handler
document.querySelectorAll(".comment-box").forEach((btn) => {
  btn.lastElementChild.addEventListener("click", async (event) => {
    const postId = event.target.getAttribute("data-id");
    const body = btn.firstElementChild.value;
    if (body) {
      const response = await fetch("/api/comments/" + postId, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const commentbtn = document.querySelector(
          `[name='commentbtn${postId}']`
        );
        const threadbox = document.querySelector(`[name='thread${postId}']`);
        threadbox.innerHTML = null;
        btn.firstElementChild.value = null;
        commentbtn.setAttribute("data-state", "show");
        commentbtn.click();
      } else {
        alert("Failed to post comment.");
      }
    } else {
      alert('Cannot post empty comment.')
    }
  });
});
