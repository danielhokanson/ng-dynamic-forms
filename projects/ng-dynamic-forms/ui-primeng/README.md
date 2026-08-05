# NG Dynamic Forms Prime NG UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-primeng -S
```

## Import

All components are standalone and are imported directly by the components that use them:
```ts
import { ReactiveFormsModule } from '@angular/forms';
import {
    DynamicPrimeNGFormComponent,
    DynamicPrimeNGFormControlContainerComponent
} from '@danielhokanson/ng-dynamic-forms-ui-primeng';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicPrimeNGFormComponent, DynamicPrimeNGFormControlContainerComponent],
    templateUrl: './my-form.component.html'
})
export class MyFormComponent {}
```

## Usage

with **`DynamicPrimeNGFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-primeng-form [group]="myFormGroup"
                          [model]="myFormModel"></dynamic-primeng-form>
</form>
```

with **`DynamicPrimeNGFormControlContainerComponent`**:
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-primeng-form-control [group]="myFormGroup"
                                      [model]="controlModel"></dynamic-primeng-form-control>
    }
</form>
```

## Form Controls

|                                 Control                                 	|                        Model                       	|   Required Property   	|
|:-----------------------------------------------------------------------:	|:--------------------------------------------------:	|:---------------------:	|
|  **[AutoComplete](https://www.primefaces.org/primeng/#/autocomplete)**  	| `DynamicInputModel`                                	|         `list`        	|
|      **[Calendar](https://www.primefaces.org/primeng/#/calendar)**      	| `DynamicDatePickerModel`, `DynamicTimePickerModel` 	|           –           	|
|      **[Checkbox](https://www.primefaces.org/primeng/#/checkbox)**      	| `DynamicCheckboxModel`                             	|           –           	|
|         **[Chips](https://www.primefaces.org/primeng/#/chips)**         	| `DynamicInputModel`                                	|    `multiple: true`   	|
|   **[ColorPicker](https://www.primefaces.org/primeng/#/colorpicker)**   	| `DynamicColorPickerModel`                          	|           –            	|
|      **[Dropdown](https://www.primefaces.org/primeng/#/dropdown)**      	| `DynamicSelectModel`                               	|           –           	|
|        **[Editor](https://www.primefaces.org/primeng/#/editor)**        	| `DynamicEditorModel`                               	|           –           	|
|     **[InputMask](https://www.primefaces.org/primeng/#/inputmask)**     	| `DynamicInputModel`                                	|         `mask`        	|
|   **[InputSwitch](https://www.primefaces.org/primeng/#/inputswitch)**   	| `DynamicSwitchModel`                               	|           –           	|
|     **[InputText](https://www.primefaces.org/primeng/#/inputtext)**     	| `DynamicInputModel`                                	|           –           	|
| **[InputTextArea](https://www.primefaces.org/primeng/#/inputtextarea)** 	| `DynamicTextAreaModel`                             	|           –           	|
|   **[MultiSelect](https://www.primefaces.org/primeng/#/multiselect)**   	| `DynamicSelectModel`                               	|    `multiple: true`   	|
|   **[Radio Group](https://www.primefaces.org/primeng/#/radiobutton)**   	| `DynamicRadioGroupModel`                           	|           –           	|
|        **[Rating](https://www.primefaces.org/primeng/#/rating)**        	| `DynamicRatingModel`                               	|           –           	|
|        **[Slider](https://www.primefaces.org/primeng/#/slider)**        	| `DynamicSliderModel`                               	|           –           	|
|       **[Spinner](https://www.primefaces.org/primeng/#/spinner)**       	| `DynamicInputModel`                                	| `inputType: "number"` 	|

## Custom UI Events
```ts
<form [formGroup]="myFormGroup">

    <dynamic-primeng-form [group]="myFormGroup"
                          [model]="myFormModel"
                          (pEvent)="onPEvent($event)"></dynamic-primeng-form>
</form>
```

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-primeng/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#primeng-sample-form) 
