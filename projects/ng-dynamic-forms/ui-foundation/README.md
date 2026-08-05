# NG Dynamic Forms Foundation UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-foundation -S
```

## Import

All components are standalone. Import the form component (or the form control container component) directly:

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFoundationFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-foundation';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicFoundationFormComponent],
    templateUrl: './my-form.component.html'
})
export class MyFormComponent {}
```

## Usage

with **`DynamicFoundationFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-foundation-form [group]="myFormGroup"
                             [model]="myFormModel"></dynamic-foundation-form>
</form>
```

with **`DynamicFoundationFormControlContainerComponent`** (import `DynamicFoundationFormControlContainerComponent` instead):
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-foundation-form-control [group]="myFormGroup"
                                         [model]="controlModel"></dynamic-foundation-form-control>
    }
</form>
```

## Form Controls

|                                               Control                                               	|            Model            	| Required Property 	|
|:---------------------------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|    **[Checkbox](http://foundation.zurb.com/sites/docs/forms.html#checkboxes-and-radio-buttons)**    	| `DynamicCheckboxModel`      	|         –         	|
| **[Checkbox Group](http://foundation.zurb.com/sites/docs/forms.html#checkboxes-and-radio-buttons)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|              **[Input](http://foundation.zurb.com/sites/docs/forms.html#text-inputs)**              	| `DynamicInputModel`         	|         –         	|
|   **[Radio Group](http://foundation.zurb.com/sites/docs/forms.html#checkboxes-and-radio-buttons)**  	| `DynamicRadioGroupModel`    	|         –         	|
|             **[Select](http://foundation.zurb.com/sites/docs/forms.html#select-menus)**             	| `DynamicSelectModel`        	|         –         	|
|                   **[Switch](http://foundation.zurb.com/sites/docs/switch.html)**                   	| `DynamicSwitchModel`        	|         –         	|
|             **[TextArea](http://foundation.zurb.com/sites/docs/forms.html#text-areas)**             	| `DynamicTextAreaModel`      	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-foundation/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#foundation-sample-form) 
