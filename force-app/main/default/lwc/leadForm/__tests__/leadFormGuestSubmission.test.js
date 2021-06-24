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

describe('Lead Form Component Guest User Submit Tests', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    it('should create a lead successfully with a 404 error when logged in as a guest user ', async () => {
        //Create component and set required fields with default values
        const element = createComponent(DEFAULT_LEAD_FORM_PROPERTIES);
        setDefaultValues(element);

        //Mocking isSubmitActionDataValid
        const spy = jest.spyOn(helper, 'isSubmitActionDataValid');
        spy.mockImplementation(() => {
            return true;
        });

        //Mock createRecord throwing an error
        const err = new Error('Error!');
        err.status = 404;
        createRecord.mockRejectedValue(err);

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
        //Need to wait for lwc re-rendering
        await Promise.resolve();

        expect(element).toMatchSnapshot();

        //Check if success message is present
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toEqual(
            DEFAULT_LEAD_FORM_PROPERTIES.submitActionSuccessMessage
        );
    });
});
