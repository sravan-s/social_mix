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
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            callback(request);
        }
    };

    //open and send request
    request.open(type, baseUrl + url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(data);
}

//FormClass
App.FormModule = function(formId) {
    let _this = this;
    this.form = document.getElementById(formId);
    this.inputs = this.form.querySelectorAll('input');
    this.submits = this.form.querySelectorAll('[type="submit"]');
    this.action = this.form.getAttribute('action');
    for(let i = 0; i < this.submits.length; i++) {
        this.submits[i].addEventListener('click', _this.submitClikHandler.bind(_this));
    }
};

App.FormModule.prototype.submitClikHandler = function(e) {
    e.preventDefault();
    let d = {
        uname: "asd",
        pwd: "asd"
    }
    console.log(this);
    App.AJAX({
        url: this.action,
        callback: function(res) {
            console.log(res);
        },
        data: JSON.stringify(d)
    });
};

export {App};
