import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicRadioGroupModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, AsyncPipe } from '@angular/common';

/*
 * ng-bootstrap removed its buttons API (NgbButtonsModule with the ngbRadioGroup,
 * ngbButtonLabel and ngbButton directives) in version 12. Radio groups are therefore
 * rendered with plain Bootstrap 5 markup (btn-check inputs inside a btn-group),
 * mirroring the approach of the other Bootstrap-based UI stacks.
 */
@Component({
    selector: 'dynamic-ng-bootstrap-radio-group',
    templateUrl: './dynamic-ng-bootstrap-radio-group.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, AsyncPipe]
})
export class DynamicNGBootstrapRadioGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    // An explicit public constructor is required: the abstract base classes of
    // @danielhokanson/ng-dynamic-forms-core resolve all dependencies via inject()
    // but declare their constructors as protected.
    constructor() {
        super();
    }

    getRadioId(index: number): string {
        return `${this.id}-${index}`;
    }
}
