// Ning

// to get user info here & set userAppearance

let bodyDom = document.getElementById("nameCkeckBody");
let appearanceIconDom = document.getElementById("appearanceIconWrapper");
let headerLogo = document.getElementById("headerLogo");
let worldMap = document.getElementById("worldMap");
let mainPageLogo = document.getElementById("mainPageLogo");
const sunIcon = `<i class="ri-sun-fill" onClick="changeAppearance('light')"></i>`;
const moonIcon = `<i class="ri-moon-fill" onClick="changeAppearance('dark')"></i>`;

addEventListener("load", (event) => {
  // todo login feature
  setUserAppearance();
});
// get localStorage
const getLocalStorage = (key = "user", type = "String") => {
  let value;
  if (type !== "String") {
    value = JSON.parse(localStorage.getItem(key)) || null;
  } else {
    value = localStorage.getItem(key) || null;
  }
  return value;
};
// set localStorage
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
// set Appearance & icon
const setUserAppearance = () => {
  /*Depends on whether logged in. If logged in, read the user's configuration. 
      ( maybe like :{name: 'xxx', id: '123', appearanceMode: 'dark', ...})
    If not logged in, read the local Appearance configuration.
  */
  let userInfo = getLocalStorage("user", "Object");
  let curAppearance;
  if (userInfo) {
    curAppearance = userInfo.appearanceMode;
  } else {
    curAppearance = getLocalStorage("appearanceMode");
  }
  if (curAppearance === "dark") {
    bodyDom.classList.add("dark");
    appearanceIconDom.innerHTML = sunIcon;
    headerLogo.src = "../images/logo(1)-white.png";
    mainPageLogo.src = "../images/logo-white.png";
    worldMap.src = "../images/world-map(1).png";
  } else {
    bodyDom.classList.remove("dark");
    appearanceIconDom.innerHTML = moonIcon;
    headerLogo.src = "../images/logo(1).png";
    worldMap.src = "../images/world-map.png";
    mainPageLogo.src = "../images/logo.png";
  }
};

// set appearance Localstorage
const changeAppearance = (mode = "dark") => {
  let userInfo = getLocalStorage("user", "Object");
  // if login, update appearance in userinfo. Else save directly
  if (userInfo) {
    setLocalStorage("user", { ...userInfo, appearanceMode: mode });
    setUserAppearance();
  } else {
    setLocalStorage("appearanceMode", mode);
    setUserAppearance();
  }
};
