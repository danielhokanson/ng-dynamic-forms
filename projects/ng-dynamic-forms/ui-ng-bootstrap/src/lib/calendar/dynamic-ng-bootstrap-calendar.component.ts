import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepicker, NgbDatepickerConfig, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-ng-bootstrap-calendar',
    templateUrl: './dynamic-ng-bootstrap-calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgbDatepickerModule, NgClass]
})
export class DynamicNGBootstrapCalendarComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    config = inject(NgbDatepickerConfig);

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(NgbDatepicker, {static: true}) ngbCalendar!: NgbDatepicker;

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
