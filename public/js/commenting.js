// get comment thread request
const getComments = async (event) => {
  console.log("test");
  const sessId = document.getElementById("session-username").textContent;
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
        console.log(allComments[x]);
        let id = allComments[x].id;
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

        if (sessId === allComments[x].poster_username) {
          console.log("isOwner");
          let btnEdit = document.createElement("button");
          btnEdit.setAttribute("data-state", "edit");
          btnEdit.setAttribute("data-id", id);
          btnEdit.textContent = "Edit";
          btnEdit.addEventListener("click", editComment);
          let btnDelete = document.createElement("button");
          btnDelete.textContent = "Delete";
          btnDelete.setAttribute("data-id", id);
          btnDelete.addEventListener("click", deleteComment);
          displaybox.appendChild(btnEdit);
          displaybox.appendChild(btnDelete);
        } else {
          console.log("Not OWNER");
        }
      }
    }
  } else {
    event.target.innerHTML = "See Comments";
    eventState = event.target.setAttribute("data-state", "show");
    containerEl.innerHTML = null;
  }
};

// new-comment request
const createComment = async (event) => {
  const postId = event.target.getAttribute("data-id");
  const body = event.target.previousElementSibling.value;
  if (body) {
    const response = await fetch("/api/comments/" + postId, {
      method: "POST",
      body: JSON.stringify({ body }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const commentbtn = document.querySelector(`[name='commentbtn${postId}']`);
      const threadbox = document.querySelector(`[name='thread${postId}']`);
      threadbox.innerHTML = null;
      event.target.previousElementSibling.value = null;
      commentbtn.setAttribute("data-state", "show");
      commentbtn.click();
    } else {
      alert("Failed to post comment.");
    }
  } else {
    alert("Cannot post empty comment.");
  }
};

// edit comment call
const editComment = async (event) => {
  const postId = event.target.getAttribute("data-id");
  const container = event.target.parentElement;
  const thread = container.parentElement;
  const originalBody = container.children[0];
  console.log("OG body el: ", originalBody);
  const byline = container.children[1];
  let dataState = event.target.getAttribute("data-state");
  if (dataState == "edit") {
    const rawText = originalBody.innerHTML;
    console.log("Raw text:", rawText);
    originalBody.style.display = "none";
    byline.style.display = "none";
    let editBox = document.createElement("textarea");
    editBox.value = rawText;
    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Cancel Changes";
    cancelBtn.addEventListener("click", (event) => {
      console.log("Post ID: ", postId);
    });
    container.insertBefore(editBox, event.target);
    container.insertBefore(cancelBtn, event.target);
    event.target.setAttribute("data-state", "save");
    event.target.innerHTML = "Submit Changes";
  } else {
    event.preventDefault();
    let body = container.children[2].value;
    if (body) {
      const response = await fetch("/api/comments/" + postId, {
        method: "PUT",
        body: JSON.stringify({ body }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const threadId = thread.getAttribute("data-id");
        const commentbtn = document.querySelector(
          `[name='commentbtn${threadId}']`
        );
        commentbtn.setAttribute("data-state", "show");
        thread.innerHTML = null;
        commentbtn.click();
      }
    } else {
      alert("Comment cannot be empty.");
    }
  }
};

// cancel-edit

// delete comment request
const deleteComment = async (event) => {};

// event handlers
document.querySelectorAll(".render-comments").forEach((btn) => {
  btn.addEventListener("click", getComments);
});

document.querySelectorAll(".comment-box").forEach((btn) => {
  btn.lastElementChild.addEventListener("click", createComment);
});
