// TODO: PrimeNG v20 removed the Chips component. Need to find a replacement or alternative implementation.
// This component is temporarily disabled. For multiple input values, consider using AutoComplete in multiple mode.
/*
import { Component, EventEmitter, Input, Output, QueryList, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chips, ChipsModule } from 'primeng/chips';
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateDirective
} from '@danielhokanson/ng-dynamic-forms-core';
import { PRIME_NG_TEMPLATE_DIRECTIVES } from '../dynamic-primeng-form.const';
import { DynamicPrimeNGFormControlWithTemplateComponent } from '../dynamic-primeng-form-control-with-template.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-chips',
    templateUrl: './dynamic-primeng-chips.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, ChipsModule]
})
export class DynamicPrimeNGChipsComponent extends DynamicPrimeNGFormControlWithTemplateComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    readonly templateDirectives = PRIME_NG_TEMPLATE_DIRECTIVES;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pChips', {static: true}) pChips!: Chips;

    constructor() {
        const layoutService = inject(DynamicFormLayoutService);
        const validationService = inject(DynamicFormValidationService);

        super(layoutService, validationService);
    
        this.layoutService = layoutService;
        this.validationService = validationService;
    }

    get viewChild(): Chips {
        return this.pChips;
    }
}
*/

// Stub export to prevent import errors
export class DynamicPrimeNGChipsComponent {
    // This is a stub - the component is disabled due to PrimeNG v20 removing Chips
}
