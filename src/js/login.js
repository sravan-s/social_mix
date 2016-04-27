import {App} from './common';

var login = new App.FormModule("login-form");

login.submits[0].addEventListener('click', function(e) {
    e.preventDefault();
    if(login.form.checkValidity()) {
        let data = login.getData();
        data.type = "admin";
        console.log(data);
        login.AJAX({
            url: login.action,
            data: data,
            callback: function(res) {
                console.dir(res);
            }
        });
    }
});

export {login};
