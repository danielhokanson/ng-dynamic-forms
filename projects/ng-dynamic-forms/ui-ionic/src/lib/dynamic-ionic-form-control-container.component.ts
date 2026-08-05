import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, Input, Output, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicFormArrayGroupModel,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicTemplateDirective,
    DynamicFormArrayComponent,
    DynamicFormControlLayout,
    DynamicFormArrayModel,
    DynamicFormControlCustomEvent,
    DynamicFormGroupComponent,
    DynamicFormGroupModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicIonicCheckboxComponent } from './checkbox/dynamic-ionic-checkbox.component';
import { DynamicIonicDateTimeComponent } from './datetime/dynamic-ionic-datetime.component';
import { DynamicIonicInputComponent } from './input/dynamic-ionic-input.component';
import { DynamicIonicRadioGroupComponent } from './radio-group/dynamic-ionic-radio-group.component';
import { DynamicIonicRangeComponent } from './range/dynamic-ionic-range.component';
import { DynamicIonicSelectComponent } from './select/dynamic-ionic-select.component';
import { DynamicIonicToggleComponent } from './toggle/dynamic-ionic-toggle.component';
import { DynamicIonicTextAreaComponent } from './textarea/dynamic-ionic-textarea.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'dynamic-ionic-form-control',
    templateUrl: './dynamic-ionic-form-control-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgTemplateOutlet]
})
export class DynamicIonicFormControlContainerComponent extends DynamicFormControlContainerComponent {
    @ContentChildren(DynamicTemplateDirective) contentTemplateList!: QueryList<DynamicTemplateDirective>;

    @HostBinding('class') klass?: string;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group!: UntypedFormGroup;
    @Input() hostClass?: string[];
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('templates') inputTemplateList?: QueryList<DynamicTemplateDirective>;
    @Input() layout?: DynamicFormLayout;
    @Input() model!: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output('ionEvent') customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild('componentViewContainer', {read: ViewContainerRef, static: true}) componentViewContainerRef!: ViewContainerRef;

    constructor() {
        super();
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) || ionicUIFormControlMapFn(this.model);
    }
}

export function ionicUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
    switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicIonicFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicIonicCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicIonicFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicIonicDateTimeComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicIonicFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicIonicInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicIonicRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicIonicSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return DynamicIonicRangeComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicIonicToggleComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicIonicTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicIonicDateTimeComponent;

        default:
            return null;
    }
}

@Component({
    selector: 'dynamic-ionic-form-array',
    templateUrl: './dynamic-ionic-form-array.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, NgTemplateOutlet, DynamicIonicFormControlContainerComponent]
})
export class DynamicIonicFormArrayComponent extends DynamicFormArrayComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormArrayModel;
    @Input() templates?: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicIonicFormControlContainerComponent) components!: QueryList<DynamicIonicFormControlContainerComponent>;

    constructor() {
        super();
    }

    getGroup(index: number): UntypedFormGroup {
        return this.array.at(index) as UntypedFormGroup;
    }
}

@Component({
    selector: 'dynamic-ionic-form-group',
    templateUrl: './dynamic-ionic-form-group.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, NgClass, DynamicIonicFormControlContainerComponent]
})
export class DynamicIonicFormGroupComponent extends DynamicFormGroupComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicFormGroupModel;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(DynamicIonicFormControlContainerComponent) components!: QueryList<DynamicIonicFormControlContainerComponent>;

    constructor() {
        super();
    }

    get controlGroup(): UntypedFormGroup {
        return this.control as UntypedFormGroup;
    }

    get templateList(): QueryList<DynamicTemplateDirective> | undefined {
        return this.templates as QueryList<DynamicTemplateDirective> | undefined;
    }
}
