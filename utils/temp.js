//Handle request to handle comments
const editComment = async (event) => {
  //Add unique id's to comments
  const editorBtn = event.target;
  const id = editorBtn.getAttribute("data-id");
  const container = document.getElementById("comment" + id);
  const originalBody = document.getElementById("cbody" + id);
  const card = document.getElementById("ccard" + id);
  let dataState = editorBtn.getAttribute("data-state");
  //Check for edit mode
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
      container.children[2].remove();
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
      //Format comments if response is ok
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
