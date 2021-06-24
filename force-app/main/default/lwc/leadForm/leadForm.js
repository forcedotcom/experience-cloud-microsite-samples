import { api, LightningElement } from 'lwc';

//Utility functions
import {
    redirectPage,
    isSubmitActionDataValid,
    getFormData
} from './helpers.js';

/**
 * Importing Lead object and needed fields
 *
 * Import Objects and Fields documentation : https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.apex_schema
 */
import LEAD_OBJECT from '@salesforce/schema/Lead';
import SOURCE_FIELD from '@salesforce/schema/Lead.LeadSource';
import { createRecord } from 'lightning/uiRecordApi';
export default class LeadForm extends LightningElement {
    /**
     * Flag to hide and show form
     */
    isSubmitted;

    /**
     * Flag to enable and disable button
     */
    isSubmitButtonDisabled;

    /**
     * Flag for hidden field
     */
    isHidden;

    /**
     * Flag to show error (if any)
     */
    hasError;

    /**
     * Button text api property
     *
     * @type {string}
     */

    @api
    buttonText = 'Submit';

    /**
     * Submit action type property
     *
     * @type {string}
     */
    @api
    submitActionType = 'Show inline message';

    /**
     * Submit action success message property
     *
     * @type {string}
     */
    @api
    submitActionSuccessMessage = 'Thank you!';

    /**
     * Submit action error message property
     *
     * @type {string}
     */
    @api
    submitActionErrorMessage = 'Oh no, something went wrong!';

    /**
     * Redirect url property
     *
     * @type {string}
     */
    @api
    redirectUrl = '';

    constructor() {
        super();

        this.isHidden = true;
    }

    /**
     * Handles successful response and takes appropriate action
     */
    handleSuccess() {
        if (this.submitActionType === 'Show inline message') {
            this.isSubmitted = true;
        } else {
            redirectPage(this.redirectUrl);
        }
    }

    /**
     * Handles unsuccessful response and takes appropriate action
     */
    handleError() {
        this.hasError = true;
        this.isSubmitButtonDisabled = false;
    }

    /**
     *  Handles form submission to insert lead record
     *
     * @private
     */
    handleSubmit(event) {
        //Prevent default action from being taken
        event.preventDefault();
        event.stopPropagation();

        //Grab all lightning inputs from form
        const inputs = Array.from(
            this.template.querySelectorAll('lightning-input')
        );

        //Check if form data is valid
        if (isSubmitActionDataValid(inputs)) {
            //Set all field and values
            const fields = getFormData(inputs);

            // Setting default value for a Lead field not presented on the UI
            fields[SOURCE_FIELD.fieldApiName] = 'Web';

            const recordInput = {
                apiName: LEAD_OBJECT.objectApiName,
                fields
            };

            createRecord(recordInput)
                .then(() => {
                    this.handleSuccess();
                })
                .catch((error) => {
                    if (error.status === 404) {
                        /**
                         * There's an issue with the uiRecord API where the success behavior does
                         * not apply to guest users even though the lead creation finishes successfully.
                         */
                        this.handleSuccess();
                    } else {
                        //Response is invalid
                        this.handleError();
                    }
                });
        }
    }
}
