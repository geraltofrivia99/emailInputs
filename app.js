import EmailsInput from './components/EmailsInput';
let counter = 1;
const F = new EmailsInput(document.getElementsByClassName('form')[0]);
const addBtn = document.getElementsByClassName('btn-add-form')[0];

addBtn.addEventListener('click', addFormHandler);

function addFormHandler() {
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('form');
    document.body.appendChild(formWrapper);
    new EmailsInput(formWrapper);
    counter++;
}

















