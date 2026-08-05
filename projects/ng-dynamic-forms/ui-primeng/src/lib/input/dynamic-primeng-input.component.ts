import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText, InputTextModule } from 'primeng/inputtext';
import {
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicInputModel,
    DynamicFormControlLayout,
    DynamicFormsCoreModule
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-input',
    templateUrl: './dynamic-primeng-input.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, InputTextModule, DynamicFormsCoreModule, AsyncPipe]
})
export class DynamicPrimeNGInputComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pInputText', {static: true}) pInputText!: InputText;

    constructor() {
        super();
    }
}
