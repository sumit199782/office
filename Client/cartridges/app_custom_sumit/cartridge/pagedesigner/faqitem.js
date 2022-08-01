'use strict';

// Initialize constants Template and HashMap


/**
 * @function renderFAQItem
 * @description Helper function used to render the faq-item component
 *
 * @param {Object} componentContent Represents the context object containing configurable component data used by the componentRenderer
 * @returns {String} Returns the mark-up string representing the specified component
 */
function renderFAQItem(componentContent) {

    // Initialize the model
    let model = new HashMap();

    // Add the faq-item elements to the component's model
    model.text_faq_title = componentContent.content.text_faq_title;
    model.text_faq_question = componentContent.content.text_faq_question;
    model.text_faq_answer = componentContent.content.text_faq_answer;

    // Add the properties used to manage the display of the faq item
    model.disable_faq_title = componentContent.content.disable_faq_title;
    model.disable_faq_item = componentContent.content.disable_faq_item;

    // Invoke the template renderer for the copy title component
    return new Template('experience/components/commerce_assets/faqitem').render(model).text;

}

// Export the function to render the copy paragraph component
module.exports.render = renderFAQItem;