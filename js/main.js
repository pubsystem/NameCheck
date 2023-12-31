// Get the modal
const nameOriginModal = document.getElementById("nameOriginModal"),
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
  randomNameBtn = document.getElementById("randomNameBtn"),
  //Get Name Origin Modal Element
  displayFirstName = document.getElementById("displayFirstName"),
  displayLastName = document.getElementById("displayLastName"),
  countryOriginText = document.getElementById("countryOriginText"),
  countryOriginImg = document.getElementById("countryOriginImg"),
  regionOriginText = document.getElementById("regionOriginText"),
  regionOriginImg = document.getElementById("regionOriginImg"),
  altCountryOriginText = document.getElementById("altCountryOriginText"),
  altCountryOriginImg = document.getElementById("altCountryOriginImg"),
  scriptImg = document.getElementById("scriptImg"),
  scriptText = document.getElementById("scriptText"),
  randomNameModal = document.getElementById("randomNameModal"),
  similarNameModal = document.getElementById("similarNameModal"),
  randomNameSubmit = document.getElementById("randomNameSubmit"),
  randomNameForm = document.getElementById("randomNameForm"),
  randomNameText = document.getElementById("randomNameText");

// predict age and similar name part
let sp_firstNameInput = document.getElementById("sp_firstNameInput");
let sp_lastNameInput = document.getElementById("sp_lastNameInput");
let checkSPBtn = document.getElementById("checkSPBtn");
let sp_name_form = document.getElementById("sp_name");
let sp_result = document.getElementById("sp_result");

// Get the <span> element that closes the modal
let spanOrigin = document.getElementsByClassName("close")[0];

let curToolType = "similarName";
// open model after form Validate
const openModel = (type) => {
  switch (type) {
    case "randomName":
      // append corresponding form item in model before open it
      // modalContent.innerHTML = `todo`
      randomNameModal.style.display = "block";
      break;
    case "similarName":
      curToolType = "similarName";
      similarNameModal.style.display = "block";
      break;
    case "predictAge":
      curToolType = "predictAge";
      similarNameModal.style.display = "block";
      break;
    default:
      nameOriginModal.style.display = "block";
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

randomNameSubmit.addEventListener("click", handleRandomNameSubmit);

checkSPBtn.addEventListener("click", (e) => handle_SP_Submit(e));

// Eden
const handle_SP_Submit = (e) => {
  console.log(e);
  e.preventDefault();
  let firstName = sp_firstNameInput.value;
  let lastName = sp_lastNameInput.value;
  if (!firstName) {
    messageAlertText.innerHTML = `First name is  required!`;
    messageAlert.classList.add("messageAlertAnimation");
    setTimeout(() => {
      messageAlert.classList.remove("messageAlertAnimation");
    }, 3000);
  } else {
    if (curToolType === "similarName") {
      fetchSimilarName(firstName);
    } else {
      fetchAgeName(firstName);
    }
  }
};

// Eden
const fetchSimilarName = async (firstName = "abc") => {
  try {
    const response = await fetch(
      `https://www.behindthename.com/api/related.json?name=${firstName}&key=ni923183619`
    );
    console.log("response", response);
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      let names = data.names || [];
      if (names.length) {
        let names = data.names.slice(0, 3);
        sp_result.innerHTML = names.join(";");
      } else {
        messageAlertText.innerHTML = data.error;
        messageAlert.classList.add("messageAlertAnimation");
        setTimeout(() => {
          messageAlert.classList.remove("messageAlertAnimation");
        }, 3000);
      }
    } else {
      console.error(
        "The request failed with status:",
        response.status,
        response
      );
    }
  } catch (err) {
    console.log(err, "ees");
    messageAlertText.innerHTML = "Network error!";
    messageAlert.classList.add("messageAlertAnimation");
    setTimeout(() => {
      messageAlert.classList.remove("messageAlertAnimation");
    }, 3000);
  }
};

// Eden
const fetchAgeName = async (firstName = "abc") => {
  try {
    const response = await fetch(`https://api.agify.io?name=${firstName}`);
    console.log("response", response);
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      let age = data.age || Math.ceil(Math.random() * 60);
      sp_result.innerHTML = age;
    } else {
      console.error(
        "The request failed with status:",
        response.status,
        response
      );
    }
  } catch (err) {
    console.log(err, "ees");
    messageAlertText.innerHTML = "Network error!";
    messageAlert.classList.add("messageAlertAnimation");
    setTimeout(() => {
      messageAlert.classList.remove("messageAlertAnimation");
    }, 3000);
  }
};

//  formValidate & call api function --- Shuwen Wu
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
          getNameOrigin(firstName, lastName);
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

// Shuwen Wu
async function getNameOrigin(firstName, lastName) {
  const response = await fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/origin/${firstName}/${lastName}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "e5f7c1891eb24c8b2fb588ae12941760",
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json(); // Extract JSON data from response
    //display name origin
    let { script, countryOrigin, regionOrigin, countryOriginAlt } = data;
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });

    displayFirstName.innerText = firstName;
    displayLastName.innerText = lastName;
    countryOriginImg.setAttribute(
      "src",
      `https://flagcdn.com/256x192/${countryOrigin.toLowerCase()}.png`
    );
    countryOriginText.innerText = regionNamesInEnglish.of(countryOrigin);
    regionOriginText.innerText = regionOrigin;
    switch (regionOrigin) {
      case "Europe":
        regionOriginImg.setAttribute("src", "../images/regions/europe.png");
        break;
      case "Asia":
        regionOriginImg.setAttribute("src", "../images/regions/asia.png");
        break;
      case "Africa":
        regionOriginImg.setAttribute("src", "../images/regions/africa.png");
        break;
      case "North America":
        regionOriginImg.setAttribute(
          "src",
          "../images/regions/north-america.png"
        );
        break;
      case "South America":
        regionOriginImg.setAttribute(
          "src",
          "../images/regions/south-america.png"
        );
        break;
      case "Oceania":
        regionOriginImg.setAttribute("src", "../images/regions/oceania.png");
        break;
      case "Antarctica":
        regionOriginImg.setAttribute("src", "../images/regions/antarctica.png");
        break;
      default:
        break;
    }
    altCountryOriginText.innerText = regionNamesInEnglish.of(countryOriginAlt);
    altCountryOriginImg.setAttribute(
      "src",
      `https://flagcdn.com/256x192/${countryOriginAlt.toLowerCase()}.png`
    );
    scriptText.innerText = script;
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

//Random Name Generator --- Shuwen Wu
async function handleRandomNameSubmit(e) {
  e.preventDefault();
  let gender = randomNameForm.elements["gender"].value;
  let ifGender;
  if (gender === "unknown") {
    ifGender = "";
  } else if (gender === "male") {
    ifGender = "&gender=m";
  } else if (gender === "female") {
    ifGender = "&gender=f";
  }
  let country = randomNameForm.elements["country"].value;
  try {
    const response = await fetch(
      `https://api.parser.name/?api_key=93d471ea85d1937e713e8aafffb32090&endpoint=generate&country_code=${country}${ifGender}`
    );
    // console.log("response", response);
    if (response.ok) {
      const data = await response.json();
      let name = data["data"][0]["name"];
      let fullName = `${name.firstname.name} ${name.lastname.name}`;
      randomNameText.innerText = fullName;
      randomNameSubmit.innerText = "GET NEW NAME";
    } else {
      console.error(
        "The request failed with status:",
        response.status,
        response
      );
    }
  } catch (err) {
    messageAlertText.innerHTML = "Please choose another country!";
    messageAlert.classList.add("messageAlertAnimation");
    setTimeout(() => {
      messageAlert.classList.remove("messageAlertAnimation");
    }, 3000);
  }
}

// Ning
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

// When the user clicks anywhere outside of the modal, close it --- Eden
window.onclick = function (event) {
  if (event.target == nameOriginModal) {
    nameOriginModal.style.display = "none";
  }
  if (event.target == randomNameModal) {
    randomNameModal.style.display = "none";
  }
  if (event.target == similarNameModal) {
    // remove model content
    sp_result.innerHTML = "";
    sp_firstNameInput.value = "";
    sp_lastNameInput.value = "";
    similarNameModal.style.display = "none";
  }
};

//Display countries dropdown --- Shuwen Wu
async function populateCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    // Sort countries by name
    const sortedCountries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    const selectElement = document.getElementById("country");
    sortedCountries.forEach((country) => {
      const opt = document.createElement("option");
      opt.value = country.cca2; // using ISO 3166-1 alpha-2 codes
      opt.innerHTML = country.name.common; // using the common country name
      selectElement.appendChild(opt);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function
populateCountries();
