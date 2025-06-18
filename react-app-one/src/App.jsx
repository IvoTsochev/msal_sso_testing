import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import "./App.css";

function App() {
  const { instance, accounts, inProgress } = useMsal();

  useEffect(() => {
    if (inProgress === "none" && !accounts.length) {
      instance
        .ssoSilent({
          scopes: ["openid", "profile", "user.read"],
          loginHint: "your-username@headlessteam.onmicrosoft.com",
          redirectUri: "http://localhost:3000/blank.html", // must match Azure registration
        })
        .then((response) => {
          instance.setActiveAccount(response.account);
          console.log("SSO successful:", response.account);
        })
        .catch((error) => {
          console.warn("SSO silent failed, redirecting to login...", error);
          instance.loginRedirect({
            scopes: ["openid", "profile", "user.read"],
          });
        });
    }
  }, [inProgress, accounts.length, instance]);

  return (
    <div>
      <h1>Welcome to My React App ONE</h1>
      {accounts.length > 0 ? (
        <p>Logged in as: {accounts[0].username}</p>
      ) : (
        <p>Authenticating...</p> // You could also show a loader here
      )}
    </div>
  );
}

export default App;












// import { useEffect } from "react";
// import { useMsal } from "@azure/msal-react";
// import "./App.css";

// function App() {
//   const { instance, accounts, inProgress } = useMsal();

//   useEffect(() => {
//     if (inProgress === "none" && !accounts.length) {
//       instance
//         .ssoSilent({
//           scopes: ["user.read"],
//           loginHint: "your-username@headlessteam.onmicrosoft.com",
//           redirectUri: "http://localhost:3000/blank.html",
//         })
//         .then((response) => {
//           instance.setActiveAccount(response.account);
//         })
//         .catch((error) => {
//           console.warn("SSO silent failed", error);
//         });
//     }
//   }, [inProgress, accounts.length, instance]);

//   const handleLogin = () => {
//     instance.loginRedirect({ scopes: ["openid", "profile", "user.read"] });
//   };

//   return (
//     <div>
//       <h1>Welcome to My React App ONE</h1>
//       {accounts.length > 0 ? (
//         <p>Logged in as: {accounts[0].username}</p>
//       ) : (
//         <button onClick={handleLogin}>Login</button>
//       )}
//     </div>
//   );
// }

// export default App;
