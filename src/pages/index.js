import "../pages/index.css";
let users = [];

// function for add user as object to array (users)
const addUser = (e) => {
  e.preventDefault();
  let user = {
    name: document.querySelector(".forms__name-input").value,
    address: document.querySelector(".forms__address-input").value,
    phone: document.querySelector(".forms__num-input").value,
    additionalPhone: document.querySelector(".forms__num-input-additional")
      .value,
    city: document.querySelector(".selector-city").value,
    reson: document.querySelector(".forms__select-reson").value,
    commit: document.querySelector(".forms__text-commit").value,
    offer: document.querySelector(".forms-second-stage__select-offer").value,
    tariff: document.querySelector(".forms-second-stage__select-tariff").value,
  };
  users.push(user);
};
document
  .querySelector(".forms-second-stage__btn-next")
  .addEventListener("click", addUser);

const elementCocntainer = document.querySelector(
  ".forms-third-stage__list-container"
);
const template = document.querySelector(".template");

function getItem(item) {
  const allP = template.content.cloneNode(true);
  const addTitle = allP.querySelector(".fullname");
  const addAddress = allP.querySelector(".address");
  const addPhone = allP.querySelector(".phone");
  const addAdditionalPhone = allP.querySelector(".additional-phone");
  const addCity = allP.querySelector(".city");
  const addReson = allP.querySelector(".reson");
  const addCommit = allP.querySelector(".commit");
  const addOffer = allP.querySelector(".offer");
  const addTariff = allP.querySelector(".tariff");
  addTitle.textContent = "ФИО: " + item.name;
  addAddress.textContent = "Адрес: " + item.address;
  addPhone.textContent = "Номер телефона: " + item.phone;
  addAdditionalPhone.textContent = "Доп.телефон: " + item.additionalPhone;
  addCity.textContent = "Город: " + item.city;
  addReson.textContent = "Причина: " + item.reson;
  addCommit.textContent = "Доп.Комментарий: " + item.commit;
  addOffer.textContent = "Предложение: " + item.offer;
  addTariff.textContent = "Тариф: " + item.tariff;
  return allP;
}

// rander elemets to page
function addEl() {
  elementCocntainer.innerHTML = "";
  const page = users.map(getItem);
  elementCocntainer.prepend(...page);
}
//  reset array
function removeEl() {
  users = [];
}
//  add data to local storge
function addUsersToLocalStorge() {
  localStorage.setItem("MyUsers", JSON.stringify(users));
}

const checkInfoBtn = document
  .querySelector(".forms-second-stage__btn-next")
  .addEventListener("click", () => {
    addEl();
  });

// ////////////////////////////////////////////////////////////////

//  multi step functions
const steps = Array.from(document.querySelectorAll(".forms"));
const form = Array.from(document.querySelectorAll(".forms__form"));

// function to make next step
function changeStep(btn) {
  const active = document.querySelector(".forms__show");
  let index = 0;
  index = steps.indexOf(active);
  steps[index].classList.remove("forms__show");
  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;
  }
  steps[index].classList.add("forms__show");
}

//  function back to first step
function backToPrimaryStep() {
  const active = document.querySelector(".forms__show");
  let index = 0;
  index = steps.indexOf(active);
  steps[index].classList.remove("forms__show");
  steps[0].classList.add("forms__show");
}

// function to reset all inputs
function resetInputs() {
  form.forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    return f.reset();
  });
}

// function toggle popup (when cancel)
const popup = document.querySelector(".popup");

function openPopupCancel() {
  popup.classList.add("popup__show");
}

const popupCloseBtn = document
  .querySelector(".popup__btn")
  .addEventListener("click", () => {
    popup.classList.remove("popup__show");
  });

// foreach all next btn and add event listener
const nextBtn = document.querySelectorAll(".forms__btn-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    changeStep("next");
  });
});

// foreach all back btn and add event listener
const prevBtn = document.querySelectorAll(".forms__btn-back").forEach((btn) => {
  btn.addEventListener("click", () => {
    changeStep("prev");
    removeEl();
  });
});

// the last btn (finish btn)
const lastBtn = document
  .querySelector(".forms-fourth-stage__btn-finish")
  .addEventListener("click", () => {
    resetInputs();
    backToPrimaryStep();
  });

// send data to local storge send btn
const sendBtn = document
  .querySelector(".send")
  .addEventListener("click", () => {
    addUsersToLocalStorge();
    removeEl();
  });

// forEach cancel btn and add event to close delete array and open popup whene click cancel

const cancelBtn = document
  .querySelectorAll(".forms__btn-cancel")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      openPopupCancel();
      resetInputs();
      backToPrimaryStep();
      removeEl();
    });
  });

// a simple validations

// a simple validations
const inputsValidate = Array.from(document.querySelectorAll(".input-validate"));

document.addEventListener("mousemove", () => {
  inputsValidate.forEach((n) => {
    if (n.value === "" || n.value.length <= 3) {
      n.classList.add("forms__input_error");
    } else {
      n.classList.remove("forms__input_error");
    }
  });
});
