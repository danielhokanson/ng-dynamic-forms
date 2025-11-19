import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChildren, EventEmitter, HostBinding, Input, Output, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_RATING,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
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
import { DynamicBootstrapCheckboxComponent } from './checkbox/dynamic-bootstrap-checkbox.component';
import { DynamicBootstrapDatePickerComponent } from './datepicker/dynamic-bootstrap-datepicker.component';
import { DynamicBootstrapInputComponent } from './input/dynamic-bootstrap-input.component';
import { DynamicBootstrapRadioGroupComponent } from './radio-group/dynamic-bootstrap-radio-group.component';
import { DynamicBootstrapRatingComponent } from './rating/dynamic-bootstrap-rating.component';
import { DynamicBootstrapSelectComponent } from './select/dynamic-bootstrap-select.component';
import { DynamicBootstrapTextAreaComponent } from './textarea/dynamic-bootstrap-textarea.component';
import { DynamicBootstrapTimePickerComponent } from './timepicker/dynamic-bootstrap-timepicker.component';
import { NgClass, NgFor, NgTemplateOutlet, NgIf } from '@angular/common';

@Component({
    selector: 'dynamic-bootstrap-form-control',
    templateUrl: './dynamic-bootstrap-form-control-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgTemplateOutlet, NgFor]
})
export class DynamicBootstrapFormControlContainerComponent extends DynamicFormControlContainerComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;
    protected componentService: DynamicFormComponentService;
    protected relationService: DynamicFormRelationService;

    @ContentChildren(DynamicTemplateDirective) contentTemplateList!: QueryList<DynamicTemplateDirective>;

    @HostBinding('class') klass?: string;

    @Input() asBootstrapFormGroup = true;
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
    // TODO: Output alias 'bsEvent' may be for backward compatibility - review if safe to remove
    // tslint:disable-next-line:no-output-rename
    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output('bsEvent') customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild('componentViewContainer', {read: ViewContainerRef, static: true}) componentViewContainerRef!: ViewContainerRef;

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) || bootstrapUIFormControlMapFn(this.model);
    }

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
}

export function bootstrapUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
    switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicBootstrapFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicBootstrapCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicBootstrapFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicBootstrapDatePickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicBootstrapFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicBootstrapInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicBootstrapRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return DynamicBootstrapRatingComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicBootstrapSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicBootstrapTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicBootstrapTimePickerComponent;

        default:
            return null;
    }
}

@Component({
    selector: 'dynamic-bootstrap-form-array',
    templateUrl: './dynamic-bootstrap-form-array.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, NgTemplateOutlet, DynamicBootstrapFormControlContainerComponent]
})
export class DynamicBootstrapFormArrayComponent extends DynamicFormArrayComponent {
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

    @ViewChildren(DynamicBootstrapFormControlContainerComponent) components!: QueryList<DynamicBootstrapFormControlContainerComponent>;

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
    selector: 'dynamic-bootstrap-form-group',
    templateUrl: './dynamic-bootstrap-form-group.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, DynamicBootstrapFormControlContainerComponent]
})
export class DynamicBootstrapFormGroupComponent extends DynamicFormGroupComponent {
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

    @ViewChildren(DynamicBootstrapFormControlContainerComponent) components!: QueryList<DynamicBootstrapFormControlContainerComponent>;

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
