// Selecting elements
const form = document.querySelector("#form");
const formText = document.querySelector(".form-text");
const emailInput = document.querySelector("#email");
const btnSubmit = document.querySelector(".btn");
const info = document.querySelector(".info");
const jobInfo = document.querySelectorAll(".card");
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
// Using DOM Traverse
jobInfo.forEach((infoCard, i) => {
  const infoBody = infoCard.firstElementChild;
  const children = infoBody.children;
  // select the element that we need to hide  
  const infoText = children[1];
  // use "mouseenter" instead of "mouseover" event
  // because "mouseover" will be triggered on every child elements,
  // making it harder for targeting the element that we need
  infoCard.addEventListener("mouseenter", () => {
    const viewBtn = document.createElement("button");
    viewBtn.classList.add("btn-view");
    changeButtonContent(viewState[i], viewBtn);
    if (!(infoBody.lastElementChild instanceof HTMLButtonElement))
      infoBody.appendChild(viewBtn);
    viewBtn.addEventListener("click", (e) => {
      // toggle view state
      viewState[i] = viewState[i] === 0 ? 1 : 0;
      infoText.classList.toggle("hide");
      changeButtonContent(viewState[i], viewBtn);
    });
  });
  
  // remove the button when the mouse pointer leaves
  // the selected element.  
  infoCard.addEventListener("mouseleave", () => {
    infoBody.removeChild(infoBody.lastElementChild);
  });
});

// change the content of the button based on whether the card content 
// is showing or not
// I tried to use "createElement" to create the icon on the fly, then
// assigns appropriate class to it before appending it to the button but
// it seems like the performance is not good (at least on my laptop), that why
// I decided to use "innerHTML".
function changeButtonContent(viewState, btn) {
  if (viewState === 0)
    btn.innerHTML = '<i class="bi bi-caret-down-fill"></i> Show more';
  else btn.innerHTML = '<i class="bi bi-caret-up-fill"></i> Show less';
}


