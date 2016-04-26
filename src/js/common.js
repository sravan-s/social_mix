'use strict';

let App = {};

//Config: Ajax config
App.AJAX = function(config) {
    //Initializations
    let type = config.type || 'POST';
    let url = config.url || '/';
    let baseUrl = config.baseUrl || window.location.origin;
    let data = config.data || "";
    let callback = config.callback;
    let request = new XMLHttpRequest();

    //Request handler
    request.onreadystatechange = callback

    //open and send request
    request.open(type, baseUrl + url, true);
    request.send(data);
}

//FormClass
App.FormModule = function(formId) {
    let _this = this;
    this.form = document.getElementById(formId);
    let inputs = this.form.querySelectorAll('input');
    let submits = this.form.querySelectorAll('[type="submit"]');
    let action = this.form.getAttribute('action');
    let submitClikHandler = function(event) {
        event.preventDefault();
    };
    submits.forEach((submit) => {
        submit.addEventListener('click', submitClikHandler);
    });
}

export {App};
