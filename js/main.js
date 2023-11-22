// Get the modal
let modal = document.getElementById("nameOriginModal");

// Get the button that opens the modal
let originCheckBtn = document.getElementById("checkOriginBtn");

// Get the <span> element that closes the modal
let spanOrigin = document.getElementsByClassName("close")[0];

const originCheck = (e) => {
  e.preventDefault();
  // fetch data here:
  modal.style.display = "block";
};
originCheckBtn.addEventListener("click", originCheck, false);

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
