export const DEFAULT_CONTACT_FORM_PROPERTIES = {
    formId: 'some-form-id',
    buttonText: 'Submit',
    buttonSize: 'small',
    submitActionType: 'Show inline message',
    redirectUrl: 'https://www.example.com',
    submitActionSuccessMessage: 'Thank you!',
    submitActionErrorMessage: 'Oh no, something went wrong!'
};

export const VALID_CONTACT_FORM_INPUTS = [
    {
        validity: {
            valid: true
        }
    },
    {
        validity: {
            valid: true
        }
    },
    {
        validity: {
            valid: true
        }
    },
    {
        validity: {
            valid: true
        }
    }
];

export const INVALID_CONTACT_FORM_INPUTS = [
    {
        validity: {
            valid: true
        }
    },
    {
        validity: {
            valid: false
        }
    },
    {
        validity: {
            valid: true
        }
    },
    {
        validity: {
            valid: true
        }
    }
];

//Mock event data
export const MOCK_EVENT = {
    detail: {
        data: {
            FirstName: 'John',
            LastName: 'Doe',
            Phone: '1234567890',
            Email: 'john@example.com',
            Company: 'Acme, Inc.'
        }
    }
};

//Mock contact form submission data
export const CONTACT_FORM_SUBMISSION_INPUT = {
    formFieldsList: {
        formFields: [
            { name: 'FirstName', value: 'John' },
            { name: 'LastName', value: 'Doe' },
            { name: 'Phone', value: '1234567890' },
            { name: 'Email', value: 'john@example.com' },
            { name: 'Company', value: 'Acme, Inc.' }
        ]
    }
};
