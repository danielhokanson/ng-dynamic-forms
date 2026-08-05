import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicInputModel,
    DynamicFormsCoreModule
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgxMaskDirective } from 'ngx-mask';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-ng-bootstrap-input',
    templateUrl: './dynamic-ng-bootstrap-input.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [ReactiveFormsModule, DynamicFormsCoreModule, NgClass, NgxMaskDirective, AsyncPipe]
})
export class DynamicNGBootstrapInputComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    // An explicit public constructor is required: the abstract base classes of
    // @danielhokanson/ng-dynamic-forms-core resolve all dependencies via inject()
    // but declare their constructors as protected.
    constructor() {
        super();
    }
}
