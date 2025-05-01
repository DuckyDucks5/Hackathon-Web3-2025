// Page Login

async function connectAndRedirect() {
    if (!window.ic || !window.ic.plug) {
      alert("Plug Wallet belum terpasang!");
      return;
    }
  
    const whitelist = ["u6s2n-gx777-77774-qaaba-cai"]; // ganti dengan canister ID kamu
    const host = "https://mainnet.dfinity.network"; // atau "http://localhost:4943" kalau lokal
  
    try {
      const connected = await window.ic.plug.requestConnect({ whitelist, host });
  
      if (connected) {
        const principal = await window.ic.plug.getPrincipal();
        console.log("Connected as:", principal.toText());
        alert(`Connected with Principal: ${principal.toText()}`);
  
        window.location.href = "/dashboard/dashboard.html";
      }
    } catch (e) {
      console.error("Gagal connect ke Plug:", e);
      alert("Gagal konek ke Plug Wallet.");
    }
  }
  
// Page Dashboard

