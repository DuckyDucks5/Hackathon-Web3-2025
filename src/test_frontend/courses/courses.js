document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle functionality
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelectorAll(".btn");
  
    toggleBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        
        // Adjust main content margin when sidebar expands/collapses
        if (sidebar.classList.contains("active")) {
          document.querySelector(".main-content").style.marginLeft = "330px";
          document.querySelector(".header").style.width = "calc(100% - 330px)";
        } else {
          document.querySelector(".main-content").style.marginLeft = "100px";
          document.querySelector(".header").style.width = "calc(100% - 100px)";
        }
      });
    });
  
    // Get username from cookie and display it
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
  
    const username = getCookie("username");
    const profileImg = document.querySelector(".profile-img");
    
    if (username) {
      // Generate a random color based on username
      const hash = Array.from(username).reduce((hash, char) => {
        return char.charCodeAt(0) + ((hash << 5) - hash);
      }, 0);
      const color = `hsl(${hash % 360}, 70%, 50%)`;
      profileImg.style.backgroundColor = color;
      
      // Add first letter of username to profile image
      const initial = username.charAt(0).toUpperCase();
      profileImg.style.display = "flex";
      profileImg.style.alignItems = "center";
      profileImg.style.justifyContent = "center";
      profileImg.style.color = "white";
      profileImg.style.fontWeight = "bold";
    } else {
      profileImg.style.backgroundColor = "#4f81ff";
    }

     // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterCourses);

    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterCourses();
        });
    });

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-tab.active').dataset.filter;
        
        document.querySelectorAll('.course-item').forEach(course => {
        const title = course.querySelector('h2').textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || 
                            (activeFilter === 'progress' && course.classList.contains('in-progress'));
        
        course.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
        });
    }

    // Mark some courses as in-progress for demonstration
    // In a real app, this would come from your backend/user data
    const inProgressCourses = [
        "Mastering Microsoft Excel Formulas and Function",
        "Become a WEB Developer from Scratch, step by step Guide"
    ];

    document.querySelectorAll('.course-item').forEach(course => {
        const title = course.querySelector('h2').textContent;
        if (inProgressCourses.includes(title)) {
        course.classList.add('in-progress');
        
        // Add progress indicator
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-indicator';
        course.querySelector('.provider').after(progressDiv);
        }
    });
  });