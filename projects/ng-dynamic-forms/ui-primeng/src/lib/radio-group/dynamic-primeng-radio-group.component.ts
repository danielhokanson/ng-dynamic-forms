import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicRadioGroupModel,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgClass, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-radio-group',
    templateUrl: './dynamic-primeng-radio-group.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, RadioButtonModule, AsyncPipe]
})
export class DynamicPrimeNGRadioGroupComponent extends DynamicFormControlComponent {
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
