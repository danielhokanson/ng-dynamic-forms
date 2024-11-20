import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerDirective, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from "@danielhokanson/ng-dynamic-forms-core";
import { NgClass, NgIf } from "@angular/common";

@Component({
    selector: "dynamic-ngx-bootstrap-datepicker",
    templateUrl: "./dynamic-ngx-bootstrap-datepicker.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, BsDatepickerModule, NgClass, NgIf]
})
export class DynamicNGxBootstrapDatePickerComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(BsDatepickerDirective, {static: true}) bsDatePicker!: BsDatepickerDirective;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
