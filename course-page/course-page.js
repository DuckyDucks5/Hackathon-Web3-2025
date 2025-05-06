document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelectorAll(".btn");
  
    toggleBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          sidebar.classList.toggle("active");

          if (sidebar.classList.contains("active")) {
            document.querySelector(".main-content").style.marginLeft = "330px";
            document.querySelector(".header").style.width = "calc(100% - 330px)";
          } else {
            document.querySelector(".main-content").style.marginLeft = "100px";
            document.querySelector(".header").style.width = "calc(100% - 100px)";
          }
        });
    });

    function showSection(section) {
      const explore = document.getElementById('explore');
      const progress = document.getElementById('progress');
      const exploreButton = document.getElementById('exploreButton');
      const progressButton = document.getElementById('progressButton');
    
      exploreButton.classList.remove('active');
      progressButton.classList.remove('active');

      if (section === 'explore') {
        explore.style.display = 'block';
        progress.style.display = 'none';
        exploreButton.classList.add('active');
        renderCourses(exploreCourses, 'exploreContainer', false);
      } else if (section === 'progress') {
        explore.style.display = 'none';
        progress.style.display = 'block';
        progressButton.classList.add('active');
        renderCourses(progressCourses, 'progressContainer', true);
      }
    }

    document.getElementById('exploreButton').addEventListener('click', () => {
      showSection('explore');
    });

    document.getElementById('progressButton').addEventListener('click', () => {
      showSection('progress');
    });

    document.getElementById("searchInput").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const keyword = event.target.value.toLowerCase();
        const filtered = exploreCourses.filter(course =>
          course.title.toLowerCase().includes(keyword)
        );
        // Tampilkan hanya explore section setelah pencarian
        document.getElementById("explore").style.display = "block";
        document.getElementById("progress").style.display = "none";
        renderCourses(filtered, "exploreContainer");
      }
    });

    showSection('explore');
    
  });

const exploreCourses = [
  {
    title: "Mastering Microsoft Excel Formulas and Function",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Excel.svg",
    provider: "Google",
    price: "Free",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/excel.html" 
  },
  {
    title: "Business Communication Skills: Handlilng Clients & Customers",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_BusinessCommunication.svg",
    provider: "Google",
    price: "Free",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/buscom.html"
  },
  {
    title: "Create Professional PowerPoint: From Beginner to Expert",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_PPT.svg",
    provider: "Google",
    price: "Free",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/ppt.html"
  },
  {
    title: "Business Fundamentals: Marketing Strategy",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Marketing.svg",
    provider: "Google",
    price: "Free",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/marketing.html"
  },
  {
    title: "Become a Professinal Graphic Designer",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_GraphicDesign.svg",
    provider: "Google",
    price: "Free",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/grades.html"
  },
  {
    title: "Become a WEB Developer from Scratch, step by step Guide",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_WebDev.svg",
    provider: "Google",
    price: "$3.59",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/webdev.html"
  },
  {
    title: "Cyber Security Course: Ethical Hacking & Defense",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Cyber.svg",
    provider: "AWS",
    price: "$5",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/cyber.html"
  },
  {
    title: "Earn Passive Income: Turn Your Laptop into a Cash Generator",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_LaptopCash.svg",
    provider: "AWS",
    price: "$13.5",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/income.html"
  },
  {
    title: "The Data Analyst Course: Complete Bootcamp",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_DataAnalyst.svg",
    provider: "Google",
    price: "$15",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/dalyst.html"
  },
  {
    title: "Complete Figma Megacourse: UI/UX Design Beginner to Expert",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_UIUX.svg",
    provider: "AWS",
    price: "$19.9",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/uiux.html"
  },
  {
    title: "The Ultimate React Course: React, Next.js, Redux & More",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_React.svg",
    provider: "AWS",
    price: "$22",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/react.html"
  },
  {
    title: "LLM Engineering: Master AI, Large Language Models & Agents",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_AI.svg",
    provider: "Google",
    price: "$25",
    url: "/Hackathon-Web3-2025/src/test_frontend/course-page/detail-courses/ai.html"
  }
];

const progressCourses = [
  {
    title: "Business Fundamentals: Marketing Strategy",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Marketing.svg",
    provider: "Google",
    due: "10 days left",
    progress: 60
  },
  {
    title: "Business Communication Skills: Handlilng Clients & Customers",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Communication.svg",
    provider: "Google",
    due: "15 days left",
    progress: 40
  },
  {
    title: "Earn Passive Income: Turn Your Laptop into a Cash Generator",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Laptop.svg",
    provider: "AWS",
    due: "25 days left",
    progress: 50
  },
  {
    title: "Become a Professinal Graphic Designer",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Graphic-Designer.svg",
    provider: "Google",
    due: "29 days left",
    progress: 20
  },
  {
    title: "Mastering Microsoft Excel Formulas and Function",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Excel.svg",
    provider: "Google",
    due: "30 days left",
    progress: 30  
  },
  {
    title: "The Data Analyst Course: Complete Bootcamp",
    image: "/Hackathon-Web3-2025/src/test_frontend/assets/Course_Data-Analyst.svg",
    provider: "Google",
    due: "30 days left",
    progress: 10
  }
];

function renderCourses(courseList, containerId, isProgressSection = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  courseList.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";

    if (isProgressSection) {
      card.innerHTML = `
        <div class="card">
          <img src="${course.image}" alt="${course.title}">
          <div class="card-description">
            <h4>${course.title}</h4>
            <div class="card-desc">
              <div class="card-provider">
                <img src="${course.provider === "Google" ? "/Hackathon-Web3-2025/src/test_frontend/assets/google.svg" : "/Hackathon-Web3-2025/src/test_frontend/assets/aws.svg"}" alt="${course.provider}">
                <small>${course.provider}</small>
              </div>
              <div class="card-due">
                <small>${course.due}</small>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: ${course.progress}%;"></div>
            </div>
            <div class="card-footer-resume">
              <button class="resume-btn">Resume Course</button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Explore Course Card
      card.innerHTML = `
        <div class="card">
          <img src="${course.image}" alt="${course.title}">
          <div class="card-description">
            <h4>${course.title}</h4>
            <div class="card-provider">
              <img src="${course.provider === "Google" ? "/Hackathon-Web3-2025/src/test_frontend/assets/google.svg" : "/Hackathon-Web3-2025/src/test_frontend/assets/aws.svg"}" alt="${course.provider}">
              <small>${course.provider}</small>
            </div>
            <div class="card-footer">
              <button class="course-btn" data-url="${course.url}" data-price="${course.price}">
                ${course.price === "Free" ? "Start Course" : "Buy Course"}
               </button>
              <span class="price">${course.price}</span>
            </div>
          </div>
        </div>
      `;
    }

    container.appendChild(card);
  });

  const buttons = document.querySelectorAll('.course-btn');
  buttons.forEach(button => {
  button.addEventListener('click', function() {
    const courseUrl = button.getAttribute('data-url');
    const coursePrice = button.getAttribute('data-price');

    // Jika kursus gratis, arahkan ke halaman detail kursus
    if (coursePrice === 'Free') {
      window.location.href = courseUrl;
    } else {
      // Jika kursus berbayar, arahkan ke halaman pembayaran
      window.location.href = '/Hackathon-Web3-2025/src/test_frontend/payment/payment-page.html';
    }
  });
});
}