# Button

Button Vue Template
The Button Vue template renders the button based on the Button class instance. It handles visibility, styling, click events, icons, and loading states.
Usage Examples with Crafter Class

The Button class extends AbstractItemElement and represents a customizable button in the Vue Template Crafter system.
Properties

- label: String representing the button text
- clickEvents: Array of functions to be executed on button click
- ignoreValidation: Boolean to bypass validation checks
- style: String for custom CSS styling
- isLoading: Boolean to show loading state
- icon: Icon object for button icon
- inputKeyEnterExecution: Boolean to enable execution on Enter key press in input fields

Methods

- setStyle(style: string): Sets the button style (e.g., "primary", "secondary")
- onClick(clickEvent: () => void): Adds a click event handler
- triggerClickEvents(): Executes all registered click events
- setIgnoreValidation(value: boolean): Sets whether to ignore validation
- setIsLoading(value: boolean): Sets the loading state of the button
- setIcon(iconClassOrSource: string, mode: "svg"|"class"): Adds an icon to the button
- setInputKeyEnterExecution(value: boolean): Enables execution on Enter key press in input fields


Here are some examples of how to use the Button class with the Crafter class:
```TypeScript
// Create a new Crafter instance
const crafter = new Crafter();

// Add a simple button
crafter.addButton("Click me")
    .onClick(() => {
    console.log("Button clicked!");
});

// Add a styled button with an icon
crafter.addButton("Save")
    .setStyle("primary")
    .setIcon("fa-solid fa-floppy-disk")
    .onClick(() => {
    console.log("Saving...");
});

// Add a button with loading state
const loadingButton = crafter.addButton("Submit")
    .setStyle("secondary")
    .onClick(async () => {
    loadingButton.setIsLoading(true);
    await someAsyncOperation();
    loadingButton.setIsLoading(false);
});

// Add a button that ignores validation
crafter.addButton("Skip")
    .setIgnoreValidation(true)
    .onClick(() => {
    console.log("Skipping validation...");
});

// Add a button with multiple click events
crafter.addButton("Multi-action")
    .onClick(() => console.log("Action 1"))
    .onClick(() => console.log("Action 2"))
    .onClick(() => console.log("Action 3"));

// Add a button that executes on Enter key press in input fields
crafter.addButton("Submit on Enter")
.setInputKeyEnterExecution(true)
.onClick(() => {
    console.log("Submitted via Enter key");
});
```

### Other components [here](./../Components.README.md)