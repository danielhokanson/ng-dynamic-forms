import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { DynamicMaterialFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-material';
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormControlEvent
} from '@danielhokanson/ng-dynamic-forms-core';
import { MATERIAL_SAMPLE_FORM_MODEL } from './material-sample-form.model';
import { MATERIAL_SAMPLE_FORM_LAYOUT } from './material-sample-form.layout';

@Component({
    selector: 'dynamic-material-sample-form',
    styleUrls: ['../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css'],
    templateUrl: './material-sample-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [JsonPipe, MatNativeDateModule, MatCardModule, ReactiveFormsModule, DynamicMaterialFormComponent]
})
export class MaterialSampleFormComponent {
    private formService = inject(DynamicFormService);

    formModel: DynamicFormControlModel[] = MATERIAL_SAMPLE_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);
    formLayout: DynamicFormLayout = MATERIAL_SAMPLE_FORM_LAYOUT;


    onBlur($event: DynamicFormControlEvent) {
        console.debug(`Material blur event on: ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.debug(`Material change event on: ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.debug(`Material focus event on: ${$event.model.id}: `, $event);
    }

    onMatEvent($event: DynamicFormControlEvent) {
        console.debug(`Material ${$event.type} event on: ${$event.model.id}: `, $event);
    }
}
