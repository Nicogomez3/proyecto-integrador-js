const formContainer = document.querySelector('.form__container')
const nameInput = document.getElementById('nameInput')
const lastNameInput = document.getElementById('lastNameInput')
const emailInput = document.getElementById('emailInput')
const phoneInput = document.getElementById('phoneInput')
const textAreaInput = document.getElementById('textAreaInput')


const users = JSON.parse(localStorage.getItem('users')) || [];

const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
}

const empty = (input) => {
    return !input.value.trim().length;
}

const between = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
}

const emailValid = (input) => {
    const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    return regex.test(input.value.trim());
}

const phoneValid = (input) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return regex.test(input.value.trim());
}


const showError = (input, message) => {
    const formInputs = input.parentElement
    formInputs.classList.remove('success')
    formInputs.classList.add('error')
    const error = formInputs.querySelector("small")
    error.style.display = "block";
    error.textContent = message;
}

const showSuccess = (input) => {
    const formInputs = input.parentElement
    formInputs.classList.remove('error')
    formInputs.classList.add('success')
    const error = formInputs.querySelector("small")
    error.textContent = "";
}

const checkNamesInput = (input) => {
    let valid = false;
    const minCh = 3;
    const maxCh = 25;
    
    if(empty(input)) {
     showError(input, "Este campo es obligatorio")
     return
    }

    if(!between(input, minCh, maxCh)) {
        showError(input, `El campo debe tener entre ${minCh} y ${maxCh} caracteres`)
        return
    }

    showSuccess(input)
    valid = true;
    return valid
};

const checkEmail = (input) => {
    let valid = false;

    if(empty(input)) {
        showError(input, "Este campo es obligatorio")
        return
    }

    if(!emailValid(input)) {
        showError(input, "El email no es valido")
        return
    }
    showSuccess(input);
    valid = true;
    return valid;
}

const checkPhone = (input) => {
    valid = false;

    if(empty(input)) {
        showError(input, "Este campo es obligatorio")
        return
    }

    if(phoneValid(input)) {
        showError(input, "El numero de telefono ingresado no es valido")
        return
    }

    showSuccess(input)
    valid = true;
    return valid;
}

const checkArea = (input) => {
    valid = false;

    const minCh = 10;
    const maxCh = 300;

    if(empty(input)) {
        showError(input, "Este campo es obligatorio")
        return
    }

    if(!between(input, minCh, maxCh)) {
        showError(input, `El campo debe tener entre ${minCh} y ${maxCh} caracteres`)
        return
    }

    showSuccess(input)
    valid = true;
    return valid;
}

const clearForm = () => {
    nameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    textAreaInput.value = '';
    
    const inputs = [nameInput, lastNameInput, emailInput, phoneInput, textAreaInput];
    inputs.forEach(input => {
        const formInputs = input.parentElement;
        formInputs.classList.remove('success', 'error');
        const error = formInputs.querySelector("small");
        if (error) {
            error.textContent = "";
            error.style.display = "none";
        }
    });
}


const validateSubmit = (e) => {
    e.preventDefault()
    console.log(`Mensaje enviado`)

    let nameValid = checkNamesInput(nameInput);
    let lastNameValid = checkNamesInput(lastNameInput);
    let emailValid = checkEmail(emailInput);
    let phoneValid = checkPhone(phoneInput);
    let textAreaValid = checkArea(textAreaInput);
    // console.log(nameValid)

    let validForm = nameValid && lastNameValid && emailValid && phoneValid;
    if(validForm) {
        users.push({
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            message: textAreaInput.value
        })
        saveToLocalStorage(users)
        alert('Tu mensaje fue enviado con exito');
        clearForm();
    }
}





const init2 = () => {
    formContainer.addEventListener('submit', validateSubmit);
    nameInput.addEventListener('input', () => checkNamesInput(nameInput));
    lastNameInput.addEventListener('input', ()=> checkNamesInput(lastNameInput));
    emailInput.addEventListener('input', ()=> checkEmail(emailInput));
    phoneInput.addEventListener('input', ()=> checkPhone(phoneInput));
    textAreaInput.addEventListener('input', ()=> checkArea(textAreaInput));
}

init2()