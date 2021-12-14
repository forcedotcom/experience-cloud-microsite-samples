import { createElement } from 'lwc';
import ContactForm from 'c/contactForm';
import { submitForm } from 'lightning/experienceMarketingIntegrationApi';
import * as helper from '../helpers.js';
import { DEFAULT_CONTACT_FORM_PROPERTIES } from './testUtils.js';

//Mocking @salesforce/site/Id
jest.mock('@salesforce/site/Id', () => '0DMxx0000004NVt', {
    virtual: true
});

//Mocking lightning/experienceMarketingIntegrationApi
jest.mock(
    'lightning/experienceMarketingIntegrationApi',
    () => {
        return {
            submitForm: jest.fn()
        };
    },
    { virtual: true }
);

function createComponent(props = {}) {
    const element = createElement('c-contact-form', {
        is: ContactForm
    });
    Object.assign(element, props);
    document.body.appendChild(element);
    return element;
}

/**
 * Helper sets required fields with default values
 *
 * @param {object} element - HTML DOM object reference
 */
function setDefaultValues(element) {
    //Set lastname default value
    const lastnameInput = element.shadowRoot.querySelector(
        'lightning-input[data-lastname]'
    );
    lastnameInput.value = 'Smith';
}

describe('Contact Form Component Submit Tests', () => {
    it('is accessible with default properties', async () => {
        //Create contact form component
        const element = createComponent(DEFAULT_CONTACT_FORM_PROPERTIES);
        await expect(element).toBeAccessible();
    });

    it('is accessible with custom properties', async () => {
        const CUSTOM_CONTACT_FORM_PROPERTIES = {
            formId: 'form-id',
            buttonText: 'Submit Now',
            buttonSize: 'medium',
            submitActionType: 'Show inline message',
            redirectUrl: 'https://www.example.com',
            submitActionSuccessMessage: 'Thank you!',
            submitActionErrorMessage: 'There was a problem!'
        };
        //Create contact form component
        const element = createComponent(CUSTOM_CONTACT_FORM_PROPERTIES);
        await expect(element).toBeAccessible();
    });

    it('should be accessible in success state', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_CONTACT_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mock isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Mock submitForm
        submitForm.mockImplementation(() => {
            return Promise.resolve();
        });

        //Simulate click on submit button
        const button = element.shadowRoot.querySelector('button');

        button?.click();

        //Need to resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for then on the API callout logic
        await Promise.resolve();
        //Need to wait for flags to be changed in order to update UI
        await Promise.resolve();

        await expect(element).toBeAccessible();
    });

    it('should be accessible in error state', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_CONTACT_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mock isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Mock submitForm
        submitForm.mockImplementation(() => {
            return Promise.resolve(false);
        });

        //Simulate click on submit button
        const button = element.shadowRoot.querySelector('button');

        button?.click();

        //Need to resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for then on the API callout logic
        await Promise.resolve();
        //Need to wait for flags to be changed in order to update UI
        await Promise.resolve();

        await expect(element).toBeAccessible();
    });
});
