//import * as helper from '../helpers.js';
import {
    redirectPage,
    isSubmitActionDataValid,
    transformFormData,
    transformFieldsForContactFormSubmission,
    normalizeValue,
    validateFormData
} from '../helpers.js';
import {
    VALID_CONTACT_FORM_INPUTS,
    INVALID_CONTACT_FORM_INPUTS,
    MOCK_EVENT,
    CONTACT_FORM_SUBMISSION_INPUT
} from './testUtils.js';

describe('Contact Form Helper Functions', () => {
    it('should open a link with window.open method', async () => {
        const url = 'https://www.example.com';

        //Creating jest function to mock window.open
        window.open = jest.fn();

        redirectPage(url);

        //Check if window.open mock is called
        expect(window.open).toBeCalledTimes(1);
        //Check window.open mock parameters
        expect(window.open.mock.calls[0][0]).toEqual(url);
    });

    it('should return false when the form data is invalid', async () => {
        const result = isSubmitActionDataValid(INVALID_CONTACT_FORM_INPUTS);
        //Check function result
        expect(result).toBeFalsy();
    });

    it('should return true when the form data is valid', async () => {
        const result = isSubmitActionDataValid(VALID_CONTACT_FORM_INPUTS);
        //Check function result
        expect(result).toBeTruthy();
    });

    it('should transform form data to an object mapping field name to the value ', async () => {
        const inputs = [
            { name: 'FirstName', value: 'John' },
            { name: 'LastName', value: 'Smith' },
            { name: 'Email', value: 'test@test.com' },
            { name: 'Phone', value: '1111111111' },
            { name: 'Company', value: 'Test Company' }
        ];

        const resultObj = {
            FirstName: 'John',
            LastName: 'Smith',
            Email: 'test@test.com',
            Phone: '1111111111',
            Company: 'Test Company'
        };

        const result = transformFormData(inputs);

        //Check if helper returns correctly constructed object
        expect(result).toStrictEqual(resultObj);
    });

    [null, undefined].forEach((value) => {
        it('should return an empty string when the param is invalid', async () => {
            const result = normalizeValue(value);
            //Check if result is correct
            expect(result).toBe('');
        });
    });

    [null, undefined, {}].forEach((event) => {
        it(`should return empty form fields array when ${event} was provided as input `, () => {
            const result = transformFieldsForContactFormSubmission(event);
            //Check if result is correct
            expect(result).toMatchObject({
                formFieldsList: {
                    formFields: []
                }
            });
        });
    });

    it('should transform the data when an event is provided', () => {
        const result = transformFieldsForContactFormSubmission(
            MOCK_EVENT.detail.data
        );
        //Check if result is correct
        expect(result).toMatchObject(CONTACT_FORM_SUBMISSION_INPUT);
    });

    it('should return true when a valid form submission object is provided', () => {
        const result = validateFormData(CONTACT_FORM_SUBMISSION_INPUT);
        //Check if result is correct
        expect(result).toBeTruthy();
    });

    [null, {}, undefined].forEach((invalidInput) => {
        it(`should return false when an  invalid submission object (${invalidInput})  is provided`, () => {
            const result = validateFormData(invalidInput);
            //Check if result is correct
            expect(result).toBeFalsy();
        });
    });
});
