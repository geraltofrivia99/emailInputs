import { validateEmail, generateRandomEmail } from './utils';
import image from './images/remove.png';

export default class EmailsInput {
	constructor(container) {
        this._init(container);
        this._container = container;

        this._emailInner = container.childNodes[0].childNodes[0].childNodes[1];
        this._input = this._emailInner.getElementsByClassName('emailsInput-inner-input')[0];
        this._buttonContainer = container.childNodes[0].childNodes[1];

        this._valideEmailCounter = 0;
        
        this._bindMethods('_onChange', '_onInput', '_onEmailInnerClick', '_onBtnClick', '_onPaste');

        this._eventList = [
            { element: this._input, eventName: 'input', callback: this._onInputHandler },
            { element: this._input, eventName: 'change', callback: this._onChangeHandler },
            { element: this._input, eventName: 'paste', callback: this._onPasteHandler },
            { element: this._emailInner, eventName: 'click', callback: this._onEmailInnerClickHandler },
            { element: this._buttonContainer, eventName: 'click', callback: this._onBtnClickHandler },
        ]
        this._addListener(this._eventList);
        
    }

    _init(container) {
        container.innerHTML = this._createEmailContainer();
    }

    _bindMethods(...args) {
        args.forEach((fn) => {
            this[`${fn}Handler`] = this[fn].bind(this);
        })
    }

    _addListener(array) {
        array.forEach(({ element, eventName, callback }) => {
            element.addEventListener(eventName, callback);
        })
    }

    _removeListener(array) {
        array.forEach(({ element, eventName, callback }) => {
            element.removeEventListener(eventName, callback);
        })
    }

    _createEmailContainer() {
        return `<div class="emailsInput"><div class="emailsInput-container">${this._createTitle()}${this._createEmailInner()}</div><div class="emailsInput-btn-container">${this._createButton('Add email', 'btn btn-add')}${this._createButton('Get emails count', 'btn btn-counter')}</div></div>`
    }

    _createTitle() {
        return '<div class="emailsInput-title">Share <b class="emailsInput-title_bold">Board name</b> with others</div>'
    }

    _createButton(value, className) {
        return `<button class="${className}">${value}</button>`
    }

    _createEmailInner() {
        return `<div class="emailsInput-inner"><input autofocus class="emailsInput-inner-input" placeholder="Add more people..." /></div>`
    }

    _onInput(e) {
        const value = e.target.value;
        if (value.length > 1 && value[value.length - 1] === ',') {
            this._insertEmailitem(this._createEmailItem(value.substring(0, value.length - 1)));
        }
    }

    _onChange(e) {
        const value = e.target.value;
        this._insertEmailitem(this._createEmailItem(value));
    }

    _onPaste(e) {
        setTimeout((self) => {
            if (e.target.value) {
                e.target.value.split(',')
                    .forEach((email) => {
                        self._insertEmailitem(self._createEmailItem(email.replace(/\s/g, '')));
                    })
            }
        }, 0, this)
    }

    _formatedMultyEmails(value) {
        const someEmails = value.split(',');

    }

    _onEmailInnerClick(e) {
        if (e.target.classList.contains('emailsInput-inner_box-remover')) {
            this._removeElement(e.target.parentElement, 300);
        } else if (e.target === this._emailInner) {
            this._input.focus();
        }
    }

    _onBtnClick(e) {
        if (e.target.classList.contains('btn-add')) {
            this._insertEmailitem(this._createEmailItem(generateRandomEmail()));
            this._input.focus();
        } else if (e.target.classList.contains('btn-counter')) {
            alert(`Valide email count: ${this._valideEmailCounter}`)
            this._input.focus();
        }
    }

    _removeElement(el, ms = 1000) {
        let seconds = ms/1000;
        el.style.transition = "opacity "+ seconds +"s ease-in-out";
        el.style.opacity = 0;
        setTimeout(function(self) {
            if (el.classList.contains('valide')) {
                self._valideEmailCounter--;
            }
            el.remove();
        }, ms, this);
    }

    _insertEmailitem(el) {
        this._emailInner.insertBefore(el, this._input);
        this._input.value = '';
        if (this._emailInner.scrollHeight > this._emailInner.offsetHeight) {
            this._emailInner.scrollTop = this._emailInner.scrollHeight;
        }
    }

    _createEmailItem(value) {
        const el = document.createElement('div');
        const isValide = validateEmail(value);
        el.classList.add('emailsInput-inner_box', isValide ? 'valide' : 'unvalide');
        el.innerHTML = `<span class="emailsInput-inner_box-text">${value}</span><div class="emailsInput-inner_box-remover"><img src="${image}" alt=""/></div>`
        if (isValide) {
            this._valideEmailCounter++;
        }
        return el;
    }

    removeForm() {
        this._removeListener(this._eventList);
        container.remove();
    }
}
