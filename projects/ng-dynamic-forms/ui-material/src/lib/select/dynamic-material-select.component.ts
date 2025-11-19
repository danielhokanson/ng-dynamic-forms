import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions, MatOptionModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSelectModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-material-select',
    templateUrl: './dynamic-material-select.component.html',
    standalone: true,
    imports: [MatFormFieldModule, NgClass, ReactiveFormsModule, NgIf, MatSelectModule, NgFor, MatOptionModule, AsyncPipe]
})
export class DynamicMaterialSelectComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    errorStateMatcher = inject<ErrorStateMatcher>(ErrorStateMatcher);
    FORM_FIELD_OPTIONS = inject<MatFormFieldDefaultOptions>(MAT_FORM_FIELD_DEFAULT_OPTIONS, { optional: true });
    RIPPLE_OPTIONS = inject<RippleGlobalOptions>(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('matSelect', {static: true}) matSelect!: MatSelect;

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
