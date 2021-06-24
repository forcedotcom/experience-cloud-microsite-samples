/**
 * Utility to handle redirect action
 *
 * @param {string} url Redirect url
 */
export function redirectPage(url) {
    window.open(url, '_self');
}

/**
 * Utility to verify form data
 *
 * @param {Array} inputs Lightning inputs from the form
 * @returns {Boolean} To show whether all inputs are valid
 */
export function isSubmitActionDataValid(inputs) {
    const invalids = inputs?.filter((element) => !element.validity.valid);

    if (invalids?.length > 0) {
        invalids.forEach((element) => element.reportValidity());
        return false;
    }
    return true;
}

/**
 * Utility to get form data
 *
 * @param {Array} inputs Lightning inputs from the form
 * @returns {Object} Object mapping Lead fields with values
 */
export function getFormData(inputs) {
    const fields = {};
    inputs.forEach((element) => {
        fields[element.name] =
            element.type === 'checkbox' ? element.checked : element.value;
    });
    return fields;
}
