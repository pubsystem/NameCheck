// Get the modal
const modal = document.getElementById("nameOriginModal"),
  modalContent = document.getElementById("modalContent"),
  nameOriginForm = document.getElementById("nameOrigin"),
  firstNameInput = document.getElementById("firstNameInput"),
  lastNameInput = document.getElementById("lastNameInput"),
  // Get the button that opens the modal
  originCheckBtn = document.getElementById("checkOriginBtn"),
  messageAlert = document.getElementById("messageAlert"),
  messageAlertText = document.getElementById("messageAlertText"),
  predictAgeBtn = document.getElementById("predictAgeBtn"),
  similarNameBtn = document.getElementById("similarNameBtn"),
  randomNameBtn = document.getElementById("randomNameBtn");

// Get the <span> element that closes the modal
let spanOrigin = document.getElementsByClassName("close")[0];
// open model after form Validate
const openModel = (type) => {
  switch (type) {
    case "randomName":
      // append corresponding form item in model before open it
      // modalContent.innerHTML = `todo`
      modal.style.display = "block";
      break;
    case "similarName":
      modal.style.display = "block";
      break;
    case "predictAge":
      modal.style.display = "block";
      break;
    default:
      modal.style.display = "block";
      break;
  }
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
// when click tools btn
originCheckBtn.addEventListener(
  "click",
  (event) => formValidate(event, "nameOrigin"),
  false
);
// this three are different logic with the main tools
// i think we should open model first and render the corresponding form in it
randomNameBtn.addEventListener("click", () => openModel("randomName"), false);
similarNameBtn.addEventListener("click", () => openModel("similarName"), false);
predictAgeBtn.addEventListener("click", () => openModel("predictAge"), false);

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
    case "predictAge":
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

// predict age

document.addEventListener("DOMContentLoaded", () => {
  const toolButtons = document.querySelectorAll(".otherToolTryBtn");
  toolButtons.forEach((button) => {
    button.addEventListener("click", handleToolButtonClick);
  });

  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  window.addEventListener("click", (event) => {
    if (event.target.className === "modal") {
      closeModal();
    }
  });
});

function handleToolButtonClick(event) {
  const buttonId = event.target.id;
  switch (buttonId) {
    case "predictAgeBtn":
      setModalContentForPredictAge();
      break;
    case "randomNameBtn":
      break;
    case "similarNameBtn":
      break;
  }
}

function setModalContentForPredictAge() {
  const modal = document.getElementById("predictAgeModal");
  const modalContent = document.getElementById("modalContentPredictAge");
  modalContent.innerHTML = `
    <div id="predictAgeForm">
          <h1>Firstname</h1>
          <h1>Lastname</h1>
        </div>

        <div class="ageInfoContainer">
          <h3>Predict Age:</h3>
          <img src="" alt="" />
        </div>
  `;

  modal.style.display = "block";
}

function closeModal() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
}
//similar name
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
  }
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("otherToolTryBtn")) {
    const buttonId = event.target.id;

    switch (buttonId) {
      case "predictAgeBtn":
        openModal("predictAgeModal");
        break;
      case "similarNameBtn":
        openModal("similarNamesModal");
        break;
    }
  }
});

function setupModalClose() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", function (event) {
      if (event.target.classList.contains("close") || event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupModalClose();
});
