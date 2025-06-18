export const msalConfig = {
  auth: {
    clientId: "1f3b155a-a455-4bb4-be61-b9aa07fc0c25",
    authority: "https://login.microsoftonline.com/ca087c65-1f73-459e-b50e-dbe3a88c0958",
    redirectUri: "http://localhost:3001",
    knownAuthorities: ["login.microsoftonline.com"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    iframeHashTimeout: 10000,
    loadFrameTimeout: 10000,
  },
};
