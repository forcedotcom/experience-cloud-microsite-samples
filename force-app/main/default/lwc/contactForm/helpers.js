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
    return inputs.every((input) => input?.validity?.valid);
}

/**
 * Utility to get form data
 *
 * @param {Array} inputs Lightning inputs from the form
 * @returns {Object} Object mapping fields to values
 */
export function transformFormData(inputs) {
    const fields = {};
    inputs.forEach((element) => {
        fields[element.name] = element.value;
    });
    return fields;
}

/**
 * Utility to format form data for contact form submission
 *
 * @param {object} fieldsData This is an object representing form fields. Eg. {FirstName: John, LastName: Doe}
 * @returns {object} Data formatted correctly and ready for insertion to marketing cloud
 */
export function transformFieldsForContactFormSubmission(fieldsData) {
    const formFields = Object.keys(fieldsData ?? {}).map((fieldName) => {
        const fieldValue = normalizeValue(fieldsData[fieldName]);
        return {
            name: fieldName,
            value: fieldValue
        };
    });
    return {
        formFieldsList: {
            formFields
        }
    };
}

/**
 * Utility to normalize all field values to text (all contact form fields are currently Text or Email)
 *
 * @param {string|boolean} value The form field to normalize
 * @returns {string} The string representation of the field
 */
export function normalizeValue(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return String(value);
}

/**
 * Utility to check validity of contact form data
 *
 * @param {object} formInput The input for the contact Form
 * @returns {boolean} Is the form Input Data valid ?
 */
export function validateFormData(formInput) {
    const formFields = formInput?.formFieldsList?.formFields;
    return Array.isArray(formFields);
}
