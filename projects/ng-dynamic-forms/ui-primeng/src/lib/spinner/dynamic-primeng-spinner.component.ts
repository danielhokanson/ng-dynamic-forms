import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import {
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicInputModel,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-spinner',
    templateUrl: './dynamic-primeng-spinner.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, InputNumberModule]
})
export class DynamicPrimeNGSpinnerComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pSpinner', {static: true}) pSpinner!: InputNumber;

    constructor() {
        super();
    }

    get minValue(): number | undefined {
        return DynamicPrimeNGSpinnerComponent.asNumber(this.model.min);
    }

    get maxValue(): number | undefined {
        return DynamicPrimeNGSpinnerComponent.asNumber(this.model.max);
    }

    private static asNumber(value: string | number | Date | null | undefined): number | undefined {
        if (value === null || value === undefined) {
            return undefined;
        }

        return typeof value === 'number' ? value : Number(value);
    }
}
