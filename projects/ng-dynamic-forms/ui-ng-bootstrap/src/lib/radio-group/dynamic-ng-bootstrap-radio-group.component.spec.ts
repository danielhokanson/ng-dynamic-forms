import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormService, DynamicRadioGroupModel } from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicNGBootstrapRadioGroupComponent } from './dynamic-ng-bootstrap-radio-group.component';

describe('DynamicNGBootstrapRadioGroupComponent test suite', () => {
    const testModel = new DynamicRadioGroupModel({
        id: 'radioGroup',
        options: [{value: 'One'}, {value: 'Two'}],
        value: 'One'
    });
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicNGBootstrapRadioGroupComponent>;
    let component: DynamicNGBootstrapRadioGroupComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicNGBootstrapRadioGroupComponent]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicNGBootstrapRadioGroupComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;

            // Initialize group and model before any change detection
            component.group = formGroup;
            component.model = testModel;

            fixture.detectChanges();

            testElement = debugElement.query(By.css(`div[id="${testModel.id}"]`));
        });
    }));

    it('should initialize correctly', () => {
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicRadioGroupModel).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.hasFocus).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);
    });

    it('should have a radio group element', () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it('should render a radio input for every option', () => {
        const radioInputs = debugElement.queryAll(By.css('input[type="radio"]'));

        expect(radioInputs.length).toBe(2);
    });

    it('should listen to and emit blur event', () => {
        const radioInput = debugElement.query(By.css('input[type="radio"]'));

        spyOn(component.blur, 'emit');

        component.onBlur(null);
        radioInput.triggerEventHandler('blur', null);

        expect(component.blur.emit).toHaveBeenCalledTimes(2);
    });

    it('should emit change event', () => {
        spyOn(component.change, 'emit');

        component.onChange(null);

        expect(component.change.emit).toHaveBeenCalled();
    });

    it('should listen to and emit focus event', () => {
        const radioInput = debugElement.query(By.css('input[type="radio"]'));

        spyOn(component.focus, 'emit');

        component.onFocus(null);
        radioInput.triggerEventHandler('focus', null);

        expect(component.focus.emit).toHaveBeenCalledTimes(2);
    });
});
