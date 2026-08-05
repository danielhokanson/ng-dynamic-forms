import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';
import {
    DynamicCheckboxModel,
    DynamicFormControlEvent,
    DynamicFormService,
    DynamicInputModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicNGxBootstrapFormComponent } from './dynamic-ngx-bootstrap-form.component';

describe('DynamicNGxBootstrapFormComponent test suite', () => {
    const checkboxModel = new DynamicCheckboxModel({id: 'checkbox'});
    const inputModel = new DynamicInputModel({id: 'input'});
    const formModel = [checkboxModel, inputModel];
    const testEvent = {} as DynamicFormControlEvent;

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicNGxBootstrapFormComponent>;
    let component: DynamicNGxBootstrapFormComponent;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicNGxBootstrapFormComponent],
            providers: [provideNgxMask()]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicNGxBootstrapFormComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;

            // Initialize group and model before any change detection
            component.group = formGroup;
            component.model = formModel;

            fixture.detectChanges();
        });
    }));

    it('should initialize correctly', () => {
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(Array.isArray(component.model)).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();
        expect(component.bsEvent).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();
        expect(component.onCustomEvent).toBeDefined();
    });

    it('should render a form control container for every model', () => {
        const containerElements = debugElement.queryAll(By.css('dynamic-ngx-bootstrap-form-control'));

        expect(containerElements.length).toBe(formModel.length);
        expect(component.components.length).toBe(formModel.length);
    });

    it('should track form control models by id', () => {
        expect(component.trackByFn(0, checkboxModel)).toBe(checkboxModel.id);
        expect(component.trackByFn(1, inputModel)).toBe(inputModel.id);
    });

    it('should re-emit blur event', () => {
        spyOn(component.blur, 'emit');

        component.onBlur(testEvent);

        expect(component.blur.emit).toHaveBeenCalledWith(testEvent);
    });

    it('should re-emit change event', () => {
        spyOn(component.change, 'emit');

        component.onChange(testEvent);

        expect(component.change.emit).toHaveBeenCalledWith(testEvent);
    });

    it('should re-emit focus event', () => {
        spyOn(component.focus, 'emit');

        component.onFocus(testEvent);

        expect(component.focus.emit).toHaveBeenCalledWith(testEvent);
    });

    it('should re-emit custom events through the bsEvent output', () => {
        spyOn(component.bsEvent, 'emit');

        component.onCustomEvent(testEvent, component.bsEvent);

        expect(component.bsEvent.emit).toHaveBeenCalledWith(testEvent);
    });
});
