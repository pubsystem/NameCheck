// Get the modal
const modal = document.getElementById("nameOriginModal"),
  nameOriginForm = document.getElementById("nameOrigin"),
  firstNameInput = document.getElementById("firstNameInput"),
  lastNameInput = document.getElementById("lastNameInput"),
  // Get the button that opens the modal
  originCheckBtn = document.getElementById("checkOriginBtn"),
  messageAlert = document.getElementById("messageAlert");
messageAlertText = document.getElementById("messageAlertText");

// Get the <span> element that closes the modal
let spanOrigin = document.getElementsByClassName("close")[0];
// open model after form Validate
const openModel = () => {
  modal.style.display = "block";
};
//
firstNameInput.addEventListener(
  "blur",
  (event) => formValidate(event, "nameOrigin", false, false),
  false
);
lastNameInput.addEventListener(
  "blur",
  (event) => formValidate(event, "nameOrigin", false, false),
  false
);
// when click nameOrigin btn
originCheckBtn.addEventListener(
  "click",
  (event) => formValidate(event, "nameOrigin"),
  false
);

//  formValidate & call api function
const formValidate = (
  e,
  type = "nameOrigin",
  needFetch = true,
  needAlert = true
) => {
  e.preventDefault();
  let alertType = [];
  alertEle = [];
  switch (type) {
    case "nameOrigin":
      formData = new FormData(nameOriginForm);
      let firstName = formData.get("firstName"),
        lastName = formData.get("lastName");
      // console.log("firstName", firstName, "lastName", lastName);
      if (!firstName) {
        alertType.push("firstName");
        alertEle.push(firstNameInput);
      } else {
        firstNameInput.classList.remove("inputAlert");
      }
      if (!lastName) {
        alertType.push("lastName");
        alertEle.push(lastNameInput);
      } else {
        lastNameInput.classList.remove("inputAlert");
      }

      if ((!firstName || !lastName) && needAlert) {
        formItemAlert(alertEle, alertType);
        return false;
      } else {
        if (needFetch) {
          openModel();
          // fetch data here
          // fetchData(type)
        }
      }

      // todo form item required alert
      break;
    case "similarName":
      break;
    case "randomName":
      break;
    case "agePridect":
      break;
    default:
      break;
  }
};

const formItemAlert = (eles = [], types) => {
  console.log(eles, types);
  eles.map((ele) => {
    ele.classList.add("inputAlert");
  });
  messageAlertText.innerHTML = `${types.join(", ")} required!`;
  messageAlert.classList.add("messageAlertAnimation");
  setTimeout(() => {
    messageAlert.classList.remove("messageAlertAnimation");
  }, 3000);
};

// When the user clicks on <span> (x), close the modal
// spanOrigin.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
