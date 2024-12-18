import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    Type,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
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
    DynamicFormArrayComponent,
    DynamicFormArrayGroupModel,
    DynamicFormArrayModel,
    DynamicFormComponentService,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlEvent,
    DynamicFormControlLayout,
    DynamicFormControlModel,
    DynamicFormGroupComponent,
    DynamicFormGroupModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormRelationService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@danielhokanson/ng-dynamic-forms-core";
import { DynamicNGxBootstrapCheckboxComponent } from "./checkbox/dynamic-ngx-bootstrap-checkbox.component";
import { DynamicNGxBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ngx-bootstrap-checkbox-group.component";
import { DynamicNGxBootstrapDatePickerComponent } from "./datepicker/dynamic-ngx-bootstrap-datepicker.component";
import { DynamicNGxBootstrapInputComponent } from "./input/dynamic-ngx-bootstrap-input.component";
import { DynamicNGxBootstrapRadioGroupComponent } from "./radio-group/dynamic-ngx-bootstrap-radio-group.component";
import { DynamicNGxBootstrapRatingComponent } from "./rating/dynamic-ngx-bootstrap-rating.component";
import { DynamicNGxBootstrapSelectComponent } from "./select/dynamic-ngx-bootstrap-select.component";
import { DynamicNGxBootstrapTextAreaComponent } from "./textarea/dynamic-ngx-bootstrap-textarea.component";
import { DynamicNGxBootstrapTimePickerComponent } from "./timepicker/dynamic-ngx-bootstrap-timepicker.component";
import { NgClass, NgFor, NgTemplateOutlet, NgIf } from "@angular/common";

@Component({
    selector: "dynamic-ngx-bootstrap-form-control",
    templateUrl: "./dynamic-ngx-bootstrap-form-control-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgTemplateOutlet, NgFor]
})
export class DynamicNGxBootstrapFormControlContainerComponent extends DynamicFormControlContainerComponent {
    @ContentChildren(DynamicTemplateDirective) contentTemplateList?: QueryList<DynamicTemplateDirective>;

    @HostBinding("class") klass?: string;

    @Input() asBootstrapFormGroup = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group!: UntypedFormGroup;
    @Input() hostClass?: string[];
    // tslint:disable-next-line:no-input-rename
    @Input("templates") inputTemplateList?: QueryList<DynamicTemplateDirective>;
    @Input() layout?: DynamicFormLayout;
    @Input() model!: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    // tslint:disable-next-line:no-output-rename
    @Output("bsEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef, static: true}) componentViewContainerRef!: ViewContainerRef;

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) ?? bootstrapUIFormControlMapFn(this.model);
    }

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                protected componentService: DynamicFormComponentService,
                protected relationService: DynamicFormRelationService) {
        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService, componentService, relationService);
    }
}

export function bootstrapUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
    switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicNGxBootstrapFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicNGxBootstrapCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicNGxBootstrapCheckboxGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicNGxBootstrapDatePickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicNGxBootstrapFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicNGxBootstrapInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicNGxBootstrapRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return DynamicNGxBootstrapRatingComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicNGxBootstrapSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicNGxBootstrapTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicNGxBootstrapTimePickerComponent;

        default:
            return null;
    }
}

@Component({
    selector: "dynamic-ngx-bootstrap-form-array",
    templateUrl: "./dynamic-ngx-bootstrap-form-array.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, NgTemplateOutlet, DynamicNGxBootstrapFormControlContainerComponent]
})
export class DynamicNGxBootstrapFormArrayComponent extends DynamicFormArrayComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormArrayModel;
    @Input() templates?: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicNGxBootstrapFormControlContainerComponent)
    components!: QueryList<DynamicNGxBootstrapFormControlContainerComponent>;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}

@Component({
    selector: "dynamic-ngx-bootstrap-form-group",
    templateUrl: "./dynamic-ngx-bootstrap-form-group.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, DynamicNGxBootstrapFormControlContainerComponent]
})
export class DynamicNGxBootstrapFormGroupComponent extends DynamicFormGroupComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormGroupModel;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicNGxBootstrapFormControlContainerComponent)
    components!: QueryList<DynamicNGxBootstrapFormControlContainerComponent>;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
