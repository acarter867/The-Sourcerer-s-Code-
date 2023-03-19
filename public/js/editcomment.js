// edit comment call
const editComment = async (event) => {
  const editorBtn = event.target;
  const postId = event.target.getAttribute("data-id");
  const container = event.target.parentElement;
  const originalBody = container.children[0];
  const byline = container.children[1];
  let dataState = event.target.getAttribute("data-state");
  if (dataState == "edit") {
    const editBox = document.createElement("textarea");
    const cancelBtn = document.createElement("button");
    let rawText = originalBody.innerHTML;
    originalBody.style.display = "none";
    byline.style.display = "none";
    editBox.value = rawText;
    cancelBtn.innerHTML = "Cancel Changes";
    cancelBtn.addEventListener("click", (event) => {
      originalBody.style.display = "block";
      byline.style.display = "block";
      editorBtn.innerHTML = "Edit";
      editorBtn.setAttribute("data-state", "edit");
      container.children[2].remove();
      event.target.remove();
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
        originalBody.style.display = "block";
        byline.style.display = "block";
        originalBody.innerHTML = body;
        const input = container.children[2];
        const cancel = container.children[3];
        input.remove();
        cancel.remove();
        event.target.innerHTML = "Edit";
        event.target.setAttribute("data-state", "edit");
      } else {
        alert("Could not update comment.");
      }
    } else {
      alert("Comment cannot be empty.");
    }
  }
};

module.export = { editComment };
