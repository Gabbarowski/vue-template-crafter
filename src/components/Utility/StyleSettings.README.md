# Style Settings

This class and settings are optional for most functions. Here you can define the standard classes that should be rendered in the respective HTML elements.

As easiest way you can add in your App.vue following source Code.

```
const customStyling = new StyleSettings()

customStyling.breakPoints.desktop = 960;
customStyling.breakPoints.tablet = 720;
customStyling.breakPoints.mobile = 420;

customStyling.cssDefaultClass.button = "btn"
customStyling.cssDefaultClass.buttonStylePrefix = "btn-"
customStyling.cssDefaultClass.buttonDefaultStyle = "btn"

customStyling.load()
```

If you are using Framework Bootstrap > 5.3, you can load the preset data

```
const bootstrapStyling = new StyleSettings()
bootstrapStyling.loadBootstrapStyle()
```
