export const DEFAULT_LEAD_FORM_PROPERTIES = {
    buttonText: 'Submit',
    buttonSize: 'small',
    redirectUrl: 'https://www.example.com',
    submitActionType: 'Show inline message',
    submitActionSuccessMessage: 'Thank you!',
    submitActionErrorMessage: 'Oh no, something went wrong!'
};

export const VALID_LEAD_FORM_INPUTS = [
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    },
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    },
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    },
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    }
];

export const INVALID_LEAD_FORM_INPUTS = [
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    },
    {
        validity: {
            valid: false
        },
        reportValidity: jest.fn()
    },
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    },
    {
        validity: {
            valid: true
        },
        reportValidity: jest.fn()
    }
];
