import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-ngx-bootstrap-checkbox-group',
    templateUrl: './dynamic-ngx-bootstrap-checkbox-group.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, ButtonsModule]
})
export class DynamicNGxBootstrapCheckboxGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicCheckboxGroupModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    getCheckboxId(model: DynamicCheckboxModel) {
        return this.layoutService.getElementId(model);
    }

    // An explicit public constructor is required: the abstract base classes of
    // @danielhokanson/ng-dynamic-forms-core resolve all dependencies via inject()
    // but declare their constructors as protected.
    constructor() {
        super();
    }
}
