import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText, InputTextModule } from 'primeng/inputtext';
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicInputModel,
    DynamicFormControlLayout,
    DynamicFormsCoreModule
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-input',
    templateUrl: './dynamic-primeng-input.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, InputTextModule, DynamicFormsCoreModule, NgIf, NgFor, AsyncPipe]
})
export class DynamicPrimeNGInputComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pInputText', {static: true}) pInputText!: InputText;

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
