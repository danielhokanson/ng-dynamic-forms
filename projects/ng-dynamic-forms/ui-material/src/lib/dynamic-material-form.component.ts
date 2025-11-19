import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
    DynamicFormComponent,
    DynamicFormComponentService,
    DynamicFormControlEvent,
    DynamicFormLayout,
    DynamicFormModel,
    DynamicTemplateDirective
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicMaterialFormControlContainerComponent } from './dynamic-material-form-control-container.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'dynamic-material-form',
    templateUrl: './dynamic-material-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, DynamicMaterialFormControlContainerComponent]
})
export class DynamicMaterialFormComponent extends DynamicFormComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected componentService: DynamicFormComponentService;

    @Input() group!: UntypedFormGroup;
    @Input() model!: DynamicFormModel;
    @Input() layout?: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() matEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates!: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicMaterialFormControlContainerComponent) components!: QueryList<DynamicMaterialFormControlContainerComponent>;

    /** Inserted by Angular inject() migration for backwards compatibility */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@angular-eslint/prefer-inject
    constructor(...args: unknown[]);
    // TODO: Constructor uses inject() internally - prefer-inject warning can be ignored
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);
        const componentService = inject(DynamicFormComponentService);

        super(changeDetectorRef, componentService);
    
        this.changeDetectorRef = changeDetectorRef;
        this.componentService = componentService;
    }
}
