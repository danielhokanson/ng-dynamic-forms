import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BsDatepickerDirective, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { DynamicDatePickerModel, DynamicFormService } from "@danielhokanson/ng-dynamic-forms-core";
import { DynamicBootstrapDatePickerComponent } from "./dynamic-bootstrap-datepicker.component";

describe("DynamicBootstrapDatePickerComponent test suite", () => {
    const testModel = new DynamicDatePickerModel({id: "datepicker"});
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicBootstrapDatePickerComponent>;
    let component: DynamicBootstrapDatePickerComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BsDatepickerModule.forRoot(), DynamicBootstrapDatePickerComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicBootstrapDatePickerComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id="${testModel.id}"]`));
    }));

    it("should initialize correctly", () => {
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicDatePickerModel).toBe(true);
        expect(component.bsDatePicker instanceof BsDatepickerDirective).toBe(true);

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

    it("should have an input element", () => {
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
});
