// Selecting elements
const form = document.querySelector("#form");
const formText = document.querySelector(".form-text");
const emailInput = document.querySelector("#email");
const btnSubmit = document.querySelector(".btn");
const info = document.querySelector(".info");
const jobInfoCards = document.querySelectorAll("#job-info .card");
const btnViewMore = document.querySelectorAll(".btn-view-more");
const btnViewLess = document.querySelectorAll(".btn-view-less");
const viewState = [0, 0, 0, 0, 0, 0];

// Feature: Hide Personal Infomation
btnSubmit.addEventListener("click", (e) => {
  // Check for valid email
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = regex.test(emailInput.value);
  if (validEmail) {
    // show info
    info.classList.remove("hide");
    // hide form
    form.classList.add("hide");
  } else {
    // show error message
    formText.classList.remove("hide");
  }
});

// When user click on the input field to enter email
emailInput.addEventListener("focus", () => {
  // hide the error message
  formText.classList.add("hide");
});

// Feature: Hide Exprerience Infomations
btnViewMore.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    switchViewState(i);
  });
});

btnViewLess.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    switchViewState(i);
  });
});

// function declarations
jobInfoCards.forEach((card, i) => {
  card.addEventListener("mouseover", (e) => {
    if (isShowContent(i)) hideViewMoreAndShowViewLess(i);
    else showViewMoreAndHideViewLess(i);
  });
  card.addEventListener("mouseleave", (e) => {
    hideBoth(i);
  });
});

function switchViewState(i) {
  viewState[i] = viewState[i] === 0 ? 1 : 0;
  document.querySelector(`.job-info-${i}`).classList.toggle("hide");
  if (isShowContent(i)) hideViewMoreAndShowViewLess(i);
  else showViewMoreAndHideViewLess(i);
}

function isShowContent(i) {
  return viewState[i] !== 0;
}

function hideViewMoreAndShowViewLess(i) {
  document.querySelector(`.view-more-${i}`).classList.add("hide");
  document.querySelector(`.view-less-${i}`).classList.remove("hide");
}

function showViewMoreAndHideViewLess(i) {
  document.querySelector(`.view-more-${i}`).classList.remove("hide");
  document.querySelector(`.view-less-${i}`).classList.add("hide");
}

function hideBoth(i) {
  document.querySelector(`.view-more-${i}`).classList.add("hide");
  document.querySelector(`.view-less-${i}`).classList.add("hide");
}
