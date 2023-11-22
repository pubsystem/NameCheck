// to get user info here & set userApperance

let bodyDom = document.getElementById("nameCkeckBody");
let apperanceIconDom = document.getElementById("apperanceIconWrapper");
const sunIcon = `<i class="ri-sun-fill" onClick="changeApperance('light')"></i>`;
const moonIcon = `<i class="ri-moon-fill" onClick="changeApperance('dark')"></i>`;

addEventListener("load", (event) => {
  // todo login feature
  setUserApperance();
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
// set Apperance & icon
const setUserApperance = () => {
  /*Depends on whether logged in. If logged in, read the user's configuration. 
      ( maybe like :{name: 'xxx', id: '123', apperanceMode: 'dark', ...})
    If not logged in, read the local Apperance configuration.
  */
  let userInfo = getLocalStorage("user", "Object");
  let curApperance;
  if (userInfo) {
    curApperance = userInfo.apperanceMode;
  } else {
    curApperance = getLocalStorage("apperanceMode");
  }
  if (curApperance === "dark") {
    bodyDom.classList.add("dark");
    apperanceIconDom.innerHTML = sunIcon;
  } else {
    bodyDom.classList.remove("dark");
    apperanceIconDom.innerHTML = moonIcon;
  }
};

// set apperance Localstorage
const changeApperance = (mode = "dark") => {
  let userInfo = getLocalStorage("user", "Object");
  // if login, update apperance in userinfo. Else save directly
  if (userInfo) {
    setLocalStorage("user", { ...userInfo, apperanceMode: mode });
    setUserApperance();
  } else {
    setLocalStorage("apperanceMode", mode);
    setUserApperance();
  }
};
