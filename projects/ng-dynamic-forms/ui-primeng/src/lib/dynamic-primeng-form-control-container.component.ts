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
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_RATING,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
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
    DynamicInputModel,
    DynamicSelectModel,
    DynamicTemplateDirective
} from "@danielhokanson/ng-dynamic-forms-core";
import { DynamicPrimeNGCheckboxComponent } from "./checkbox/dynamic-primeng-checkbox.component";
import { DynamicPrimeNGColorPickerComponent } from "./colorpicker/dynamic-primeng-colorpicker.component";
import { DynamicPrimeNGCalendarComponent } from "./calendar/dynamic-primeng-calendar.component";
import { DynamicPrimeNGEditorComponent } from "./editor/dynamic-primeng-editor.component";
import { DynamicPrimeNGSpinnerComponent } from "./spinner/dynamic-primeng-spinner.component";
import { DynamicPrimeNGInputMaskComponent } from "./input-mask/dynamic-primeng-input-mask.component";
import { DynamicPrimeNGAutoCompleteComponent } from "./autocomplete/dynamic-primeng-autocomplete.component";
import { DynamicPrimeNGChipsComponent } from "./chips/dynamic-primeng-chips.component";
import { DynamicPrimeNGInputComponent } from "./input/dynamic-primeng-input.component";
import { DynamicPrimeNGRadioGroupComponent } from "./radio-group/dynamic-primeng-radio-group.component";
import { DynamicPrimeNGRatingComponent } from "./rating/dynamic-primeng-rating.component";
import { DynamicPrimeNGMultiSelectComponent } from "./multiselect/dynamic-primeng-multiselect.component";
import { DynamicPrimeNGDropdownComponent } from "./dropdown/dynamic-primeng-dropdown.component";
import { DynamicPrimeNGSliderComponent } from "./slider/dynamic-primeng-slider.component";
import { DynamicPrimeNGInputSwitchComponent } from "./input-switch/dynamic-primeng-input-switch.component";
import { DynamicPrimeNGTextAreaComponent } from "./textarea/dynamic-primeng-textarea.component";
import { NgClass, NgFor, NgTemplateOutlet, NgIf } from "@angular/common";

@Component({
    selector: "dynamic-primeng-form-control",
    templateUrl: "./dynamic-primeng-form-control-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgTemplateOutlet, NgFor]
})
export class DynamicPrimeNGFormControlContainerComponent extends DynamicFormControlContainerComponent {
    @ContentChildren(DynamicTemplateDirective) contentTemplateList!: QueryList<DynamicTemplateDirective>;

    @HostBinding("class") klass?: string;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group!: UntypedFormGroup;
    @Input() hostClass!: string[];
    // tslint:disable-next-line:no-input-rename
    @Input("templates") inputTemplateList?: QueryList<DynamicTemplateDirective>;
    @Input() layout?: DynamicFormLayout;
    @Input() model!: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    // tslint:disable-next-line:no-output-rename
    @Output("pEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef, static: true}) componentViewContainerRef!: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                protected componentService: DynamicFormComponentService,
                protected relationService: DynamicFormRelationService) {
        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService, componentService, relationService);
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) ?? primeNGUIFormControlMapFn(this.model);
    }
}

export function primeNGUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
    switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicPrimeNGFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicPrimeNGCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicPrimeNGFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER:
            return DynamicPrimeNGColorPickerComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicPrimeNGCalendarComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
            return DynamicPrimeNGEditorComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicPrimeNGFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            const inputModel = model as DynamicInputModel;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return DynamicPrimeNGSpinnerComponent;

            } else if (inputModel.mask) {
                return DynamicPrimeNGInputMaskComponent;

            } else if (Array.isArray(inputModel.list)) {
                return DynamicPrimeNGAutoCompleteComponent;

            } else if (inputModel.multiple) {
                return DynamicPrimeNGChipsComponent;

            } else {
                return DynamicPrimeNGInputComponent;
            }

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicPrimeNGRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
            return DynamicPrimeNGRatingComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            const selectModel = model as DynamicSelectModel<string>;
            return selectModel.multiple ? DynamicPrimeNGMultiSelectComponent : DynamicPrimeNGDropdownComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return DynamicPrimeNGSliderComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicPrimeNGInputSwitchComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicPrimeNGTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicPrimeNGCalendarComponent;

        default:
            return null;
    }
}

@Component({
    selector: "dynamic-primeng-form-array",
    templateUrl: "./dynamic-primeng-form-array.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, NgTemplateOutlet, DynamicPrimeNGFormControlContainerComponent]
})
export class DynamicPrimeNGFormArrayComponent extends DynamicFormArrayComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormArrayModel;
    @Input() templates?: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicPrimeNGFormControlContainerComponent) components!: QueryList<DynamicPrimeNGFormControlContainerComponent>;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}

@Component({
    selector: "dynamic-primeng-form-group",
    templateUrl: "./dynamic-primeng-form-group.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, DynamicPrimeNGFormControlContainerComponent]
})
export class DynamicPrimeNGFormGroupComponent extends DynamicFormGroupComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormGroupModel;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicPrimeNGFormControlContainerComponent) components!: QueryList<DynamicPrimeNGFormControlContainerComponent>;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
