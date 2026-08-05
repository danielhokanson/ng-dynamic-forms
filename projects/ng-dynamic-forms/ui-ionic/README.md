# NG Dynamic Forms Ionic UI

## Installation
```
npm i @danielhokanson/ng-dynamic-forms-ui-ionic -S
```

## Import

All components are standalone and are imported directly by the components that use them:
```ts
import { ReactiveFormsModule } from '@angular/forms';
import {
    DynamicIonicFormComponent,
    DynamicIonicFormControlContainerComponent
} from '@danielhokanson/ng-dynamic-forms-ui-ionic';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, DynamicIonicFormComponent, DynamicIonicFormControlContainerComponent],
    templateUrl: './my-form.component.html'
})
export class MyFormComponent {}
```

## Usage

with **`DynamicIonicFormComponent`**:
```html
<form [formGroup]="myFormGroup">

    <dynamic-ionic-form [group]="myFormGroup"
                        [model]="myFormModel"></dynamic-ionic-form>
</form>
```

with **`DynamicIonicFormControlContainerComponent`**:
```html
<form [formGroup]="myFormGroup">

    @for (controlModel of myFormModel; track controlModel.id) {
        <dynamic-ionic-form-control [group]="myFormGroup"
                                    [model]="controlModel"></dynamic-ionic-form-control>
    }
</form>
```

## Form Controls

|                                  Control                                  	|                        Model                       	| Required Property 	|
|:-------------------------------------------------------------------------:	|:--------------------------------------------------:	|:-----------------:	|
|    **[Checkbox](http://ionicframework.com/docs/components/#checkbox)**    	| `DynamicCheckboxModel`                             	|         –         	|
| **[Checkbox Group](http://ionicframework.com/docs/components/#checkbox)** 	| `DynamicCheckboxGroupModel`                        	|         –         	|
|    **[DateTime](http://ionicframework.com/docs/components/#datetime)**    	| `DynamicDatePickerModel`, `DynamicTimePickerModel` 	|         –         	|
|       **[Input](http://ionicframework.com/docs/components/#inputs)**      	| `DynamicInputModel`                                	|         –         	|
|    **[Radio Group](http://ionicframework.com/docs/components/#radio)**    	| `DynamicRadioGroupModel`                           	|         –         	|
|       **[Range](http://ionicframework.com/docs/components/#range)**       	| `DynamicSliderModel`                               	|         –         	|
|      **[Select](http://ionicframework.com/docs/components/#select)**      	| `DynamicSelectModel`                               	|         –         	|
|     **[TextArea](http://ionicframework.com/docs/components/#inputs)**     	| `DynamicTextAreaModel`                             	|         –         	|
|      **[Toggle](http://ionicframework.com/docs/components/#toggle)**      	| `DynamicSwitchModel`                               	|         –         	|

## Custom UI Events
```ts
<form [formGroup]="myFormGroup">

    <dynamic-ionic-form [group]="myFormGroup"
                        [model]="myFormModel"
                        (ionEvent)="onIonEvent($event)"></dynamic-ionic-form>
</form>
```

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-ionic/)
