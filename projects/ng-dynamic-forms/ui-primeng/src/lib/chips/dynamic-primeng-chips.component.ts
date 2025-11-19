import { Component, EventEmitter, Input, Output, QueryList, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chip, ChipModule } from 'primeng/chip';
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
    imports: [ReactiveFormsModule, NgClass, ChipModule]
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

    @ViewChild('pChips', { static: true }) pChips!: Chip;

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

    get viewChild(): Chip {
        return this.pChips;
    }
}
