import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSwitchModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'dynamic-material-slide-toggle',
    templateUrl: './dynamic-material-slide-toggle.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, MatSlideToggleModule, NgClass, NgIf]
})
export class DynamicMaterialSlideToggleComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    RIPPLE_OPTIONS = inject<RippleGlobalOptions>(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSwitchModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('matSlideToggle', {static: true}) matSlideToggle!: MatSlideToggle;

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
