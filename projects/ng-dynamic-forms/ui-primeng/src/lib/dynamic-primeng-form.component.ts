import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren
} from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormComponentService,
    DynamicFormControlEvent,
    DynamicFormLayout,
    DynamicFormModel,
    DynamicTemplateDirective
} from "@danielhokanson/ng-dynamic-forms-core";
import { DynamicPrimeNGFormControlContainerComponent } from "./dynamic-primeng-form-control-container.component";
import { NgFor } from "@angular/common";

@Component({
    selector: "dynamic-primeng-form",
    templateUrl: "./dynamic-primeng-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, DynamicPrimeNGFormControlContainerComponent]
})
export class DynamicPrimeNGFormComponent extends DynamicFormComponent {
    @Input() group!: UntypedFormGroup;
    @Input() model!: DynamicFormModel;
    @Input() layout?: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @Output() pEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates!: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicPrimeNGFormControlContainerComponent) components!: QueryList<DynamicPrimeNGFormControlContainerComponent>;

    constructor(protected changeDetectorRef: ChangeDetectorRef, protected componentService: DynamicFormComponentService) {
        super(changeDetectorRef, componentService);
    }
}
