import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicRadioGroupModel,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-radio-group',
    templateUrl: './dynamic-primeng-radio-group.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, RadioButtonModule, AsyncPipe]
})
export class DynamicPrimeNGRadioGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor() {
        super();
    }
}
