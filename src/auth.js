import { makeApiCall } from "./callapi.js";
import { reset } from "./reset.js";

const API_key = "AIzaSyBYf4BqVTCZogqRKxcmmEdzufGesXDmKII";
const CLIENT_ID =
  "984566811730-bmukbq2h5lk81rs3g5drdcudc8rpbe31.apps.googleusercontent.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/youtube";

const signIn = document.querySelector("#signIn");
const signOut = document.querySelector("#signOut");

let GoogleAuth;

export function initClient() {
  gapi.client
    .init({
      apiKey: API_key,
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: DISCOVERY_DOCS,
    })
    .then(() => {
      GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      let user = GoogleAuth.currentUser.get();
      setSigninStatus();
      makeApiCall();

      signIn.onclick = handleAuthClick;
      signOut.onclick = revokeAccess;
    });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    GoogleAuth.signOut();
  } else {
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
  reset();
}

function setSigninStatus() {
  let user = GoogleAuth.currentUser.get();
  let isAuthorized = user.hasGrantedScopes(SCOPES);
  if (isAuthorized) {
    signIn.style.display = "none";
    signOut.style.display = "block";
    console.log("You have signed in!");
  } else {
    signIn.style.display = "block";
    signOut.style.display = "none";
    console.log("You are signed out!");
  }
}

function updateSigninStatus() {
  setSigninStatus();
}
