import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorPicker, ColorPickerModule } from 'primeng/colorpicker';
import {
    DynamicColorPickerModel,
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-colorpicker',
    templateUrl: './dynamic-primeng-colorpicker.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, ColorPickerModule]
})
export class DynamicPrimeNGColorPickerComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicColorPickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pColorPicker', {static: true}) pColorPicker!: ColorPicker;

    constructor() {
        super();
    }

    get format(): 'hex' | 'rgb' | 'hsb' {
        const format = this.model.format;
        return format === 'rgb' || format === 'hsb' ? format : 'hex';
    }
}
