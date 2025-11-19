import { Component, EventEmitter, Input, Output, QueryList, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select, SelectModule } from 'primeng/select';
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSelectModel,
    DynamicTemplateDirective
} from '@danielhokanson/ng-dynamic-forms-core';
import { PRIME_NG_TEMPLATE_DIRECTIVES } from '../dynamic-primeng-form.const';
import { DynamicPrimeNGFormControlWithTemplateComponent } from '../dynamic-primeng-form-control-with-template.component';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-dropdown',
    templateUrl: './dynamic-primeng-dropdown.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, SelectModule, AsyncPipe]
})
export class DynamicPrimeNGDropdownComponent extends DynamicPrimeNGFormControlWithTemplateComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    readonly templateDirectives = PRIME_NG_TEMPLATE_DIRECTIVES;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pDropdown', { static: true }) pDropdown!: Select;

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

    get viewChild(): Select {
        return this.pDropdown;
    }
}
