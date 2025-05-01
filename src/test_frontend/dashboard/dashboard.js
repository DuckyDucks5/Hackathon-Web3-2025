document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelectorAll(".btn");
  
    toggleBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          sidebar.classList.toggle("active");
        });
    });
    
  });
  