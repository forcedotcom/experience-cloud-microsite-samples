import * as helper from '../helpers.js';
import {
    VALID_LEAD_FORM_INPUTS,
    INVALID_LEAD_FORM_INPUTS
} from './testUtils.js';
describe('Lead Form Helper Functions', () => {
    it('should open a link', async () => {
        const url = 'https://www.example.com';
        //Creating jest function to mock window.open
        window.open = jest.fn();

        //Call helper function
        helper.redirectPage(url);

        //Check if mock function is called
        expect(window.open).toBeCalled();
        //Check mock function parameters
        expect(window.open.mock.calls[0][0]).toEqual(url);
    });

    it('should reject the form data', async () => {
        //Call helper function
        const result = helper.isSubmitActionDataValid(INVALID_LEAD_FORM_INPUTS);
        //Check function result
        expect(result).toEqual(false);
    });

    it('should accept the form data', async () => {
        //Call helper function
        const result = helper.isSubmitActionDataValid(VALID_LEAD_FORM_INPUTS);
        //Check function result
        expect(result).toEqual(true);
    });

    it('should return form data', async () => {
        const inputs = [
            { name: 'FirstName', value: 'John' },
            { name: 'LastName', value: 'Smith' },
            { name: 'Email', value: 'test@test.com' },
            { name: 'Phone', value: '1111111111' },
            { name: 'Company', value: 'Test Company' },
            {
                type: 'checkbox',
                name: 'Subscribe',
                checked: true
            }
        ];

        const resultObj = {
            FirstName: 'John',
            LastName: 'Smith',
            Email: 'test@test.com',
            Phone: '1111111111',
            Company: 'Test Company',
            Subscribe: true
        };

        //Call helper function
        const result = helper.getFormData(inputs);

        //Check if helper returns correctly constructed object
        expect(result).toEqual(resultObj);
    });
});
