import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Rating, RatingModule } from 'primeng/rating';
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicRatingModel,
    DynamicFormControlLayout
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-primeng-rating',
    templateUrl: './dynamic-primeng-rating.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, RatingModule]
})
export class DynamicPrimeNGRatingComponent extends DynamicFormControlComponent {
    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRatingModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('pRating', {static: true}) pRating!: Rating;

    /** Inserted by Angular inject() migration for backwards compatibility */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@angular-eslint/prefer-inject
    constructor(...args: unknown[]);
    // TODO: Constructor uses inject() internally - prefer-inject warning can be ignored
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor() {
        const layoutService = inject(DynamicFormLayoutService);
        const validationService = inject(DynamicFormValidationService);

        super(layoutService, validationService);
    
        this.layoutService = layoutService;
        this.validationService = validationService;
    }
}
