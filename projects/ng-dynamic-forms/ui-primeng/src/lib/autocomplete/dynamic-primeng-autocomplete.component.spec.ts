import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { AutoComplete } from "primeng/autocomplete";
import { DynamicFormService, DynamicInputModel } from "@danielhokanson/ng-dynamic-forms-core";
import { DynamicPrimeNGAutoCompleteComponent } from "./dynamic-primeng-autocomplete.component";

describe("DynamicPrimeNGAutoCompleteComponent test suite", () => {
    const testModel = new DynamicInputModel({id: "input", list: ["One", "Two", "Three"]});
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicPrimeNGAutoCompleteComponent>;
    let component: DynamicPrimeNGAutoCompleteComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicPrimeNGAutoCompleteComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicPrimeNGAutoCompleteComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`p-autoComplete[ng-reflect-id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicInputModel).toBe(true);
        expect(component.pAutoComplete instanceof AutoComplete).toBe(true);
        expect(component.viewChild instanceof AutoComplete).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.customEvent).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onBlur).toBeDefined();
        expect(component.onChange).toBeDefined();
        expect(component.onFocus).toBeDefined();

        expect(component.hasFocus).toBe(false);
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);
    });

    it("should have an p-autoComplete element", () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should emit blur event", () => {
        spyOn(component.blur, "emit");

        component.onBlur(null);

        expect(component.blur.emit).toHaveBeenCalled();
    });

    it("should emit change event", () => {
        spyOn(component.change, "emit");

        component.onChange(null);

        expect(component.change.emit).toHaveBeenCalled();
    });

    it("should emit focus event", () => {
        spyOn(component.focus, "emit");

        component.onFocus(null);

        expect(component.focus.emit).toHaveBeenCalled();
    });

    it("should emit custom event", () => {
        spyOn(component.customEvent, "emit");

        component.onCustomEvent(null, "eventType");

        expect(component.customEvent.emit).toHaveBeenCalled();
    });
});
