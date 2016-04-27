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
            callback(JSON.parse(request.responseText));
        }
    };

    //open and send request
    request.open(type, baseUrl + url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
}

//FormClass
App.FormModule = function(formId) {
    let _this = this;
    this.form = document.getElementById(formId);
    this.inputs = this.form.querySelectorAll('input');
    this.submits = this.form.querySelectorAll('[type="submit"]');
    this.action = this.form.getAttribute('action');
};

//AJAX implementaion for Form
App.FormModule.prototype.AJAX = function(config) {
    let param = {};
    param.url = this.action;
    param.data = this.getData();
    for(let key in config) {
        param[key] = config[key];
    }
    App.AJAX(param);
};

App.FormModule.prototype.getData = function() {
    var data = {};
    for(let i = 0; i < this.inputs.length; i++) {
        console.log(this.inputs[i].dataset.key);
        if(!!this.inputs[i].dataset.key) {
            data[this.inputs[i].dataset.key] = this.inputs[i].value;
        }
    }
    return data;
};

export {App};
