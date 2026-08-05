import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonRadioGroup, IonicModule } from '@ionic/angular';
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormControlComponent,
    DynamicRadioGroupModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'dynamic-ionic-radio-group',
    templateUrl: './dynamic-ionic-radio-group.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, IonicModule, NgClass, AsyncPipe]
})
export class DynamicIonicRadioGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild('ionRadioGroup', {static: true}) ionRadioGroup!: IonRadioGroup;

    constructor() {
        super();
    }
}
