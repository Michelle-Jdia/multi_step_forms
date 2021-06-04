const steps = Array.from(document.querySelectorAll(".forms"));
const nextBtn = document.querySelectorAll(".forms__btn-next");
const prevBtn = document.querySelectorAll(".forms__btn-back");
const lastBtn = document.querySelector(".forms-fourth-stage__btn-finish");
const form = document.querySelectorAll(".forms__form");
const addInfoBtn = document.querySelector(".forms-second-stage__btn-next");
const elementCocntainer = document.querySelector(
  ".forms-third-stage__list-container"
);
const template = document.querySelector(".template");

let users = [];
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

function addEl() {
  elementCocntainer.innerHTML = "";
  const page = users.map(getItem);
  elementCocntainer.prepend(...page);
}
function removeEl() {
  users = [];
}
function addUsersToLocalStorge() {
  localStorage.setItem("MyUsers", JSON.stringify(users));
}
const checkInfoBtn = document.querySelector(".forms-second-stage__btn-next");
checkInfoBtn.addEventListener("click", () => {
  addEl();
});

/////////////////////////////////////////////////
function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".forms__show");
  index = steps.indexOf(active);
  steps[index].classList.remove("forms__show");
  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;
  }
  steps[index].classList.add("forms__show");
}
// ////////////////
nextBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    changeStep("next");
  });
});

prevBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    changeStep("prev");
    removeEl();
  });
});
//////////////////////
lastBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.forEach((f) => {
    f.reset();
  });
  let index = 0;
  const active = document.querySelector(".forms__show");
  index = steps.indexOf(active);
  steps[index].classList.remove("forms__show");
  steps[0].classList.add("forms__show");
});
// ////////////////////
const sendBtn = document
  .querySelector(".send")
  .addEventListener("click", () => {
    addUsersToLocalStorge();
    removeEl();
  });
const cancelBtn = document.querySelectorAll(".forms__btn-cancel");
cancelBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openPopupCancel();
    form.forEach((f) => {
      f.reset();
    });
    let index = 0;
    const active = document.querySelector(".forms__show");
    index = steps.indexOf(active);
    steps[index].classList.remove("forms__show");
    steps[0].classList.add("forms__show");
    removeEl();
  });
});
// ////////////////////
const popup = document.querySelector(".popup");
function openPopupCancel() {
  popup.classList.add("popup__show");
}
const popupCloseBtn = document
  .querySelector(".popup__btn")
  .addEventListener("click", () => {
    popup.classList.remove("popup__show");
  });
