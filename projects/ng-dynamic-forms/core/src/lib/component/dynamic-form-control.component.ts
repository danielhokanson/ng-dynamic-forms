import { EventEmitter, inject } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormControl } from './dynamic-form-control-interface';
import { DynamicFormControlCustomEvent } from './dynamic-form-control-event';
import { DynamicFormControlModel } from '../model/dynamic-form-control.model';
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from '../model/misc/dynamic-form-control-layout.model';
import { DynamicFormValidationService } from '../service/dynamic-form-validation.service';
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormControlTemplates
} from '../service/dynamic-form-layout.service';
import { isString } from '../utils/core.utils';

export abstract class DynamicFormControlComponent implements DynamicFormControl {
    formLayout?: DynamicFormLayout;
    group!: UntypedFormGroup;
    layout?: DynamicFormControlLayout;
    model!: DynamicFormControlModel;
    templates?: DynamicFormControlTemplates;

    blur!: EventEmitter<any>;
    change!: EventEmitter<any>;
    customEvent?: EventEmitter<DynamicFormControlCustomEvent>;
    focus!: EventEmitter<any>;

    private _hasFocus = false;

    protected layoutService: DynamicFormLayoutService;
    protected validationService: DynamicFormValidationService;

    /**
     * All dependencies are resolved via inject() when not passed explicitly, so subclasses
     * no longer need to declare a constructor. Passing them through super(...) remains
     * supported for backward compatibility with existing custom UI stacks.
     */
    protected constructor(layoutService?: DynamicFormLayoutService,
                          validationService?: DynamicFormValidationService) {
        this.layoutService = layoutService ?? inject(DynamicFormLayoutService);
        this.validationService = validationService ?? inject(DynamicFormValidationService);
    }

    get control(): AbstractControl | never {
        if (!this.group || !this.model) {
            throw new Error('Form group and model must be initialized before accessing control');
        }
        const control = this.group.get(this.model.id);

        if (control === null) {
            throw new Error(`form group does not contain an abstract control with id ${this.model.id}`);
        }

        return control;
    }

    get id(): string {
        if (!this.model) {
            return '';
        }
        return this.layoutService.getElementId(this.model);
    }

    get hasFocus(): boolean {
        return this._hasFocus;
    }

    get isInvalid(): boolean {
        try {
            return this.control ? this.control.invalid : false;
        } catch {
            return false;
        }
    }

    get isValid(): boolean {
        try {
            return this.control ? this.control.valid : false;
        } catch {
            return false;
        }
    }

    get errorMessages(): string[] {
        try {
            if (!this.model || !this.control) {
                return [];
            }
            return this.validationService.createErrorMessages(this.control, this.model);
        } catch {
            return [];
        }
    }

    get showErrorMessages(): boolean {
        try {
            if (!this.model || !this.control) {
                return false;
            }
            return this.validationService.showErrorMessages(this.control, this.model, this.hasFocus);
        } catch {
            return false;
        }
    }

    getClass(context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace,
             model: DynamicFormControlModel = this.model): string {
        const controlLayout = model === this.model ? this.layout :
            this.layoutService.findByModel(model, this.formLayout) ?? model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    onBlur($event: any) {
        if ($event instanceof Event) {
            $event.stopPropagation();
        }

        this._hasFocus = false;
        this.blur.emit($event);
    }

    onChange($event: any) {
        if ($event instanceof Event) {
            $event.stopPropagation();
        }

        this.change.emit($event);
    }

    onCustomEvent($event: any, type: string | null = null, bypass: boolean = false) {
        if (bypass) {
            this.customEvent?.emit($event);

        } else if (isString(type)) {
            this.customEvent?.emit({customEvent: $event, customEventType: type});
        }
    }

    onFocus($event: any) {
        if ($event instanceof Event) {
            $event.stopPropagation();
        }

        this._hasFocus = true;
        this.focus.emit($event);
    }
}
