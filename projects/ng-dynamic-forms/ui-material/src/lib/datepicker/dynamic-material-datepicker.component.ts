import { Component, EventEmitter, Input, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-material-datepicker',
    templateUrl: './dynamic-material-datepicker.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatFormFieldModule, ReactiveFormsModule, NgClass, MatInputModule, MatDatepickerModule]
})
export class DynamicMaterialDatePickerComponent extends DynamicFormControlComponent {
    FORM_FIELD_OPTIONS = inject<MatFormFieldDefaultOptions>(MAT_FORM_FIELD_DEFAULT_OPTIONS, { optional: true });

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('matDatepicker', {static: true}) matDatePicker!: MatDatepicker<any>;
    @ViewChild(MatInput, {static: true}) matInput!: MatInput;

    constructor() {
        super();
    }
}
