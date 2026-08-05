import { Component, EventEmitter, Input, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicSwitchModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-material-slide-toggle',
    templateUrl: './dynamic-material-slide-toggle.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatSlideToggleModule, NgClass]
})
export class DynamicMaterialSlideToggleComponent extends DynamicFormControlComponent {
    RIPPLE_OPTIONS = inject<RippleGlobalOptions>(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSwitchModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('matSlideToggle', {static: true}) matSlideToggle!: MatSlideToggle;

    constructor() {
        super();
    }

    get labelPosition(): 'before' | 'after' {
        return this.model.labelPosition === 'before' ? 'before' : 'after';
    }
}
