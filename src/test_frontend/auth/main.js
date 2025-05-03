import { idlFactory } from "../../declarations/test_backend/test_backend.did.js";
import { HttpAgent } from "@dfinity/agent";

let loginStep = 1;

// Improved network override function
function configurePlugNetwork() {
  if (!window.ic?.plug) {
    console.error("Plug Wallet not detected");
    return false;
  }

  try {
    // Modern Plug Wallet API approach
    window.ic.plug.agent = {
      ...window.ic.plug.agent,
      _host: "http://localhost:4943",
      _fetch: async (req, opts) => {
        const url = new URL(req.url);
        if (url.host.includes('5000')) {
          url.host = 'localhost:4943';
        }
        const newReq = new Request(url.toString(), req);
        return fetch(newReq, opts);
      }
    };
    return true;
  } catch (e) {
    console.error("Failed to configure network:", e);
    return false;
  }
}

async function connectAndRedirect() {
  try {
    // Force Plug to use port 4943 before it initializes agent
    localStorage.setItem("ic-connection", JSON.stringify({
      provider: "plug",
      network: {
        name: "local",
        host: "http://localhost:4943",
        providerUrl: "http://localhost:4943"
      }
    }));

    if (window.ic.plug && window.ic.plug.agent) {
      window.ic.plug.agent._host = "http://localhost:4943";
    }

    const connected = await window.ic.plug.requestConnect({
      whitelist: ["bd3sg-teaaa-aaaaa-qaaba-cai"],
      host: "http://localhost:4943",
      fetchRootKey: true,
      timeout: 30000,
      network: {
        name: "local",
        providerUrl: "http://localhost:4943"
      },
      overrideTarget: true // <== tambahkan ini
    });


    await window.ic.plug.createAgent({
      whitelist: ["bd3sg-teaaa-aaaaa-qaaba-cai"],
      host: "http://localhost:4943"
    });
    
    if (!connected) throw new Error("Connection rejected");

    const principal = await window.ic.plug.getPrincipal();
    console.log("Connected with principal:", principal.toString());
    
    // UI logic
    document.getElementById("principalid").classList.add("hide-input");
    document.getElementById("password").classList.add("hide-input");
    
    const usernameWrapper = document.getElementById("username-wrapper");
    const form = document.getElementById("loginForm");

    setTimeout(() => {
      usernameWrapper.classList.add("show");
      form.classList.add("username-phase");
    }, 500);

    loginStep = 2;
  } catch (e) {
    console.error("Connection failed:", e);
    alert(`Connection failed. Please:\n1. Ensure dfx is running\n2. Check Plug Wallet network settings\n3. Verify no other apps using port 5000\n\nError: ${e.message}`);
  }
}

async function checkDfxStatusAndCanister(canisterId) {
  try {
    const agent = new HttpAgent({ host: "http://localhost:4943" });
    await agent.fetchRootKey(); // Hanya perlu di local

    const status = await agent.status();
    console.log("Replica status:", status);

    const read = await agent.readState(canisterId, { paths: [] }); // valid CBOR
    console.log("Canister state ok");
    return true;
  } catch (err) {
    console.error("Status Check Error:", err);
    alert(`Gagal memverifikasi lokal dfx/canister:\n${err.message}`);
    return false;
  }
}


async function handleLogin(event) {
  event.preventDefault();

  try {
    if (loginStep === 1) {
      // 🔍 Tambahkan pengecekan sebelum connect
      const ok = await checkDfxStatusAndCanister("bd3sg-teaaa-aaaaa-qaaba-cai");
      if (!ok) return;

      await connectAndRedirect();
    } else if (loginStep === 2) {
      const username = document.getElementById("username").value.trim();
      if (!username) {
        alert("Please enter a username");
        return;
      }

      const actor = await createActorWithTimeout();
      const user = await actor.createUser(username);

      console.log("User created:", user);
      localStorage.setItem("username", user.username);
      localStorage.setItem("userPrincipal", user.principalId);
      localStorage.setItem("userId", user.userId.toString());

      window.location.href = "/dashboard/dashboard.html";
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(`Login failed:\n${error.message}\n\nTroubleshooting:\n1. Stop/start dfx\n2. Refresh page\n3. Reinstall Plug Wallet`);
  }
}


async function createActorWithTimeout() {
  return new Promise(async (resolve, reject) => {
    try {
      if (!window.ic.plug || typeof window.ic.plug.createActor !== "function") {
        throw new Error("Plug Wallet not initialized properly");
      }

      const actor = await window.ic.plug.createActor({
        canisterId: "bd3sg-teaaa-aaaaa-qaaba-cai",
        interfaceFactory: idlFactory
      });

      // Test call with timeout
      const test = await Promise.race([
        actor.getUserCount(),
        new Promise((_, r) => setTimeout(() => r(new Error("Timeout")), 5000))
      ]);

      resolve(actor);
    } catch (error) {
      reject(new Error(`CANISTER CONNECTION FAILED: ${error.message}\n\nVerify:\n1. Canister ID matches dfx canister id\n2. dfx is running on port 4943`));
    }
  });
}



export function initLogin() {
  document.getElementById("loginForm").addEventListener('submit', handleLogin);
}

document.addEventListener('DOMContentLoaded', initLogin);
