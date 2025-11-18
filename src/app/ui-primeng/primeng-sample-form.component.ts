import { Component, ViewEncapsulation } from '@angular/core';
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormControlEvent
} from '@danielhokanson/ng-dynamic-forms-core';
import { PRIME_NG_SAMPLE_FORM_MODEL } from './primeng-sample-form.model';
import { PRIME_NG_SAMPLE_FORM_LAYOUT } from './primeng-sample-form.layout';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicPrimeNGFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-primeng';

@Component({
    selector: 'dynamic-primeng-sample-form',
    // PrimeNG 19 uses a different theming system - styles are imported via CSS imports
    templateUrl: './primeng-sample-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [JsonPipe, ReactiveFormsModule, DynamicPrimeNGFormComponent]
})
export class PrimeNGSampleFormComponent {
    formModel: DynamicFormControlModel[] = PRIME_NG_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = PRIME_NG_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    constructor(private formService: DynamicFormService) {
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`PrimeNG change event on ${$event.model.id}: `, $event);
    }

    onPEvent($event: DynamicFormControlEvent) {
        console.log(`PrimeNG ${$event.type} event on ${$event.model.id}: `, $event);
    }
}
