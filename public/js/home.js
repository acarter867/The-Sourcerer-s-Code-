const createPageHandler = () => {
    window.location.replace("/api/posts");
  };
  
  document.querySelector("#newpost").addEventListener("click", createPageHandler);