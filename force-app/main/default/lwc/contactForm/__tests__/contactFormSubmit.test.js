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
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.resetAllMocks();
    });
    it('should show success message when the submit action type is show inline message ', async () => {
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

        //Initiate the submit
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        //Need to resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for then on the API callout logic
        await Promise.resolve();
        //Need to wait for flags to be changed in order to update UI
        await Promise.resolve();

        //Check if submit form mock has been called
        expect(submitForm).toHaveBeenCalled();
        //Validate message
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toEqual('Thank you!');
    });

    it('should open new window for redirect action', async () => {
        DEFAULT_CONTACT_FORM_PROPERTIES.submitActionType =
            'Redirect to existing page';

        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_CONTACT_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mock isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });
        //Creating jest function to mock window.open
        window.open = jest.fn().mockImplementation(() => true);

        //Mock submitForm
        submitForm.mockImplementation(() => {
            return Promise.resolve();
        });

        //Initiate the submit
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        //Need to resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for window logic to complete
        await Promise.resolve();

        //Check if submit form mock has been called
        expect(submitForm).toHaveBeenCalled();
        //Check if window.open mock has been called
        expect(window.open).toHaveBeenCalledTimes(1);
        //Check mock function parameters
        expect(window.open.mock.calls[0][0]).toEqual(
            DEFAULT_CONTACT_FORM_PROPERTIES.redirectUrl
        );
    });

    it('should show an error when the form submission API returns an error', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_CONTACT_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mock isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Mock submitForm throwing an error
        submitForm.mockRejectedValue(new Error('Error!'));

        //Initiate the submit
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        //Need to resolve promise for mock implementation
        await Promise.resolve();
        //Need to resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for then on the API callout logic
        await Promise.resolve();
        //Need to wait for flags to be changed in order to update UI
        await Promise.resolve();

        //Check if submit form mock has been called
        expect(submitForm).toHaveBeenCalled();
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toEqual('Oh no, something went wrong!');
    });
});
