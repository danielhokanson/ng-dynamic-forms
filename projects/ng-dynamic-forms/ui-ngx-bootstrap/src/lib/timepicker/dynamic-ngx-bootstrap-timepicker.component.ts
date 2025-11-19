import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { TimepickerComponent, TimepickerModule } from 'ngx-bootstrap/timepicker';
import {
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTimePickerModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-ngx-bootstrap-timepicker',
    templateUrl: './dynamic-ngx-bootstrap-timepicker.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, TimepickerModule, NgClass]
})
export class DynamicNGxBootstrapTimePickerComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicTimePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(TimepickerComponent, {static: true}) bsTimePicker!: TimepickerComponent;

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
}
