import {
    DynamicCheckboxModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { of } from 'rxjs';

export const BOOTSTRAP_SAMPLE_FORM_MODEL = [
    new DynamicFormGroupModel({
        id: 'bootstrapFormGroup1',
        legend: 'Form Group 1',
        group: [
            new DynamicInputModel({
                hint: 'Just a sample help text',
                id: 'bootstrapInput',
                label: 'Input',
                maxLength: 51,
                placeholder: 'Just some input'
            }),
            new DynamicSelectModel<string>({
                id: 'bootstrapSelect',
                label: 'Select',
                options: of([
                    {label: 'Option 1', value: 'option-1'},
                    {label: 'Option 2', value: 'option-2'},
                    {label: 'Option 3', value: 'option-3'}
                ]),
                value: 'option-2'
            }),
            new DynamicRadioGroupModel<string>({
                id: 'bootstrapRadioGroup',
                label: 'Radio Group',
                options: of([
                    {label: 'Option 1', value: 'option-1'},
                    {label: 'Option 2', value: 'option-2'},
                    {label: 'Option 3', value: 'option-3'}
                ]),
                value: 'option-1'
            })
        ]
    }),
    new DynamicFormGroupModel({
        id: 'bootstrapFormGroup2',
        legend: 'Form Group 2',
        group: [
            new DynamicTextAreaModel({
                id: 'bootstrapTextArea',
                label: 'Text Area',
                rows: 5,
                placeholder: 'My hint is to write something...'
            }),
            new DynamicCheckboxModel({
                id: 'bootstrapCheckbox',
                label: 'I do agree'
            })
        ]
    }),
    new DynamicFormArrayModel({
        id: 'bootstrapFormArray',
        initialCount: 2,
        groupFactory: () => {
            return [
                new DynamicInputModel({
                    id: 'bootstrapFormArrayInput',
                    placeholder: 'Form array input'
                })
            ];
        }
    })
];
