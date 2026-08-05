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
import { DynamicNGBootstrapFormComponent } from './dynamic-ng-bootstrap-form.component';

describe('DynamicNGBootstrapFormComponent test suite', () => {
    const checkboxModel = new DynamicCheckboxModel({id: 'checkbox'});
    const inputModel = new DynamicInputModel({id: 'input'});
    const formModel = [checkboxModel, inputModel];
    const testEvent = {} as DynamicFormControlEvent;

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicNGBootstrapFormComponent>;
    let component: DynamicNGBootstrapFormComponent;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicNGBootstrapFormComponent],
            providers: [provideNgxMask()]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicNGBootstrapFormComponent);

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
        expect(component.ngbEvent).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();
        expect(component.onCustomEvent).toBeDefined();
    });

    it('should render a form control container for every model', () => {
        const containerElements = debugElement.queryAll(By.css('dynamic-ng-bootstrap-form-control'));

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

    it('should re-emit custom events through the ngbEvent output', () => {
        spyOn(component.ngbEvent, 'emit');

        component.onCustomEvent(testEvent, component.ngbEvent);

        expect(component.ngbEvent.emit).toHaveBeenCalledWith(testEvent);
    });
});
