import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { Calendar, CalendarModule } from "primeng/calendar";
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicDateControlValue,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicTimePickerModel,
    DynamicFormControlLayout
} from "@danielhokanson/ng-dynamic-forms-core";
import { NgClass } from "@angular/common";

@Component({
    selector: "dynamic-primeng-calendar",
    templateUrl: "./dynamic-primeng-calendar.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, CalendarModule]
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

    @ViewChild("pCalendar", {static: true}) pCalendar!: Calendar;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    get focusedDate(): DynamicDateControlValue | null {
        return (this.model as DynamicDatePickerModel).focusedDate ?? null;
    }

    get inline(): boolean {
        return (this.model as DynamicDatePickerModel).inline ?? false;
    }

    get showSeconds(): boolean {
        return (this.model as DynamicTimePickerModel).showSeconds ?? false;
    }
}
