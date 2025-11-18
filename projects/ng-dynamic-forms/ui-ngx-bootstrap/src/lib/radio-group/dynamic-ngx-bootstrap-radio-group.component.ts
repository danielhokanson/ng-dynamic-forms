import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormControlComponent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicRadioGroupModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, NgFor, AsyncPipe } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
    selector: 'dynamic-ngx-bootstrap-radio-group',
    templateUrl: './dynamic-ngx-bootstrap-radio-group.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, ButtonsModule, NgClass, NgFor, AsyncPipe]
})
export class DynamicNGxBootstrapRadioGroupComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

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
