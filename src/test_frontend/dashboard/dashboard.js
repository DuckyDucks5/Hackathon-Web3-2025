document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelectorAll(".btn");

  toggleBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
  });

  const usnElement = document.querySelector(".usnPlug");

  const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const username = getCookie("username");

  if (username) {
      usnElement.textContent = username;
  } else {
      usnElement.textContent = "Couragers"; 
  }
});
