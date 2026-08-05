# NG Dynamic Forms NG Bootstrap UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-ng-bootstrap -S
```

## Import

All components are standalone — import them directly into your standalone component (the former `DynamicFormsNGBootstrapUIModule` NgModule no longer exists):

```ts
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicNGBootstrapFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-ng-bootstrap';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicNGBootstrapFormComponent],
    // ...
})
export class MyFormComponent {}
```

## Usage

with **`DynamicNGBootstrapFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-ng-bootstrap-form [group]="myFormGroup"
                               [model]="myFormModel"></dynamic-ng-bootstrap-form>
</form>
```

with **`DynamicNGBootstrapFormControlContainerComponent`** (import it as `DynamicNGBootstrapFormControlContainerComponent`, selector `dynamic-ng-bootstrap-form-control`):
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-ng-bootstrap-form-control [group]="myFormGroup"
                                           [model]="controlModel"></dynamic-ng-bootstrap-form-control>
    }
</form>
```

> **Note:** ng-bootstrap removed its buttons API (`NgbButtonsModule`) in version 12, so
> `DynamicRadioGroupModel` and `DynamicCheckboxGroupModel` are rendered with plain
> [Bootstrap 5 markup](https://getbootstrap.com/docs/5.3/forms/checks-radios/#radio-toggle-buttons).

## Form Controls

|                                             Control                                             	|            Model            	| Required Property 	|
|:-----------------------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|              **[Calendar](https://ng-bootstrap.github.io/#/components/datepicker)**             	| `DynamicDatePickerModel`    	|   `inline: true`  	|
|    **[Checkbox](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios)**    	| `DynamicCheckboxModel`      	|         –         	|
| **[Checkbox Group](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|             **[DatePicker](https://ng-bootstrap.github.io/#/components/datepicker)**            	| `DynamicDatePickerModel`    	|         –         	|
|         **[Input](https://v4-alpha.getbootstrap.com/components/forms/#textual-inputs)**         	| `DynamicInputModel`         	|         –         	|
|   **[Radio Group](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios)**  	| `DynamicRadioGroupModel`    	|         –         	|
|             **[Rating](https://ng-bootstrap.github.io/#/components/rating)**            	        | `DynamicRatingModel`    	    |         –         	|
|         **[Select](https://v4-alpha.getbootstrap.com/components/forms/#form-controls)**         	| `DynamicSelectModel`        	|         –         	|
|        **[TextArea](https://v4-alpha.getbootstrap.com/components/forms/#form-controls)**        	| `DynamicTextAreaModel`      	|         –         	|
|             **[TimePicker](https://ng-bootstrap.github.io/#/components/timepicker)**            	| `DynamicTimePickerModel`    	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-ng-bootstrap/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#ng-bootstrap-sample-form) 
