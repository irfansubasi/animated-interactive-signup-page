const form = document.querySelector(".form");
const nicknameField = document.querySelector("#nick_name");
const emailField = document.querySelector("#user_email");
const passwordField = document.querySelector("#user_password");
const confirmField = document.querySelector("#confirm_password");
const astroSpeech = document.querySelector("#speech");
const visor = document.querySelector(".visor");
const visorShade = document.querySelectorAll(".visor-shade");
const firstWord = astroSpeech.querySelector("tspan:nth-child(1)");
const secondWord = astroSpeech.querySelector("tspan:nth-child(2)");

const leftArm = document.querySelector(".left-arm");

const steps = document.querySelector("#steps");
const rects = steps.querySelectorAll('rect');

const otherGender = document.querySelector("#other");
const maleGender = document.querySelector("#male");
const femaleGender = document.querySelector("#female");

const confirmButton = document.querySelector("#confirm-button");


function isValidNick(value){
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(value) && value.length > 3;
}

function isValidEmail(email){
    const emailRegex = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email);
}

function isPasswordValid(password){
    return password.length > 4;
}

function isPasswordsSame(password, confirm){
    return password === confirm && confirm.length > 4;
}


confirmButton.addEventListener("click", (event) => {

    event.preventDefault();
    
    let allRectsOpaque = true;

    rects.forEach((rect) => {
        if (rect.getAttribute("opacity") !== "1") {
            allRectsOpaque = false;
        }
    });

    if (allRectsOpaque) {
        firstWord.textContent = "We are ready";
        secondWord.textContent = "to go!";

        setTimeout(() => {
            document.querySelector("#sign-up-form").submit();
        }, 5000);
    }

})


emailField.onclick = (disableArmAni);

passwordField.addEventListener("click", () => {
    disableArmAni();
    firstWord.textContent = `OK! OK! I won't look!`;
    secondWord.textContent = `*Visor Disabled*`;
    visor.style.fill = "var(--black-color)"
    visorShade.forEach((shades) => {
        shades.style.fill = "var(--grey-color)"
    });
})

confirmField.addEventListener("click", () => {
    disableArmAni();
    visor.style.fill = "var(--black-color)"
    visorShade.forEach((shades) => {
        shades.style.fill = "var(--grey-color)"
    });
})

passwordField.addEventListener("blur" , () => {

    turnNormal();

    if(!isPasswordValid(passwordField.value)){
        passwordField.classList.add("invalid-input");
        firstWord.textContent = "I don't look but my cosmic senses"
        secondWord.textContent = "tell me your password is less than 5 characters.";
        deleteSteps(2);
    }else{
        passwordField.classList.remove("invalid-input");
        activeSteps(2);
    }
})

confirmField.addEventListener("blur" , () => {

    turnNormal();

    if(!isPasswordsSame(passwordField.value , confirmField.value)){
        confirmField.classList.add("invalid-input");
        firstWord.textContent = "My cosmic senses tell me";
        secondWord.textContent = "your passwords do not match!"
    }else{
        confirmField.classList.remove("invalid-input");
    }
})

nicknameField.addEventListener("blur" , () =>{
    const name = document.querySelector("#nick_name")
    const tspanElements = astroSpeech.querySelectorAll("tspan");
    

    if(!isValidNick(nicknameField.value)){
        nicknameField.classList.add("invalid-input");
        disableArmAni();
        turnRed();
        firstWord.textContent = `Username must have min 4 characters and can`;
        secondWord.textContent = `contain only " - " and " _ " as special characters!`;
        deleteSteps(0);
    }else{
        nicknameField.classList.remove("invalid-input");
        turnNormal()
        firstWord.textContent = `Hello,`;
        secondWord.textContent = `${name.value}!`;
        leftArm.classList.add("animated-left-arm");
        activeSteps(0);
    }
})

emailField.addEventListener("blur" , () =>{

    if(!isValidEmail(emailField.value)){
        emailField.classList.add("invalid-input");
        turnRed();
        firstWord.textContent = "Oh please!";
        secondWord.textContent = "Enter a valid email!";
        deleteSteps(1)
    }else{
        turnNormal()
        emailField.classList.remove("invalid-input");
        activeSteps(1);
    }
})

function disableArmAni(){
    leftArm.classList.remove("animated-left-arm");
}

function turnRed(){
    visor.style.fill = "var(--red-color)";
    visorShade.forEach((shades) => {
        shades.style.fill = "var(--red-color-darker)"
    });
}

function turnNormal(){
    visor.style.fill = "var(--light-blue)";
    visorShade.forEach((shades) => {
        shades.style.fill = "var(--light-blue-darker)"
    });
}

function activeSteps(value){
    let rect = rects[value];
    rect.setAttribute('opacity', '1');
}

function deleteSteps(value){
    let rect = rects[value];
    rect.setAttribute('opacity', '0');
}













const today = new Date();

// Gün seçeneklerini oluştur ve bugünü default olarak seç
const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
  const option = new Option(i, i);
  if (i === today.getDate()) {
    option.selected = true;
  }
  daySelect.add(option);
}

// Ay seçeneklerini oluştur ve bugünü default olarak seç
const monthSelect = document.getElementById("month");
for (let i = 1; i <= 12; i++) {
  const option = new Option(i, i);
  if (i === today.getMonth() + 1) {
    option.selected = true;
  }
  monthSelect.add(option);
}

// Yıl seçeneklerini oluştur ve bugünü default olarak seç
const yearSelect = document.getElementById("year");
const currentYear = today.getFullYear();
for (let i = currentYear - 100; i <= currentYear; i++) {
  const option = new Option(i, i);
  if (i === currentYear) {
    option.selected = true;
  }
  yearSelect.add(option);
}

yearSelect.addEventListener('change', () => {
    activeSteps(3);
});

document.querySelector('#other').addEventListener('change', () => {
    let selectedOption = this.value;
    let radios = document.querySelectorAll('input[type="radio"]');
    if (selectedOption !== '') {
        radios.forEach((radio) => {
            radio.checked = false;
        });
    }
});

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        document.getElementById('other').value = '';
        activeSteps(4);
    });
});