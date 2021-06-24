import { createElement } from 'lwc';
import LeadForm from 'c/leadForm';
import { createRecord } from 'lightning/uiRecordApi';
import * as helper from '../helpers';
import { DEFAULT_LEAD_FORM_PROPERTIES } from './testUtils';

/**
 * @param {object} props object with all properties for lead form component
 * @returns {object} - HTML DOM object
 */
function createComponent(props = {}) {
    const element = createElement('c-lead-form', {
        is: LeadForm
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
    //Set company default value
    const companyInput = element.shadowRoot.querySelector(
        'lightning-input[data-company]'
    );
    companyInput.value = 'Salesforce';

    //Set lastname default value
    const lastnameInput = element.shadowRoot.querySelector(
        'lightning-input[data-lastname]'
    );
    lastnameInput.value = 'Smith';
}

describe('Lead Form Component Submit Tests', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });
    it('should show success message on inline action submission', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mocking isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Initiate submit logic
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        //Resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for then on the API callout logic
        await Promise.resolve();
        //Need to wait for flags to be changed in order to update UI
        await Promise.resolve();

        //Check if success message is present
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toEqual(
            DEFAULT_LEAD_FORM_PROPERTIES.submitActionSuccessMessage
        );
    });

    it('should open new window for redirect action', async () => {
        //Set property values
        DEFAULT_LEAD_FORM_PROPERTIES.submitActionType =
            'Redirect to existing page';

        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mocking isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Creating jest function to mock window.open
        window.open = jest.fn().mockImplementation(() => true);

        //Initiate submit logic
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        //Need to resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for window logic to complete
        await Promise.resolve();

        //Check if mock function has been clicked
        expect(window.open).toHaveBeenCalledTimes(1);
        //Check mock function parameters
        expect(window.open.mock.calls[0][0]).toEqual(
            DEFAULT_LEAD_FORM_PROPERTIES.redirectUrl
        );
    });

    it('should show error message createRecord api call throws an error', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mocking isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });
        //Mock createRecord throwing an error
        createRecord.mockRejectedValue(new Error('Error!'));

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
        //Need to wait longer to apply changes
        await Promise.resolve();

        //Check if error message is present
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toEqual(
            DEFAULT_LEAD_FORM_PROPERTIES.submitActionErrorMessage
        );
    });

    it('should not fire submit event when fields have invalid inputs', async () => {
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        expect(element).toMatchSnapshot();

        const submitHandler = jest.fn();
        element.addEventListener('submit', submitHandler);

        //Initiate submit logic
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        await Promise.resolve();

        expect(submitHandler).not.toBeCalled();
    });

    it('is accessible with default properties', async () => {
        //Create lead form component
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        await expect(element).toBeAccessible();
    });

    it('is accessible with custom properties', async () => {
        //Create lead form component
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        await expect(element).toBeAccessible();
    });

    it('is accessible in success state', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mocking isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });
        //Initiate submit logic
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new CustomEvent('submit'));

        //Resolve promise for API call
        await Promise.resolve();
        //Need to wait for then on API call
        await Promise.resolve();
        //Need to wait for then on the API callout logic
        await Promise.resolve();
        //Need to wait for flags to be changed in order to update UI
        await Promise.resolve();

        await expect(element).toBeAccessible();
    });

    it('is accessible in error state', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mocking isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Mock createRecord implementation with bad response
        createRecord.mockImplementation(() => {
            return Promise.resolve(false);
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
        //Need to wait longer to apply changes
        await Promise.resolve();

        await expect(element).toBeAccessible();
    });
});
