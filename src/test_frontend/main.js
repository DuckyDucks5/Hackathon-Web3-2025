// import { createActor } from "../declarations/your_backend";
// import { AuthClient } from "@dfinity/auth-client";

// let actor;

// async function login() {


//   return alert("Login function called");
//   const authClient = await AuthClient.create();
//   await authClient.login({
//     identityProvider: "https://identity.ic0.app/#authorize",
//     onSuccess: async () => {
//       const identity = authClient.getIdentity();
//       actor = createActor(import.meta.env.CANISTER_ID_YOUR_BACKEND, {
//         agentOptions: { identity }
//       });

//       const username = document.getElementById("username").value;
//       const result = await actor.login(username);
//       alert("Welcome " + result);
//     },
//   });
//}

// document.getElementById('loginButton').addEventListener('click', () => {
//     alert("Login button clicked");
// });

async function login() {
    window.location.href = "dashboard.html";
}
