# NG Dynamic Forms Basic UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-basic -S
```

## Import

All components are standalone. Import the form component (or the form control container component) directly:

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicBasicFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-basic';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicBasicFormComponent],
    templateUrl: './my-form.component.html'
})
export class MyFormComponent {}
```

## Usage

with **`DynamicBasicFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-basic-form [group]="myFormGroup"
                        [model]="myFormModel"></dynamic-basic-form>
</form>
```

with **`DynamicBasicFormControlContainerComponent`** (import `DynamicBasicFormControlContainerComponent` instead):
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-basic-form-control [group]="myFormGroup"
                                    [model]="controlModel"></dynamic-basic-form-control>
    }
</form>
```

## Form Controls

|                                   Control                                  	|            Model            	| Required Property 	|
|:--------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|    **[Checkbox](https://www.w3.org/wiki/HTML/Elements/input/checkbox)**    	|    `DynamicCheckboxModel`   	|         –         	|
| **[Checkbox Group](https://www.w3.org/wiki/HTML/Elements/input/checkbox)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|          **[Input](https://www.w3.org/wiki/HTML/Elements/input)**          	|     `DynamicInputModel`     	|         –         	|
|    **[Radio Group](https://www.w3.org/wiki/HTML/Elements/input/radio)**    	|   `DynamicRadioGroupModel`  	|         –         	|
|         **[Select](https://www.w3.org/wiki/HTML/Elements/select)**         	|     `DynamicSelectModel`    	|         –         	|
|       **[TextArea](https://www.w3.org/wiki/HTML/Elements/textarea)**       	|    `DynamicTextAreaModel`   	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-basic/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#basic-sample-form) 
