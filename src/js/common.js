'use strict';

let App = {};

//Config: Ajax config
App.AJAX = function(config) {
    //Initializations
    let type = config.type || 'POST';
    let url = config.url || '/';
    let baseUrl = config.baseUrl || window.location.origin;
    let data = JSON.stringify(config.data) || "";
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
    request.send(data);
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
App.FormModule.prototype.AJAX = function() {
    let _this = this;
    App.AJAX({
        url: _this.action,
        data: _this.getData()
    });
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
