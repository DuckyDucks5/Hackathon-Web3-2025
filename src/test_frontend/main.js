let loginStep = 1; // step 1: login plug, step 2: isi username

async function connectAndRedirect() {
  if (!window.ic || !window.ic.plug) {
    alert("Plug Wallet belum terpasang!");
    return;
  }

  const whitelist = ["ym2qi-ntlvq-b52zu-mwgjk-wxagt-gjuwb-lwvtq-lnm2q-azi5t-3etnv-oae"];
  const host = "https://mainnet.dfinity.network";

  try {
    const connected = await window.ic.plug.requestConnect({ whitelist, host });

    if (connected) {
      const principal = await window.ic.plug.getPrincipal();
      document.getElementById("principalid").classList.add("hide-input");
      document.getElementById("password").classList.add("hide-input");

      const usernameInput = document.getElementById("username");
      const usernameWrapper = document.getElementById("username-wrapper");
      const form = document.querySelector("form");
      setTimeout(() => {
        usernameWrapper.classList.add("show");
        form.classList.add("username-phase"); // <== tambahkan class ini
      }, 500);

      loginStep = 2;
    }
  } catch (e) {
    console.error("Gagal connect ke Plug:", e);
    alert("Gagal connect ke Plug Wallet.");
  }
}


function handleLogin(event) {
  event.preventDefault();

  if (loginStep === 1) {
    connectAndRedirect();
  } else if (loginStep === 2) {
    const username = document.getElementById("username").value.trim();
    if (!username) {
      alert("Masukkan username terlebih dahulu.");
      return;
    }

    document.cookie = `username=${encodeURIComponent(username)}; path=/; max-age=3600`; // expires after 1 hour

    window.location.href = "/dashboard/dashboard.html";
  }
}
