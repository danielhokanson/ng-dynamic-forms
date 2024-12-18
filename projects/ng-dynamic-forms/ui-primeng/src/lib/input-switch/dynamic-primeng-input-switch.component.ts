import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputSwitch, InputSwitchModule } from "primeng/inputswitch";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicSwitchModel,
    DynamicFormControlLayout
} from "@danielhokanson/ng-dynamic-forms-core";
import { NgClass } from "@angular/common";

@Component({
    selector: "dynamic-primeng-input-switch",
    templateUrl: "./dynamic-primeng-input-switch.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, InputSwitchModule]
})
export class DynamicPrimeNGInputSwitchComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSwitchModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pInputSwitch", {static: true}) pInputSwitch!: InputSwitch;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
