import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChildren, EventEmitter, HostBinding, Input, Output, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DynamicFormArrayGroupModel,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormComponentService,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormRelationService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DynamicFormArrayComponent,
    DynamicFormControlLayout,
    DynamicFormArrayModel,
    DynamicFormControlCustomEvent,
    DynamicFormGroupComponent,
    DynamicFormGroupModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicFoundationTextAreaComponent } from './textarea/dynamic-foundation-textarea.component';
import { DynamicFoundationSwitchComponent } from './switch/dynamic-foundation-switch.component';
import { DynamicFoundationSelectComponent } from './select/dynamic-foundation-select.component';
import { DynamicFoundationRadioGroupComponent } from './radio-group/dynamic-foundation-radio-group.component';
import { DynamicFoundationInputComponent } from './input/dynamic-foundation-input.component';
import { DynamicFoundationCheckboxComponent } from './checkbox/dynamic-foundation-checkbox.component';
import { NgClass, NgFor, NgTemplateOutlet, NgIf } from '@angular/common';

@Component({
    selector: 'dynamic-foundation-form-control',
    templateUrl: './dynamic-foundation-form-control-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgTemplateOutlet, NgFor]
})
export class DynamicFoundationFormControlContainerComponent extends DynamicFormControlContainerComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    protected componentService: DynamicFormComponentService;
    protected relationService: DynamicFormRelationService;

    @ContentChildren(DynamicTemplateDirective) contentTemplateList!: QueryList<DynamicTemplateDirective>;

    @HostBinding('class') klass?: string;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group!: UntypedFormGroup;
    @Input() hostClass?: string[];
    // TODO: Input alias 'templates' may be for backward compatibility - review if safe to remove
    // tslint:disable-next-line:no-input-rename
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('templates') inputTemplateList?: QueryList<DynamicTemplateDirective>;
    @Input() layout?: DynamicFormLayout;
    @Input() model!: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild('componentViewContainer', {read: ViewContainerRef, static: true}) componentViewContainerRef!: ViewContainerRef;

    /** Inserted by Angular inject() migration for backwards compatibility */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@angular-eslint/prefer-inject
    constructor(...args: unknown[]);
    // TODO: Constructor uses inject() internally - prefer-inject warning can be ignored
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);
        const componentFactoryResolver = inject(ComponentFactoryResolver);
        const layoutService = inject(DynamicFormLayoutService);
        const validationService = inject(DynamicFormValidationService);
        const componentService = inject(DynamicFormComponentService);
        const relationService = inject(DynamicFormRelationService);

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService, componentService, relationService);
    
        this.changeDetectorRef = changeDetectorRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.layoutService = layoutService;
        this.validationService = validationService;
        this.componentService = componentService;
        this.relationService = relationService;
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) || foundationUIFormControlMapFn(this.model);
    }
}

export function foundationUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
    switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicFoundationFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicFoundationCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicFoundationFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicFoundationFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicFoundationInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicFoundationRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicFoundationSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicFoundationSwitchComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicFoundationTextAreaComponent;

        default:
            return null;
    }
}

@Component({
    selector: 'dynamic-foundation-form-array',
    templateUrl: './dynamic-foundation-form-array.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, NgTemplateOutlet, DynamicFoundationFormControlContainerComponent]
})
export class DynamicFoundationFormArrayComponent extends DynamicFormArrayComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormArrayModel;
    @Input() templates?: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicFoundationFormControlContainerComponent) components!: QueryList<DynamicFoundationFormControlContainerComponent>;

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

@Component({
    selector: 'dynamic-foundation-form-group',
    templateUrl: './dynamic-foundation-form-group.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, DynamicFoundationFormControlContainerComponent]
})
export class DynamicFoundationFormGroupComponent extends DynamicFormGroupComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormGroupModel;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicFoundationFormControlContainerComponent) components!: QueryList<DynamicFoundationFormControlContainerComponent>;

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
