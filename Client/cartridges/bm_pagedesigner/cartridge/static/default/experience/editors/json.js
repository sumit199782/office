(() => {
    /** The main Editor element to be tinkered with */
    let rootEditorElement;

    /**
     * initializes the base markup before page is ready. This is not part of the API, and called explicitely at the end of this module.
     */
    function init() {
        rootEditorElement = document.createElement('div');
        rootEditorElement.innerHTML = `
      <div class='slds-form-element'>
        <div class='slds-form-element__control'>
          <textarea class="slds-textarea json-textarea" rows='10'></textarea>
        </div>
      </div>
      `;
        document.body.appendChild(rootEditorElement);
    }

    /** the page designer signals readiness to show this editor and provides an optionally pre selected value */
    listen('sfcc:ready', async ({
        value, config, isDisabled, isRequired, dataLocale, displayLocale,
    }) => {
        const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;

        const textArea = rootEditorElement.querySelector('.json-textarea');
        textArea.value = selectedValue || '';
        // Change listener will inform page designer about currently selected value
        textArea.addEventListener('change', (event) => {
            emit({
                type: 'sfcc:interacted',
            });
            const val = event.target.value;

            try {
                const parsed = val && JSON.parse(val);

                // Value can be parsed, save it
                emit({
                    type: 'sfcc:valid',
                    payload: {
                        valid: true,
                    },
                });
                emit({
                    type: 'sfcc:value',
                    payload: { value: val || null },
                });
            } catch (e) {
                // Value failed to be parsed, display an error
                emit({
                    type: 'sfcc:valid',
                    payload: {
                        valid: false,
                        message: config.messages.badformatted,
                    },
                });
            }
        });
    });

    // When a value was selected
    listen('sfcc:value', (value) => { });
    // When the editor must require the user to select something
    listen('sfcc:required', (value) => { });
    // When the editor is asked to disable its controls
    listen('sfcc:disabled', (value) => {
        if (rootEditorElement) {
            rootEditorElement.querySelector('.json-textarea').disabled = value;
        }
    });

    init();
})();
