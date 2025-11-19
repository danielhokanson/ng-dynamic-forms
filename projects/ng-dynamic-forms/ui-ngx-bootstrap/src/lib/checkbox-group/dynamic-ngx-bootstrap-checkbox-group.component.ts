import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'dynamic-ngx-bootstrap-checkbox-group',
    templateUrl: './dynamic-ngx-bootstrap-checkbox-group.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, ButtonsModule]
})
export class DynamicNGxBootstrapCheckboxGroupComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicCheckboxGroupModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

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

    getCheckboxId(model: DynamicCheckboxModel) {
        return this.layoutService.getElementId(model);
    }
}
