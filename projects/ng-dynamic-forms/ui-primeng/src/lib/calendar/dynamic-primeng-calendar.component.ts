import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicDateControlValue,
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicTimePickerModel,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-calendar',
    templateUrl: './dynamic-primeng-calendar.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, DatePickerModule]
})
export class DynamicPrimeNGCalendarComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel | DynamicTimePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pCalendar', {static: true}) pCalendar!: DatePicker;

    constructor() {
        super();
    }

    get focusedDate(): Date | null {
        return DynamicPrimeNGCalendarComponent.asDate((this.model as DynamicDatePickerModel).focusedDate);
    }

    get maxDate(): Date | null {
        return DynamicPrimeNGCalendarComponent.asDate(this.model.max);
    }

    get minDate(): Date | null {
        return DynamicPrimeNGCalendarComponent.asDate(this.model.min);
    }

    get inline(): boolean {
        return (this.model as DynamicDatePickerModel).inline ?? false;
    }

    get showSeconds(): boolean {
        return (this.model as DynamicTimePickerModel).showSeconds ?? false;
    }

    private static asDate(value: DynamicDateControlValue | null | undefined): Date | null {
        if (value === null || value === undefined) {
            return null;
        }

        if (typeof value === 'string') {
            return new Date(value);
        }

        return value as Date;
    }
}
