(() => {
    /** The main Editor element to be tinkered with */
    var rootEditorElement;
    var finalValue = {
        small: {},
        medium: {},
        large: {},
    };
    var viewports = ['small', 'medium', 'large'];
    var configuration = {};

    /**
     * initializes the base markup before page is ready. This is not part of the API, and called explicitely at the end of this module.
     */
    function init(isRequired) {
        rootEditorElement = document.createElement('div');
        rootEditorElement.innerHTML = `
        <div class="slds-form inputs-wrapper" role="list"></div>
        <div class="slds-form">
            <div class="slds-grid">
                <div class="slds-col">
                    <button class="add-viewport slds-button slds-button_neutral slds-align_absolute-center" data-required="${isRequired}">${configuration.labels.addviewport}</button>
                </div>
                <div class="slds-col">
                    <button class="save-viewport slds-button slds-button_neutral slds-align_absolute-center" disabled>${configuration.labels.saveviewports}</button>
                </div>
            </div>
        </div>
        `;
        document.body.appendChild(rootEditorElement);
    }

    /**
     * Append a new row to the viewports list
     *
     * @param {string} viewport The pre-selected viewport
     * @param {number} value The value
     *
     */
    function appendInputRow(viewport, value) {
        value = value || {width:0, height:0};

        var viewportOptions = viewports.filter(function (viewportName) {
            return JSON.stringify(finalValue[viewportName]) === '{}' || viewport === viewportName;
        }).map(function (viewportName) {
            return `<option ${viewport === viewportName ? 'selected="selected"' : ''} value="${viewportName}">${viewportName}</option>`;
        }).join('');

        var row = document.createElement('div');
        row.innerHTML = `
        <div class="slds-grid viewport-row">
            <div class="slds-col slds-p-left_medium slds-p-right_medium slds-size_1-of-3">
                <div class="slds-form-element slds-form-element_horizontal slds-is-editing">
                    <label class="slds-form-element__label" for="viewport">${configuration.labels.viewport}</label>
                    <div class="slds-form-element__control">
                        <div class="slds-select_container">
                            <select class="slds-select select-viewport">
                                ${viewportOptions}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slds-col slds-p-left_medium slds-p-right_medium ">
                <div class="slds-form-element slds-form-element_horizontal slds-is-editing">
                    <label class="slds-form-element__label" for="small">${configuration.labels.width}</label>
                    <div class="slds-form-element__control">
                        <input type="number" required class="slds-input input-value input-value-width" min="0" value="${value.width}" />
                    </div>
                </div>
                <div class="slds-form-element slds-form-element_horizontal">
                    <label class="slds-form-element__label" for="small">${configuration.labels.height}</label>
                    <div class="slds-form-element__control">
                        <input type="number" required class="slds-input input-value input-value-height" min="0" value="${value.height}" />
                    </div>
                </div>
            </div>
            
            <div class="slds-col slds-p-top_large slds-size_1-of-4">
                <button class="slds-button slds-button_icon remove-viewport" title="Remove">
                    <svg base-icon--prefix="slds-button__icon" class="slds-button__icon slds-icon_x-small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" viewBox="0 0 24 24" id="remove"><path d="M14.6 11.9l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.3-.7-.3-1 0L12.6 10c-.1.2-.4.2-.6 0L6 3.9c-.3-.3-.7-.3-1 0l-1 .9c-.3.3-.3.7 0 1l6.1 6.1c.1.1.1.4 0 .6L4 18.6c-.3.3-.3.7 0 1l.9.9c.3.3.7.3 1 0l6.1-6c.2-.2.5-.2.6 0l6.1 6c.3.3.7.3 1 0l.9-.9c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z"></path>
                    </svg>
                    <span class="slds-assistive-text">Remove</span>
                </button>
            </div>
        </div>
        `;

        rootEditorElement.querySelector('.inputs-wrapper').appendChild(row);
        rootEditorElement.querySelector('.save-viewport').disabled = false;

        // Save value once changed
        row.querySelector('.select-viewport').addEventListener('change', event => {
            saveValues();
        });
        row.querySelector('.input-value').addEventListener('change', event => {
            saveValues();
        });

        // Add remove event listener
        row.querySelector('.remove-viewport').addEventListener('click', event => {
            event.target.closest('.viewport-row').remove();
            ensureDeviceLimits();
            saveValues();

            emit({
                type: 'sfcc:valid',
                payload: {
                    valid: true
                }
            });
        });

        if (!viewport || !value) {
            emit({
                type: 'sfcc:valid',
                payload: {
                    valid: false,
                    message: configuration.messages.newviewport
                }
            });
        }

        ensureDeviceLimits();
    }

    /**
     * Ensure that the component has at least one viewport selected. If not, then displays a message
     */
    function ensureDeviceLimits() {
        var element = rootEditorElement.querySelector('.add-viewport');
        element.disabled = false;
        var isRequired = element.getAttribute('data-required');

        if ("true" === isRequired && rootEditorElement.querySelectorAll('.viewport-row').length === 0) {
            emit({
                type: 'sfcc:valid',
                payload: {
                    valid: false,
                    message: configuration.messages.atleastoneviewport
                }
            });
        } else if (rootEditorElement.querySelectorAll('.viewport-row').length === 3) {
            rootEditorElement.querySelector('.add-viewport').disabled = true;
        }
    }

    /**
     * Initialize already selected viewport when the component is loaded
     */
    function initializeValues(selectedValue) {
        if (!selectedValue) {
            return;
        }
        selectedValue = JSON.parse(selectedValue);
        viewports.forEach(function (view) {
            appendInputRow(view, selectedValue[view]);
        })
    }

    /**
     * Save viewport and values into the "finalValues" object. This object is then used to save the values in the DB
     * when clicking on the "save viewports" button
     */
    function saveValues() {
        // Reset viewport values
        Object.keys(finalValue).forEach(function (key) {
            finalValue[key] = {};
        });

        // Get values from displayed viewports
        [].forEach.call(rootEditorElement.querySelectorAll('.viewport-row'), function (row) {
            var viewport = row.querySelector('.select-viewport').value;
            var width = parseInt(row.querySelector('.input-value-width').value,10);
            var height = parseInt(row.querySelector('.input-value-height').value,10);

            if (!viewport) {
                return;
            }
            if (width) {
                finalValue[viewport]['width'] = width;
            }
            if (height) {
                finalValue[viewport]['height'] = height;
            }
        });
    }

    /** the page designer signals readiness to show this editor and provides an optionally pre selected value */
    listen('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;
        configuration = config;
        init(isRequired);
        initializeValues(selectedValue);
        ensureDeviceLimits();

        // Change listener will inform page designer about currently selected value
        rootEditorElement.querySelector('.add-viewport').addEventListener('click', event => {
            appendInputRow();
        });

        // Change listener will inform page designer about currently selected value
        rootEditorElement.querySelector('.save-viewport').addEventListener('click', event => {
            emit({
                type: 'sfcc:interacted'
            });

            saveValues();

            emit({
                type: 'sfcc:valid',
                payload: {
                    valid: true
                }
            });

            emit({
                type: 'sfcc:value',
                payload: {
                    value: JSON.stringify(finalValue)
                }
            });
        });
    });

    // When a value was selected
    listen('sfcc:value', value => { });
    // When the editor must require the user to select something
    listen('sfcc:required', value => { });
    // When the editor is asked to disable its controls
    listen('sfcc:disabled', value => {
        if (rootEditorElement) {
            rootEditorElement.querySelector('.slds-input').disabled = true;
            rootEditorElement.querySelector('.slds-select').disabled = true;
            rootEditorElement.querySelector('.slds-button').disabled = true;
        }
    });
})();