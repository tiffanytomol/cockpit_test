var currentPage = require('../pages/current.page');

/**
 * Check if the given elements contains text
 * @param  {String}   type          Type of element (inputfield or element)
 * @param  {String}   element       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  the given text or not
 * @param  {String}   expectedText  The text to check against
 * @param  {Function} done          Function to execute when finished
 */
module.exports = (type, element, falseCase, expectedText, done) => {
    /**
     * The command to perform on the browser object
     * @type {String}
     */

    var page_filename = currentPage.getPageFilename(); // returns the filename of the page
    var pagename = require('../pages/'+page_filename+''); // define the page required for the current page

    var new_expectedText = pagename.getValue(expectedText); // get actual value
    var new_element = pagename.getElement(element); // get actual selector

    const command = (type !== 'inputfield') ? 'getText' : 'getValue';

    /**
     * False case
     * @type {Boolean}
     */
    let boolFalseCase;

    /**
     * The expected text
     * @type {String}
     */
    let stringExpectedText = new_expectedText;

    /**
     * Callback to trigger when done
     * @type {Function}
     */
    let doneCallback = done;

    /**
     * The text of the element
     * @type {String}
     */
    const text = browser[command](new_element);

    if (typeof new_expectedText === 'function') {
        doneCallback = new_expectedText;
        stringExpectedText = falseCase;
        boolFalseCase = false;
    } else {
        boolFalseCase = (falseCase === ' not');
    }

    if (boolFalseCase) {
        expect(text).to.not.equal(stringExpectedText);
    } else {
        expect(text).to.equal(stringExpectedText);
    }

    doneCallback();
};
