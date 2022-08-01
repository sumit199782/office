(() => {
    /** The main Editor element to be tinkered with */
    let rootEditorElement;
    let input;
    let dependentInput;

    const errorFlags = [
        'badInput',
        'customError',
        'patternMismatch',
        'rangeOverflow',
        'rangeUnderflow',
        'stepMismatch',
        'tooLong',
        'tooShort',
        'typeMismatch',
        'valueMissing',
    ];

    /**
     * Initializes the base markup before page is ready.
     * This is not part of the API, and called explicitely at the end of this module.
     */
    function init() {
        rootEditorElement = document.createElement('div');
        rootEditorElement.innerHTML = `
      <div class='slds-form-element'>
        <div class='slds-form-element__control'>
          <input type="text">
        </div>
      </div>
      `;
        document.body.appendChild(rootEditorElement);
    }


    /** the page designer signals readiness to show this editor and provides an optionally pre selected value */
    listen('sfcc:ready', async ({
        value, config, isDisabled, isRequired,
    }) => {
        /**
         * On change handler
         * @param {Event} event change event
         */
        function onChange(event) {
            emit({
                type: 'sfcc:interacted',
            });

            const { validity } = event.target;
            let { target: { value: val } } = event;
            const validationData = {
                valid: validity.valid,
            };
            if (!validity.valid) {
                errorFlags.some((errorFlag) => {
                    if (validity[errorFlag]) {
                        validationData.message = config.errors[errorFlag] || errorFlag;
                    }
                    return validity[errorFlag];
                });
            }

            emit({
                type: 'sfcc:valid',
                payload: validationData,
            });

            if (validity.valid) {
                emit({
                    type: 'sfcc:value',
                    payload: { value: val || null },
                });
            }
        }

        const data = value || { value: null };
        input = rootEditorElement.querySelector('input');

        if (config.type === 'color') {
            input.pattern = '#[\\dA-Fa-f]{6}';
            dependentInput = document.createElement('input');
            dependentInput.type = 'color';
            input.parentNode.appendChild(dependentInput);
            dependentInput.value = data.value;

            dependentInput.addEventListener('change', (event) => {
                const { target: { value: val } } = event;
                input.value = val;
                onChange(event);
            });
        } else {
            input.type = config.type || 'text';
        }

        if (config.attributes) {
            Object.keys(config.attributes).forEach((attr) => {
                input.setAttribute(attr, config.attributes[attr]);
            });
        }

        input.value = data.value;
        input.disabled = isDisabled;
        input.required = isRequired;

        input.addEventListener('change', (event) => {
            if (dependentInput) {
                const { target: { value: val } } = event;
                dependentInput.value = val;
            }
            onChange(event);
        });
    });

    // When the editor is asked to disable its controls
    listen('sfcc:disabled', (value) => {
        if (input) {
            input.disabled = value;
        }
    });

    init();
})();
