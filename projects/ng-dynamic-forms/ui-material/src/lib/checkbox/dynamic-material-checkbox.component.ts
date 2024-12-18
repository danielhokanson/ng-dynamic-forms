import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
import {
    DynamicCheckboxModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from "@danielhokanson/ng-dynamic-forms-core";
import { NgClass } from "@angular/common";

@Component({
    selector: "dynamic-material-checkbox",
    templateUrl: "./dynamic-material-checkbox.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, MatCheckboxModule, NgClass]
})
export class DynamicMaterialCheckboxComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicCheckboxModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matCheckbox", {static: true}) matCheckbox!: MatCheckbox;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) @Optional() public RIPPLE_OPTIONS: RippleGlobalOptions) {
        super(layoutService, validationService);
    }
}
