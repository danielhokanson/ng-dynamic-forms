# NG Dynamic Forms ngx-bootstrap UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-ngx-bootstrap -S
```

## Import

All components are standalone — import them directly into your standalone component (the former `DynamicFormsNGxBootstrapUIModule` NgModule no longer exists):

```ts
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicNGxBootstrapFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-ngx-bootstrap';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicNGxBootstrapFormComponent],
    // ...
})
export class MyFormComponent {}
```

## Usage

with **`DynamicNGxBootstrapFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-ngx-bootstrap-form [group]="myFormGroup"
                                [model]="myFormModel"></dynamic-ngx-bootstrap-form>
</form>
```

with **`DynamicNGxBootstrapFormControlContainerComponent`** (import it as `DynamicNGxBootstrapFormControlContainerComponent`, selector `dynamic-ngx-bootstrap-form-control`):
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-ngx-bootstrap-form-control [group]="myFormGroup"
                                            [model]="controlModel"></dynamic-ngx-bootstrap-form-control>
    }
</form>
```

## Form Controls

|                                       Control                                      	|            Model            	| Required Property 	|
|:----------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|         **[Checkbox](http://getbootstrap.com/css/#checkboxes-and-radios)**         	| `DynamicCheckboxModel`      	|         –         	|
|  **[Checkbox Group](https://valor-software.com/ngx-bootstrap/#/buttons#checkbox)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|       **[Datepicker](https://valor-software.com/ngx-bootstrap/#/datepicker)**      	| `DynamicDatePickerModel`    	|         –         	|
|                  **[Input](http://getbootstrap.com/css/#inputs)**                  	| `DynamicInputModel`         	|         –         	|
| **[Radio Group](https://valor-software.com/ngx-bootstrap/#/buttons#radio-button)** 	| `DynamicRadioGroupModel`    	|         –         	|
|           **[Rating](https://valor-software.com/ngx-bootstrap/#/rating)**          	| `DynamicRatingModel`        	|         –         	|
|                 **[Select](http://getbootstrap.com/css/#selects)**                 	| `DynamicSelectModel`        	|         –         	|
|                **[TextArea](http://getbootstrap.com/css/#textarea)**               	| `DynamicTextAreaModel`      	|         –         	|
|       **[Timepicker](https://valor-software.com/ngx-bootstrap/#/timepicker)**      	| `DynamicTimePickerModel`    	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-ngx-bootstrap/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#bootstrap-sample-form)
