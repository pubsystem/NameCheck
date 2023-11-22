const nameForm = document.querySelector("#nameForm");

nameForm.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const firstName = nameForm.elements["firstName"].value;
  const lastName = nameForm.elements["lastName"].value;
  const countryCode = await getNameOrigin(firstName, lastName);
  await getNameDiaspora(countryCode, firstName, lastName);
  await getNameCountry(firstName, lastName);
  await getNameGender(firstName, lastName);
  await getNameAge(countryCode, firstName);
  await getRelatedNames(firstName);
}

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
    console.log(data);
    return data.countryOrigin; // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

async function getNameDiaspora(countryCode, firstName, lastName) {
  const response = await fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/diaspora/${countryCode}/${firstName}/${lastName}`,
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
    console.log(data); // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

async function getNameCountry(firstName, lastName) {
  const response = await fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/country/${firstName}${lastName}`,
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
    console.log(data); // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

async function getNameGender(firstName, lastName) {
  const response = await fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/gender/${firstName}/${lastName}`,
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
    console.log(data); // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

async function getNameCountry(firstName, lastName) {
  const response = await fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/country/${firstName}${lastName}`,
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
    console.log(data); // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

async function getNameAge(countryCode, firstName) {
  const response = await fetch(
    `https://api.agify.io?name=${firstName}&country_id=${countryCode}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json(); // Extract JSON data from response
    console.log(data); // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}

async function getRelatedNames(firstName) {
  const response = await fetch(
    `https://www.behindthename.com/api/related.json?name=${firstName}&usage=eng&key=sh193384186`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json(); // Extract JSON data from response
    console.log(data); // View data in the console
  } else {
    console.error("The request failed with status:", response.status, response);
  }
}
