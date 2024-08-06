/**
 * @typedef {object} CssDefaultStyle
 */
export interface CssDefaultStyle {
    /**
     * Class for all input tags
     */
    input: string
    /**
     * Class for input wrapper incl. action Buttons
     */
    inputWrapper: string
    /**
     * Class for input wrapper only input and label
     */
    inputFloatingWrapper: string
    /**
     * Class for all labels
     */
    label: string
    /**
     * Class for all buttons
     */
    textbox: string
    /**
     * Class for textbox wrapper incl. action Buttons
     */
    textboxWrapper: string
    /**
     * Class for all headers
     */
    header: string
    /**
     * Class for all buttons
     */
    button: string
    /**
     * style Prefix for button e.g. for Bootstrap 5  => "btn-" | Allows you to work easier with Buttons styles
     */
    buttonStylePrefix: string
    /**
     * The style which will automatically include e.g. "primary" or "secondary" or "ghost-primary"
     */
    buttonDefaultStyle: string
    /**
     * Define border for inputs which has error or missing value
     */
    alertBorder: string
    /**
     *  Define the massaging box for inputs wrapper which has error or missing value
     */
    alertMessage: string
    /**
     * Main Class for complete crafter template
     */
    crafterWrapper: string

    /**
     * Main Class for modal items
     */
    modalBackground: string

    /**
     * Main Class for modal items
     */
    modal: string

    /**
     * Main Class for loading spinner. e.g. "fa-solid fa-spinner fa-spin"
     */
    loadingSpinner: string

    /**
     * Main Class for checkbox wrapper
     */
    checkboxWrapper: string

    /**
     * Main Class for checkbox item
     */
    checkbox: string
}