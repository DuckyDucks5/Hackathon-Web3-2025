document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
  
    const nftData = [
      {
        title: "Complete the 'Mastering Microsoft Excel Formulas and Function' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_Excel.svg"
      },
      {
        title: "Complete the 'Business Communication Skills: Handling Clients & Customers' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_Buscom.svg"
      },
      {
        title: "Complete the 'Business Fundamentals: Marketing Strategy' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_Marketing.svg"
      },
      {
        title: "Complete the 'Create Professional PowerPoint: From Beginner to Expert' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_PPT.svg"
      },
      {
        title: "Complete the 'Become a Professional Graphic Designer' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_GraDes.svg"
      },
      {
        title: "Complete the 'Become a WEB Developer from Scratch, step by step Guide' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_WebDev.svg"
      },
      {
        title: "Complete the 'Earn Passive Income: Turn Your Laptop into a Cash Generator' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_LapInCash.svg"
      },
      {
        title: "Complete the 'Cyber Security Course: Ethical Hacking & Defense' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_Cyber.svg"
      },
      {
        title: "Complete the 'Figma Megacourse: UI/UX Design Beginner to Expert'",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_UIUX.svg"
      },
      {
        title: "Complete the 'The Data Analytic Course: Complete Bootcamp' Course",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_DA.svg"
      },
      {
        title: "Complete the 'LLM Engineering: Master AI, Large Language Models & Agents'",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_AI.svg"
      },
      {
        title: "Complete the 'The Ultimate React Course: React, Next.js, Redux & More'",
        image: "/Hackathon-Web3-2025/src/test_frontend/assets/NFT_React.svg"
      }
    ];
  
    const grid = document.getElementById("nftGrid");
    console.log("nftGrid element:", grid);
  
    nftData.forEach((nft, index) => {
      console.log(`Rendering NFT ${index + 1}:`, nft);
  
      const card = document.createElement("div");
      card.className = "nft-card";
  
      card.innerHTML = `
        <img src="${nft.image}" alt="${nft.title}" />
        <p>${nft.title}</p>
      `;
  
      grid.appendChild(card);
      console.log(`Appended NFT card for: ${nft.title}`);
    });
  });
  