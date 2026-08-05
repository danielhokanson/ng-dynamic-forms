import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicSelectModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-ngx-bootstrap-select',
    templateUrl: './dynamic-ngx-bootstrap-select.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, AsyncPipe]
})
export class DynamicNGxBootstrapSelectComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    // An explicit public constructor is required: the abstract base classes of
    // @danielhokanson/ng-dynamic-forms-core resolve all dependencies via inject()
    // but declare their constructors as protected.
    constructor() {
        super();
    }
}
