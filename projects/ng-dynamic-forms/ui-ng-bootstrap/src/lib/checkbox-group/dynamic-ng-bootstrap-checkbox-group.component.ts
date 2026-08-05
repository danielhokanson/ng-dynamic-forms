import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicCheckboxGroupModel,
    DynamicCheckboxModel,
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

/*
 * ng-bootstrap removed its buttons API (NgbButtonsModule with the ngbButtonLabel and
 * ngbButton directives) in version 12. Checkbox groups are therefore rendered with
 * plain Bootstrap 5 markup (btn-check inputs inside a btn-group), mirroring the
 * approach of the other Bootstrap-based UI stacks.
 */
@Component({
    selector: 'dynamic-ng-bootstrap-checkbox-group',
    templateUrl: './dynamic-ng-bootstrap-checkbox-group.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass]
})
export class DynamicNGBootstrapCheckboxGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicCheckboxGroupModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    // An explicit public constructor is required: the abstract base classes of
    // @danielhokanson/ng-dynamic-forms-core resolve all dependencies via inject()
    // but declare their constructors as protected.
    constructor() {
        super();
    }

    getCheckboxId(model: DynamicCheckboxModel): string {
        return this.layoutService.getElementId(model);
    }

    onCheckboxChange($event: Event, model: DynamicCheckboxModel): void {
        this.onChange($event);
        model.value = ($event.target as HTMLInputElement).checked;
    }
}
