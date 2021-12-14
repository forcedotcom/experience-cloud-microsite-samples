import { api, LightningElement } from 'lwc';

//Helper functions
import {
    redirectPage,
    isSubmitActionDataValid,
    transformFormData,
    transformFieldsForContactFormSubmission,
    validateFormData
} from './helpers.js';

//Submit form data wire adapter
import { submitForm } from 'lightning/experienceMarketingIntegrationApi';

//Site id
import siteId from '@salesforce/site/Id';

export default class ContactForm extends LightningElement {
    /**
     * Flag to hide and show form
     */
    isFormVisible = true;

    /**
     * Flag to enable and disable button
     */
    isSubmitButtonDisabled = false;

    /**
     * Flag to show error (if any)
     */
    hasError = false;

    /**
     * Button text api property
     *
     * @type {string}
     */

    @api
    buttonText = 'Submit';

    /**
     * Button size api property
     *
     * @type {string}
     */

    @api
    buttonSize = 'small';

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

    /**
     * Form id name
     *
     * This will be generated via data extenstion creation
     */
    @api
    formId = '';

    /**
     * Gets the CSS classes for the button based on size selected
     *
     * @type {string}
     * @readonly
     * @private
     */
    get computedClass() {
        return `slds-button slds-button_brand slds-var-m-top_small slds-text-heading_${this.buttonSize} slds-p-around_${this.buttonSize}`;
    }

    /**
     * Handles successful response and takes appropriate action
     */
    handleSuccess() {
        if (this.submitActionType === 'Show inline message') {
            this.isFormVisible = false;
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
     *  Handles form submission to insert contact record into marketing cloud
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
            const fields = transformFormData(inputs);

            //Format contact form data
            const formSubmissionInput =
                transformFieldsForContactFormSubmission(fields);

            //Form Id
            const formId = this.formId;

            //Verify params are valid
            if (siteId && formId && validateFormData(formSubmissionInput)) {
                const recordInput = { siteId, formId, formSubmissionInput };

                submitForm(recordInput)
                    .then(() => {
                        this.handleSuccess();
                    })
                    .catch(() => {
                        //Response is invalid
                        this.handleError();
                    });
            }
        }
    }
}
