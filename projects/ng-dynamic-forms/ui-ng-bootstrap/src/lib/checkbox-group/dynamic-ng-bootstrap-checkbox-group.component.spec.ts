import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicCheckboxGroupModel, DynamicCheckboxModel, DynamicFormService } from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicNGBootstrapCheckboxGroupComponent } from './dynamic-ng-bootstrap-checkbox-group.component';

describe('DynamicNGBootstrapCheckboxGroupComponent test suite', () => {
    const testModel = new DynamicCheckboxGroupModel({
        id: 'checkboxGroup',
        group: [new DynamicCheckboxModel({id: 'checkbox1'}), new DynamicCheckboxModel({id: 'checkbox2'})]
    });
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicNGBootstrapCheckboxGroupComponent>;
    let component: DynamicNGBootstrapCheckboxGroupComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicNGBootstrapCheckboxGroupComponent]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicNGBootstrapCheckboxGroupComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;

            // Initialize group and model before any change detection
            component.group = formGroup;
            component.model = testModel;

            fixture.detectChanges();

            testElement = debugElement.query(By.css('div.btn-group'));
        });
    }));

    it('should initialize correctly', () => {
        expect(component.control instanceof UntypedFormGroup).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicCheckboxGroupModel).toBe(true);

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

    it('should have a div.btn-group element', () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it('should render a checkbox input for every group member', () => {
        const checkboxInputs = debugElement.queryAll(By.css('input[type="checkbox"]'));

        expect(checkboxInputs.length).toBe(2);
    });

    it('should resolve a checkbox id via getCheckboxId', () => {
        const checkboxModel = testModel.group[0];

        expect(component.getCheckboxId(checkboxModel)).toEqual(jasmine.any(String));
    });

    it('should update the checkbox model value on onCheckboxChange', () => {
        const checkboxModel = testModel.group[0];
        const checkboxInput = debugElement.query(By.css(`input[id="${component.getCheckboxId(checkboxModel)}"]`));

        spyOn(component.change, 'emit');

        checkboxInput.nativeElement.checked = true;
        checkboxInput.triggerEventHandler('change', {target: checkboxInput.nativeElement});

        expect(component.change.emit).toHaveBeenCalled();
        expect(checkboxModel.value).toBe(true);
    });

    it('should listen to and emit blur event', () => {
        const checkboxInput = debugElement.query(By.css('input[type="checkbox"]'));

        spyOn(component.blur, 'emit');

        component.onBlur(null);
        checkboxInput.triggerEventHandler('blur', null);

        expect(component.blur.emit).toHaveBeenCalledTimes(2);
    });

    it('should listen to and emit focus event', () => {
        const checkboxInput = debugElement.query(By.css('input[type="checkbox"]'));

        spyOn(component.focus, 'emit');

        component.onFocus(null);
        checkboxInput.triggerEventHandler('focus', null);

        expect(component.focus.emit).toHaveBeenCalledTimes(2);
    });
});
