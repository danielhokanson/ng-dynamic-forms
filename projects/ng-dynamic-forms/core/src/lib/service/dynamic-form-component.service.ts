import { ComponentRef, Injectable, InjectionToken, Type, inject } from '@angular/core';
import { DynamicFormControl } from '../component/dynamic-form-control-interface';
import { DynamicFormComponent } from '../component/dynamic-form.component';
import { DynamicFormControlModel } from '../model/dynamic-form-control.model';
import { isFunction, isNumber } from '../utils/core.utils';

export type DynamicFormControlRef = ComponentRef<DynamicFormControl>;
export type DynamicFormControlMapFn = (model: DynamicFormControlModel) => Type<DynamicFormControl> | null;

export const DYNAMIC_FORM_CONTROL_MAP_FN = new InjectionToken<DynamicFormControlMapFn>('DYNAMIC_FORM_CONTROL_MAP_FN');

@Injectable({
    providedIn: 'root'
})
export class DynamicFormComponentService {
    private readonly dynamicFormControlMapFn = inject(DYNAMIC_FORM_CONTROL_MAP_FN, { optional: true });

    private forms: DynamicFormComponent[] = [];
    private formControls: { [key: string]: DynamicFormControlRef | DynamicFormControlRef[] } = {};

    /** Inserted by Angular inject() migration for backwards compatibility */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@angular-eslint/prefer-inject
    constructor(...args: unknown[]);

    // TODO: Constructor uses inject() internally - prefer-inject warning can be ignored
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor() {
    }

    getForms(): IterableIterator<DynamicFormComponent> {
        return this.forms.values();
    }

    registerForm(component: DynamicFormComponent): void {
        this.forms.push(component);
    }

    unregisterForm(component: DynamicFormComponent): void {
        const indexOf = this.forms.indexOf(component);

        if (indexOf !== -1) {
            this.forms.splice(indexOf, 1);
        }
    }

    getFormControlRef(modelId: string, index?: number): DynamicFormControlRef | undefined {
        const ref: DynamicFormControlRef | DynamicFormControlRef[] = this.formControls[modelId];

        if (isNumber(index)) {
            return Array.isArray(ref) ? ref[index] : undefined;

        } else {
            return ref as DynamicFormControlRef;
        }
    }

    registerFormControl(model: DynamicFormControlModel, ref: DynamicFormControlRef, index?: number): void {
        if (isNumber(index)) { // threat model as array child
            const arrayRef: DynamicFormControlRef[] = this.formControls[model.id] as DynamicFormControlRef[] || [];

            if (Array.isArray(arrayRef)) {
                arrayRef.splice(index, 0, ref);
                this.formControls[model.id] = arrayRef;

            } else {
                // eslint-disable-next-line no-console
                console.warn(`registerFormControlRef is called with index for a non-array form control: ${model.id}`);
            }

        } else {
            this.formControls[model.id] = ref;
        }
    }

    unregisterFormControl(modelId: string, index?: number): void {
        const componentRef = this.formControls[modelId];

        if (isNumber(index)) {
            if (Array.isArray(componentRef) && componentRef[index] !== undefined) {
                componentRef.splice(index, 1);
            }

        } else if (componentRef !== undefined) {
            delete this.formControls[modelId];
        }
    }

    getCustomComponentType(model: DynamicFormControlModel): Type<DynamicFormControl> | null {
        return isFunction(this.dynamicFormControlMapFn) ? this.dynamicFormControlMapFn(model) : null;
    }
}
