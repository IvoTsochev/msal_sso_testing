

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
          redirectUri: "http://localhost:3001/blank.html",
        })
        .then((response) => {
          instance.setActiveAccount(response.account);
        })
        .catch((error) => {
          console.warn("SSO silent failed (App 2), redirecting...", error);
          instance.loginRedirect({
            scopes: ["openid", "profile", "user.read"],
          });
        });
    }
  }, [inProgress, accounts.length, instance]);

  return (
    <div>
      <h1>Welcome to My React App TWO</h1>
      {accounts.length > 0 ? (
        <p>Logged in as: {accounts[0].username}</p>
      ) : (
        <p>Authenticating...</p>
      )}
    </div>
  );
}

export default App;













// import { useMsal, useIsAuthenticated } from "@azure/msal-react";
// import './App.css'
// import { useEffect, useState } from "react";



// function App() {
//   // const [activeUser, setActiveUser] = useState(null);
//   const { instance, accounts, inProgress } = useMsal();
//   // const isAuthenticated = !!instance.getActiveAccount();

//   useEffect(() => {
//     if (inProgress === "none" && !accounts.length) {
//       instance
//         .ssoSilent({
//           scopes: ["user.read"],
//           loginHint: "your-username@headlessteam.onmicrosoft.com", // optional, helps speed up
//           redirectUri: "http://localhost:3001/blank.html"
//         })
//         .then((response) => {
//           instance.setActiveAccount(response.account);
//           // setActiveUser(response.account);
//         })
//         .catch((error) => {
//           console.warn("SSO silent failed", error);
//           instance.loginRedirect({ scopes: ["user.read"] });
//         });
//     }
//   }, [inProgress, accounts.length, instance]);

//   const handleLogin = () => {
//     instance.loginRedirect({ scopes: ["openid", "profile", "user.read"] });
//   };
//   return (
//     <div>
//       <h1>Welcome to My React App TWO</h1>
//       {accounts.length > 0 ? (
//         <p>Logged in as: {accounts[0].username}</p>
//       ) : (
//         <button onClick={handleLogin}>Login</button>
//       )}
//     </div>
//   );
// }

// export default App;
