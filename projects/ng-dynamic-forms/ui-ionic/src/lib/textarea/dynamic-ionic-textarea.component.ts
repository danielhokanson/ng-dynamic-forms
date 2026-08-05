import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonTextarea, IonicModule } from '@ionic/angular';
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicTextAreaModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'dynamic-ionic-textarea',
    templateUrl: './dynamic-ionic-textarea.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule, ReactiveFormsModule, NgClass]
})
export class DynamicIonicTextAreaComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicTextAreaModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('ionTextArea', {static: true}) ionTextArea!: IonTextarea;

    constructor() {
        super();
    }
}
