import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormArrayModel,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormService,
    DynamicTemplateDirective
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicBootstrapFormComponent } from '@danielhokanson/ng-dynamic-forms-ui-bootstrap';
import { BOOTSTRAP_SAMPLE_FORM_MODEL } from './bootstrap-sample-form.model';

@Component({
    selector: 'dynamic-bootstrap-sample-form',
    templateUrl: './bootstrap-sample-form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, DynamicBootstrapFormComponent, DynamicTemplateDirective]
})
export class BootstrapSampleFormComponent {
    private formService = inject(DynamicFormService);

    formModel: DynamicFormControlModel[] = BOOTSTRAP_SAMPLE_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);

    formArrayModel = this.formService.findModelById<DynamicFormArrayModel>('bootstrapFormArray', this.formModel) as DynamicFormArrayModel;
    formArray = this.formService.findControlByModel<UntypedFormArray>(this.formArrayModel, this.formGroup) as UntypedFormArray;

    getFormArray(model: DynamicFormArrayModel, group: UntypedFormGroup): UntypedFormArray {
        return this.formService.findControlByModel(model, group) as UntypedFormArray;
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formService.insertFormArrayGroup(index, this.getFormArray(context, this.formGroup), context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formService.removeFormArrayGroup(index, this.getFormArray(context, this.formGroup), context);
    }

    onBlur($event: DynamicFormControlEvent) {
        console.debug(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.debug(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.debug(`FOCUS event on ${$event.model.id}: `, $event);
    }
}
