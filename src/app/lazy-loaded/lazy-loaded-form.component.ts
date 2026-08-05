import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DynamicFormService, DynamicFormControlModel } from '@danielhokanson/ng-dynamic-forms-core';
import { LAZY_LOADED_FORM_MODEL } from './lazy-loaded-form.model';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicBootstrapFormControlContainerComponent } from '@danielhokanson/ng-dynamic-forms-ui-bootstrap';


@Component({
    selector: 'dynamic-lazy-loaded-form',
    templateUrl: './lazy-loaded-form.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, DynamicBootstrapFormControlContainerComponent]
})
export class LazyLoadedFormComponent {
    private formService = inject(DynamicFormService);

    formModel: DynamicFormControlModel[] = LAZY_LOADED_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);

}
