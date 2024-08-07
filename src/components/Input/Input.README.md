# Input

The Input class extends AbstractItemElement and represents a customizable input field in the Vue Template Crafter system.
### Properties


- label: Label object for the input
- value: Current value of the input (string or number)
- isValid: Boolean indicating if the input is valid
- preValue: Previous value of the input
- errorMessage: Error message for invalid input
- isRequired: Boolean indicating if the input is required
- requiredErrorMessage: Error message for required fields
- actionButtons: Array of Button objects associated with the input
- validationFunctions: Array of custom validation functions
- validationErrorMessages: Array of error messages for custom validations
- usedAttributeKey: Key used for mapping to an object property
- inputType: Type of the input (e.g., "text", "email", "number")

### Methods

- map(attributeKey): Maps the input to an object property
- setInputType(type): Sets the input type and adds default validations
- setRequired(value, errorMessage): Sets the input as required
- addValidation(validationFunction, errorMessage): Adds a custom validation
- validate(): Validates the input
- setValue(value): Sets the value of the input 
- addButton(label): Adds an action button to the input
- getCssClasses(): Returns CSS classes as a string

### Examples

Here are examples using the Input class with the Crafter class, including type specification:

```TypeScript
interface Car {
    brand: string;
    model: string;
    year: number;
    electric: boolean;
}

const carCrafter = new Crafter<Car>();

// Use addInputMapped instead of addInput for better object integration
carCrafter.addInputMapped("Brand", "brand")
    .setRequired(true, "Please enter the car brand");

carCrafter.addInputMapped("Model", "model")
    .setRequired()
    .addValidation(
        (input) => input.value.length >= 2,
        "Model name must be at least 2 characters long"
    );

carCrafter.addInputMapped("Year", "year")
    .setInputType("number")
    .setRequired()
    .addValidation(
        (input) => parseInt(input.value as string) >= 1900 && parseInt(input.value as string) <= new Date().getFullYear(),
        "Please enter a valid year between 1900 and current year"
    );

carCrafter.addCheckboxMapped("Electric Car", "electric");

carCrafter.addButton("Submit")
    .onClick(() => {
        // Validation check is not necessary, because it will handled by crafter before
        // If you wish the clickEvent without validation you can make the button as ignoreValidation (In future the strategy will changed)
        const carData = carCrafter.handleObject();
        console.log("Car data:", carData);
    });

```

### Advantages of Type Specification
Using type specification with new Crafter< Car>() provides several benefits:

1. Type Safety: The TypeScript compiler will catch type-related errors at compile-time, reducing runtime errors.
2. Intellisense Support: IDEs can provide better autocomplete suggestions and type information for properties and methods.
3. Refactoring Support: When you change the Car interface, the TypeScript compiler will highlight areas in your code that need to be updated.
4. Documentation: It serves as self-documenting code, making it clear what kind of data the Crafter instance is working with.
5. Consistency: It ensures that all mapped properties align with the Car interface, preventing accidental mismatches.
6. Improved Maintainability: As your project grows, having typed Crafter instances makes it easier to understand and maintain the code.

By using new Crafter< Car>(), you're creating a strongly-typed instance of the Crafter class that is specifically tailored to work with Car objects. This approach enhances code quality, reduces errors, and improves the overall development experience.

### Reasons for using addInputMapped() instead addInput()

1. It ensures that values from the object are correctly populated into the form fields when the form is initialized.
2. It maintains a stronger connection between the form fields and the underlying data object. 
3. It reduces the chance of mismatches between the form data and the object structure.


### Other components [here](./../Components.README.md)