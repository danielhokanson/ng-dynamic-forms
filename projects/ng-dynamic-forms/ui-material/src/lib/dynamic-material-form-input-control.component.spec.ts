import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatInput } from '@angular/material/input';
import { DynamicFormService, DynamicInputModel } from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicMaterialFormInputControlComponent } from './dynamic-material-form-input-control.component';
import { DynamicMaterialInputComponent } from './input/dynamic-material-input.component';

describe('DynamicMaterialFormInputControlComponent test suite', () => {
    const testModel = new DynamicInputModel({ id: 'input', maxLength: 10 });
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicMaterialInputComponent>;
    let component: DynamicMaterialInputComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicMaterialInputComponent]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicMaterialInputComponent);

            component = fixture.componentInstance;

            component.group = formGroup;
            component.model = testModel;

            fixture.detectChanges();
        });
    }));

    it('should extend the abstract input control base class', () => {
        expect(component instanceof DynamicMaterialFormInputControlComponent).toBe(true);
        expect(component.matInput instanceof MatInput).toBe(true);
    });

    it('should return the character count of the current input value', () => {
        expect(component.characterCount).toBe(0);

        setInputValue('test');

        expect(component.characterCount).toBe(4);
    });

    it('should derive a character hint from the character count and the model max length', () => {
        setInputValue('test');

        expect(component.characterHint).toEqual('4 / 10');
    });

    it('should only show a character hint when a max length is set and characters are present', () => {
        expect(component.showCharacterHint).toBe(false);

        setInputValue('test');

        expect(component.showCharacterHint).toBe(true);
    });

    function setInputValue(value: string): void {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

        inputElement.value = value;
        inputElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
    }
});
