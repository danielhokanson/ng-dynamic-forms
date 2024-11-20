import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSelectModel
} from "@danielhokanson/ng-dynamic-forms-core";
import { NgClass, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-ngx-bootstrap-select",
    templateUrl: "./dynamic-ngx-bootstrap-select.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, AsyncPipe]
})
export class DynamicNGxBootstrapSelectComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
