import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { provideNgxMask } from "ngx-mask";
import {
    DynamicFormService,
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicColorPickerModel,
    DynamicDatePickerModel,
    DynamicEditorModel,
    DynamicFileUploadModel,
    DynamicFormArrayModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@danielhokanson/ng-dynamic-forms-core";
import {
    DynamicFoundationFormArrayComponent,
    DynamicFoundationFormControlContainerComponent,
    DynamicFoundationFormGroupComponent,
    foundationUIFormControlMapFn
} from "./dynamic-foundation-form-control-container.component";
import { DynamicFoundationCheckboxComponent } from "./checkbox/dynamic-foundation-checkbox.component";
import { DynamicFoundationInputComponent } from "./input/dynamic-foundation-input.component";
import { DynamicFoundationRadioGroupComponent } from "./radio-group/dynamic-foundation-radio-group.component";
import { DynamicFoundationSelectComponent } from "./select/dynamic-foundation-select.component";
import { DynamicFoundationSwitchComponent } from "./switch/dynamic-foundation-switch.component";
import { DynamicFoundationTextAreaComponent } from "./textarea/dynamic-foundation-textarea.component";

describe("DynamicFoundationFormControlContainerComponent test suite", () => {
    const inputModel = new DynamicInputModel({id: "input", maxLength: 51});
    const formModel = [
        new DynamicCheckboxModel({id: "checkbox"}),
        new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
        new DynamicColorPickerModel({id: "colorpicker"}),
        new DynamicDatePickerModel({id: "datepicker"}),
        new DynamicEditorModel({id: "editor"}),
        new DynamicFileUploadModel({id: "upload", url: ""}),
        new DynamicFormArrayModel({id: "formArray", groupFactory: () => []}),
        new DynamicFormGroupModel({id: "formGroup", group: []}),
        inputModel,
        new DynamicRadioGroupModel({id: "radioGroup"}),
        new DynamicRatingModel({id: "rating"}),
        new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
        new DynamicSliderModel({id: "slider"}),
        new DynamicSwitchModel({id: "switch"}),
        new DynamicTextAreaModel({id: "textarea"}),
        new DynamicTimePickerModel({id: "timepicker"})
    ];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicFoundationFormControlContainerComponent>;
    let component: DynamicFoundationFormControlContainerComponent;
    let debugElement: DebugElement;
    let testElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicFoundationFormControlContainerComponent, DynamicFoundationInputComponent],
            providers: [provideNgxMask()]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DynamicFoundationFormControlContainerComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = inputModel;

        component.ngOnChanges({
            group: new SimpleChange(null, component.group, true),
            model: new SimpleChange(null, component.model, true)
        });

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${inputModel.id}']`));
    }));

    it("should initialize correctly", () => {
        expect(component.context).toBeNull();
        expect(component.control instanceof UntypedFormControl).toBe(true);
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model instanceof DynamicFormControlModel).toBe(true);

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.componentType).toBe(DynamicFoundationInputComponent);
    });

    it("should have an input element", () => {
        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should listen to native blur events", () => {
        spyOn(component, "onBlur");

        testElement.triggerEventHandler("blur", null);

        expect(component.onBlur).toHaveBeenCalled();
    });

    it("should listen to native focus events", () => {
        spyOn(component, "onFocus");

        testElement.triggerEventHandler("focus", null);

        expect(component.onFocus).toHaveBeenCalled();
    });

    it("should listen to native change event", () => {
        spyOn(component, "onChange");

        testElement.triggerEventHandler("change", null);

        expect(component.onChange).toHaveBeenCalled();
    });

    it("should update model value when control value changes", () => {
        spyOn(component, "onControlValueChanges");

        component.control.setValue("test");

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {
        spyOn(component, "onModelValueUpdates");

        inputModel.value = "test";

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {
        spyOn(component, "onModelDisabledUpdates");

        inputModel.disabled = true;

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should map a form control model to a form control component", () => {
        expect(foundationUIFormControlMapFn(formModel[0])).toBe(DynamicFoundationCheckboxComponent);
        expect(foundationUIFormControlMapFn(formModel[1])).toBe(DynamicFoundationFormGroupComponent);
        expect(foundationUIFormControlMapFn(formModel[2])).toBeNull();
        expect(foundationUIFormControlMapFn(formModel[3])).toBeNull();
        expect(foundationUIFormControlMapFn(formModel[4])).toBeNull();
        expect(foundationUIFormControlMapFn(formModel[5])).toBeNull();
        expect(foundationUIFormControlMapFn(formModel[6])).toBe(DynamicFoundationFormArrayComponent);
        expect(foundationUIFormControlMapFn(formModel[7])).toBe(DynamicFoundationFormGroupComponent);
        expect(foundationUIFormControlMapFn(formModel[8])).toBe(DynamicFoundationInputComponent);
        expect(foundationUIFormControlMapFn(formModel[9])).toBe(DynamicFoundationRadioGroupComponent);
        expect(foundationUIFormControlMapFn(formModel[10])).toBeNull();
        expect(foundationUIFormControlMapFn(formModel[11])).toBe(DynamicFoundationSelectComponent);
        expect(foundationUIFormControlMapFn(formModel[12])).toBeNull();
        expect(foundationUIFormControlMapFn(formModel[13])).toBe(DynamicFoundationSwitchComponent);
        expect(foundationUIFormControlMapFn(formModel[14])).toBe(DynamicFoundationTextAreaComponent);
        expect(foundationUIFormControlMapFn(formModel[15])).toBeNull();
    });
});
