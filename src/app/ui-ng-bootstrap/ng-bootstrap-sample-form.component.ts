import { Component, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import {
    DynamicFormService,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicInputModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NG_BOOTSTRAP_SAMPLE_FORM_MODEL } from './ng-bootstrap-sample-form.model';
import { NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT } from './ng-bootstrap-sample-form.layout';
import { DynamicNGBootstrapFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'dynamic-ng-bootstrap-sample-form',
    styleUrls: [],
    templateUrl: './ng-bootstrap-sample-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [JsonPipe, ReactiveFormsModule, DynamicNGBootstrapFormComponent]
})
export class NGBootstrapSampleFormComponent {
    private formService = inject(DynamicFormService);

    formModel: DynamicFormControlModel[] = NG_BOOTSTRAP_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    @ViewChild(DynamicNGBootstrapFormComponent) formComponent!: DynamicNGBootstrapFormComponent;


    onClick() {
        const model = this.formService.findModelById('firstName', this.formModel) as DynamicInputModel;

        model.label = 'Updated Label';
        this.formService.detectChanges();

        model.value = 'Test Value';
        model.disabled = true;
    }

    onBlur($event: DynamicFormControlEvent) {
        console.debug(`NG Bootstrap blur event on: ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.debug(`NG Bootstrap change event on: ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.debug(`NG Bootstrap focus event on: ${$event.model.id}: `, $event);
    }

    onNgbEvent($event: DynamicFormControlEvent) {
        console.debug(`NG Bootstrap ${$event.type} event on: ${$event.model.id}: `, $event);
    }
}
