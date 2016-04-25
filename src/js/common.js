class FormModule {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this._inputs = this.form.querySelectorAll('input');
        this._submit = this.form.querySelectorAll('[type="submit"]');
    }
}

export {FormModule};
