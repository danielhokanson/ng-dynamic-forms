import { Component } from '@angular/core';
import { DynamicFormService, DynamicFormControlModel } from '@danielhokanson/ng-dynamic-forms-core';
import { LAZY_LOADED_FORM_MODEL } from './lazy-loaded-form.model';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicBootstrapFormControlContainerComponent } from '@danielhokanson/ng-dynamic-forms-ui-bootstrap';
import { NgFor } from '@angular/common';

@Component({
    selector: 'dynamic-lazy-loaded-form',
    templateUrl: './lazy-loaded-form.component.html',
    standalone: true,
    imports: [NgFor, ReactiveFormsModule, DynamicBootstrapFormControlContainerComponent]
})
export class LazyLoadedFormComponent {
    formModel: DynamicFormControlModel[] = LAZY_LOADED_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);

    // TODO: Migrate to inject() function - demo app component, can be handled later
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor(private formService: DynamicFormService) {
    }
}
