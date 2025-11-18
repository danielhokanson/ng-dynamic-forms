import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
    MatAutocomplete,
    MatAutocompleteDefaultOptions,
    MatAutocompleteModule
} from '@angular/material/autocomplete';
import { ErrorStateMatcher, MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions, MatOptionModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicMaterialFormInputControlComponent } from '../dynamic-material-form-input-control.component';
import { NgClass, NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-material-input',
    templateUrl: './dynamic-material-input.component.html',
    standalone: true,
    imports: [MatFormFieldModule, ReactiveFormsModule, NgClass, NgIf, MatInputModule, MatAutocompleteModule, NgFor, MatOptionModule,
        AsyncPipe]
})
export class DynamicMaterialInputComponent extends DynamicMaterialFormInputControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    errorStateMatcher = inject<ErrorStateMatcher>(ErrorStateMatcher);
    AUTOCOMPLETE_OPTIONS = inject<MatAutocompleteDefaultOptions>(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS);
    FORM_FIELD_OPTIONS = inject<MatFormFieldDefaultOptions>(MAT_FORM_FIELD_DEFAULT_OPTIONS, { optional: true });
    RIPPLE_OPTIONS = inject<RippleGlobalOptions>(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('matAutocomplete', {static: true}) matAutocomplete!: MatAutocomplete;
    @ViewChild(MatInput, {static: true}) matInput!: MatInput;

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {
        const layoutService = inject(DynamicFormLayoutService);
        const validationService = inject(DynamicFormValidationService);

        super(layoutService, validationService);
    
        this.layoutService = layoutService;
        this.validationService = validationService;
    }
}
