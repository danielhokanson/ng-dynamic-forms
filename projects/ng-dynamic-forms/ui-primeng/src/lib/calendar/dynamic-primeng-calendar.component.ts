import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
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
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-calendar',
    templateUrl: './dynamic-primeng-calendar.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, DatePickerModule]
})
export class DynamicPrimeNGCalendarComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel | DynamicTimePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pCalendar', {static: true}) pCalendar!: DatePicker;

    /** Inserted by Angular inject() migration for backwards compatibility */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@angular-eslint/prefer-inject
    constructor(...args: unknown[]);
    // TODO: Constructor uses inject() internally - prefer-inject warning can be ignored
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor() {
        const layoutService = inject(DynamicFormLayoutService);
        const validationService = inject(DynamicFormValidationService);

        super(layoutService, validationService);
    
        this.layoutService = layoutService;
        this.validationService = validationService;
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
