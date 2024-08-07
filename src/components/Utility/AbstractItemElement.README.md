# Abstract Item Element

The AbstractItemElement class is a crucial base class in the Vue Template Crafter system. It provides common functionality and properties that are shared across various UI components, such as buttons, inputs, and other form elements.

### Properties

crafter: Crafter | null
- Stores a reference to the parent Crafter instance.
- Allows the element to interact with its container.

cssClassesItem: CssClassManager
- Manages CSS classes for the main item element.

cssClassesWrapper: CssClassManager
- Manages CSS classes for the wrapper element (if applicable).

cssClassesContainer: CssClassManager
- Manages CSS classes for the container element (if applicable).

dataTransfer: DataTransfer
- Handles data transfer operations for the element.

enable: boolean
- Determines if the element is enabled or disabled. 
- Default is true.

flexSize: FlexSizeManager
- Manages the flexible sizing of the element across different screen sizes.

uuid: string
- A unique identifier for the element.
- Generated using UUID v4.

visible: boolean
- Controls the visibility of the element.
- Default is true.

### Constructor
The constructor initializes the uuid property with a new UUID v4 value.

### Methods
#### getStyleSettings(): StyleSettings
- Retrieves the global style settings from the Vue Template Crafter store.
    Returns: The current StyleSettings object.

#### move(container: TemplatePosition = "body", position: "end" | "start" | "up" | "down" | number = "end"): this

- Moves the element to a different position within the Crafter.
- Parameters:
  - container: The target container ("body", "footerLeft", or "footerRight").
  - position: The desired position within the container.
- Returns: The current instance for method chaining.

#### remove(): void

- Removes the element from its parent Crafter.

#### setCrafter(crafter: Crafter): this

- Sets the parent Crafter for this element.
- Returns: The current instance for method chaining.

#### isLastItem(): boolean

- Checks if the element is the last item in its current container.
- Returns: true if it's the last item, false otherwise.

#### isFirstItem(): boolean

- Checks if the element is the first item in its current container.
- Returns: true if it's the first item, false otherwise.

#### setDisable(value: boolean = true): this

- Disables the element.
- Returns: The current instance for method chaining.

#### setEnable(value: boolean = true): this

- Enables the element.
- Returns: The current instance for method chaining.

#### setHidden(value: boolean = true): this

- Hides the element.
- Returns: The current instance for method chaining.

#### setVisible(value: boolean = true): this
- Makes the element visible.
- Returns: The current instance for method chaining.

### Example: Input fields with sort possibility

```TypeScript
  function analysePosition() {
    const allTrackInputs = playlist.getAllInputs()
    for (const track of allTrackInputs) {
        const upBtn = track.actionButtons.find(obj => obj.label === "Up")
        const downBtn = track.actionButtons.find(obj => obj.label === "Down")
        if(!upBtn || !downBtn) continue;
        upBtn.setHidden(track.isFirstItem())
        downBtn.setHidden(track.isLastItem())
    }
}

const playlist = new Crafter()
playlist.addHeader("My awesome playlist").move("header")
playlist.setDefaultInputSize("100%")
playlist.addButton("Add song").onClick(() => {
    const track = playlist.addInput("Title")
    track.addButton("Up").onClick(() => {
        track.move("body", "up")
        analysePosition()
    })
    track.addButton("Down").onClick(() => {
        track.move("body", "down")
        analysePosition()
    })
    analysePosition()
}).move("footerRight")

playlist.openInModal()
```
