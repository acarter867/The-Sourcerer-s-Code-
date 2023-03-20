// get comment thread request
const getComments = async (event) => {
  console.log('test');
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
        let content = `
        <div id="ccard${id}">
          <p id="cbody${id}">${allComments[x].body}</p>
          <p id="byline${id}"> – ${allComments[x].poster_username}</p>
        </div>`;
        displaybox.setAttribute('id', 'comment' + id);
        displaybox.innerHTML = content;
        containerEl.appendChild(displaybox);
        if (sessId === allComments[x].poster_username) {
          let modDash = `
          <button id="edit${id}" data-id="${id}" data-state="edit">Edit</button>
          <button id="delete${id}" data-id="${id}">Delete</button>`;
          displaybox.innerHTML = content + modDash;
          let btnEdit = document.getElementById("edit" + id);
          let btnDelete = document.getElementById("delete" + id);
          btnEdit.addEventListener("click", editComment);
          btnDelete.addEventListener("click", deleteComment);
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

// edit comment request
const editComment = async (event) => {
  const editorBtn = event.target;
  const id = editorBtn.getAttribute("data-id");
  const container = document.getElementById("comment" + id);
  const originalBody = document.getElementById("cbody" + id);
  const card = document.getElementById("ccard" + id);
  let dataState = editorBtn.getAttribute("data-state");
  if (dataState == "edit") {
    const editBox = document.createElement("textarea");
    const cancelBtn = document.createElement("button");
    let rawText = originalBody.innerHTML;
    card.style.display = "none";
    editBox.value = rawText;
    editBox.setAttribute('id', 'cedit' + id);
    cancelBtn.innerHTML = "Cancel Changes";
    cancelBtn.setAttribute('id', 'ccancel' + id);
    cancelBtn.addEventListener("click", (event) => {
      card.style.display = "block";
      editorBtn.innerHTML = "Edit";
      editorBtn.setAttribute("data-state", "edit");
      document.getElementById('cedit' + id).remove();
      event.target.remove();
    });
    container.insertBefore(editBox, editorBtn);
    container.insertBefore(cancelBtn, editorBtn);
    editorBtn.setAttribute("data-state", "save");
    editorBtn.innerHTML = "Submit Changes";
  } else {
    event.preventDefault();
    const input = document.getElementById('cedit' + id);
    let body = input.value;
    if (body) {
      const response = await fetch("/api/comments/" + id, {
        method: "PUT",
        body: JSON.stringify({ body }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        card.style.display = "block";
        originalBody.innerHTML = body;
        const cancel = document.getElementById('ccancel' + id);
        input.remove();
        cancel.remove();
        editorBtn.innerHTML = "Edit";
        editorBtn.setAttribute("data-state", "edit");
      } else {
        alert("Could not update comment.");
      }
    } else {
      alert("Comment cannot be empty.");
    }
  }
};

// delete comment request
const deleteComment = async (event) => {
  const id = event.target.getAttribute("data-id");
  const response = await fetch("/api/comments/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.getElementById('ccard' + id).remove();
  } else {
    alert("Could not delete comment.");
  }
};

// event handlers
document.querySelectorAll(".render-comments").forEach((btn) => {
  btn.addEventListener("click", getComments);
});

document.querySelectorAll(".comment-box").forEach((btn) => {
  btn.lastElementChild.addEventListener("click", createComment);
});
