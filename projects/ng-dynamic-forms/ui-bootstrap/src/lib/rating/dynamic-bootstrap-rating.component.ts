import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicRatingModel,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';

@Component({
    selector: 'dynamic-bootstrap-rating',
    templateUrl: './dynamic-bootstrap-rating.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, RatingModule, NgClass]
})
export class DynamicBootstrapRatingComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRatingModel;

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
