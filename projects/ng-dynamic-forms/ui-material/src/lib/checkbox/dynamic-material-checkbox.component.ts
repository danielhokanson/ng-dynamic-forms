import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import {
    DynamicCheckboxModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-material-checkbox',
    templateUrl: './dynamic-material-checkbox.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, MatCheckboxModule, NgClass]
})
export class DynamicMaterialCheckboxComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    RIPPLE_OPTIONS = inject<RippleGlobalOptions>(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicCheckboxModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('matCheckbox', {static: true}) matCheckbox!: MatCheckbox;

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
