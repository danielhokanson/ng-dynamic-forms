# NG Dynamic Forms Bootstrap UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-bootstrap -S
```

## Import

All components are standalone — import them directly into your standalone component (the former `DynamicFormsBootstrapUIModule` NgModule no longer exists):

```ts
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicBootstrapFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-bootstrap';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicBootstrapFormComponent],
    // ...
})
export class MyFormComponent {}
```

## Usage

with **`DynamicBootstrapFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-bootstrap-form [group]="myFormGroup"
                            [model]="myFormModel"></dynamic-bootstrap-form>
</form>
```

with **`DynamicBootstrapFormControlContainerComponent`** (import it as `DynamicBootstrapFormControlContainerComponent`, selector `dynamic-bootstrap-form-control`):
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-bootstrap-form-control [group]="myFormGroup"
                                        [model]="controlModel"></dynamic-bootstrap-form-control>
    }
</form>
```

## Form Controls

|                                  Control                                 	|            Model            	| Required Property 	|
|:------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|    **[Checkbox](http://getbootstrap.com/css/#checkboxes-and-radios)**    	| `DynamicCheckboxModel`      	|         –         	|
| **[Checkbox Group](http://getbootstrap.com/css/#checkboxes-and-radios)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|  **[Datepicker](https://valor-software.com/ngx-bootstrap/#/datepicker)** 	| `DynamicDatePickerModel`    	|         –         	|
|             **[Input](http://getbootstrap.com/css/#inputs)**             	| `DynamicInputModel`         	|         –         	|
|   **[Radio Group](http://getbootstrap.com/css/#checkboxes-and-radios)**  	| `DynamicRadioGroupModel`    	|         –         	|
|            **[Select](http://getbootstrap.com/css/#selects)**            	| `DynamicSelectModel`        	|         –         	|
|           **[TextArea](http://getbootstrap.com/css/#textarea)**          	| `DynamicTextAreaModel`      	|         –         	|
|  **[Timepicker](https://valor-software.com/ngx-bootstrap/#/timepicker)** 	| `DynamicTimePickerModel`    	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-bootstrap/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#bootstrap-sample-form) 
