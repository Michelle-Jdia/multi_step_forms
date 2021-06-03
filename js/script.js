const steps = Array.from(document.querySelectorAll(".forms"));
const nextBtn = document.querySelectorAll(".forms__btn-next");
const prevBtn = document.querySelectorAll(".forms__btn-back");
const lastBtn = document.querySelector(".forms-fourth-stage__btn-finish");
const form = Array.from(document.querySelectorAll(".forms"));
nextBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    changeStep("next");
  });
});
prevBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    changeStep("prev");
  });
});
lastBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = [];
  form.querySelectorAll(".forms__input").forEach((input) => {
    const { name, value } = input;
    inputs.push({ name, value });
  });
  console.log(inputs);
  form.reset();
  let index = 0;
  const active = document.querySelector(".forms__show");
  index = steps.indexOf(active);
  steps[index].classList.remove("forms__show");
  steps[0].classList.add("forms__show");
});
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
