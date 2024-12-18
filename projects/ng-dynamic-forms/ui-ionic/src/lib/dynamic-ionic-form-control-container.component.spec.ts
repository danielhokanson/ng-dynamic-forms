// import { TestBed, inject, ComponentFixture, waitForAsync } from "@angular/core/testing";
// import { DebugElement } from "@angular/core";
// import { UntypedFormGroup } from "@angular/forms";
// import {
//     DynamicCheckboxModel,
//     DynamicCheckboxGroupModel,
//     DynamicColorPickerModel,
//     DynamicDatePickerModel,
//     DynamicEditorModel,
//     DynamicFileUploadModel,
//     DynamicFormArrayModel,
//     DynamicFormGroupModel,
//     DynamicInputModel,
//     DynamicRadioGroupModel,
//     DynamicRatingModel,
//     DynamicSelectModel,
//     DynamicSliderModel,
//     DynamicSwitchModel,
//     DynamicTextAreaModel,
//     DynamicTimePickerModel,
//     DynamicFormService
// } from "@danielhokanson/ng-dynamic-forms-core";
// import { DynamicIonicFormControlContainerComponent } from "./dynamic-ionic-form-control-container.component";
// import { DynamicIonicInputComponent } from "./input/dynamic-ionic-input.component";

// describe("DynamicIonicFormControlContainerComponent test suite", () => {
//     const inputModel = new DynamicInputModel({id: "input", maxLength: 51});
//     const formModel = [
//         new DynamicCheckboxModel({id: "checkbox"}),
//         new DynamicCheckboxGroupModel({id: "checkboxGroup", group: []}),
//         new DynamicColorPickerModel({id: "colorpicker"}),
//         new DynamicDatePickerModel({id: "datepicker"}),
//         new DynamicEditorModel({id: "editor"}),
//         new DynamicFileUploadModel({id: "upload", url: ""}),
//         new DynamicFormArrayModel({id: "formArray", groupFactory: () => []}),
//         new DynamicFormGroupModel({id: "formGroup", group: []}),
//         inputModel,
//         new DynamicRadioGroupModel({id: "radioGroup"}),
//         new DynamicRatingModel({id: "rating"}),
//         new DynamicSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
//         new DynamicSliderModel({id: "slider"}),
//         new DynamicSwitchModel({id: "switch"}),
//         new DynamicTextAreaModel({id: "textarea"}),
//         new DynamicTimePickerModel({id: "timepicker"})
//     ];

//     let formGroup: UntypedFormGroup;
//     let fixture: ComponentFixture<DynamicIonicFormControlContainerComponent>;
//     let component: DynamicIonicFormControlContainerComponent;
//     let debugElement: DebugElement;
//     // let testElement: DebugElement;

//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             imports: [DynamicIonicFormControlContainerComponent, DynamicIonicInputComponent]
//         }).compileComponents().then(() => {
//             fixture = TestBed.createComponent(DynamicIonicFormControlContainerComponent);

//             component = fixture.componentInstance;
//             debugElement = fixture.debugElement;
//         });
//     }));

//     beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
//         formGroup = service.createFormGroup(formModel);

//         component.group = formGroup;
//         component.model = inputModel;

//         fixture.detectChanges();

//         // testElement = debugElement.query(By.css(`ion-input[id='${inputModel.id}']`));
//     }));
//     /*
//     it("should initialize correctly", () => {
//         expect(component.context).toBeNull();
//         expect(component.group instanceof FormGroup).toBe(true);
//         expect(component.model instanceof DynamicFormControlModel).toBe(true);

//         expect(component.blur).toBeDefined();
//         expect(component.change).toBeDefined();
//         expect(component.focus).toBeDefined();

//         expect(component.componentType).toBe(DynamicIonicInputComponent);
//     });

//     it("should have an ion-input element", () => {
//         expect(testElement instanceof DebugElement).toBe(true);
//     });
// *
//     it("should listen to native blur events", () => {
//         spyOn(component, "onBlur");

//         testElement.triggerEventHandler("blur", null);

//         expect(component.onBlur).toHaveBeenCalled();
//     });

//     it("should listen to native focus events", () => {
//         spyOn(component, "onFocus");

//         testElement.triggerEventHandler("focus", null);

//         expect(component.onFocus).toHaveBeenCalled();
//     });

//     it("should listen to native change event", () => {
//         spyOn(component, "onChange");

//         testElement.triggerEventHandler("change", null);

//         expect(component.onChange).toHaveBeenCalled();
//     });

//     it("should update model value when control value changes", () => {
//         spyOn(component, "onControlValueChanges");

//         component.control.setValue("test");

//         expect(component.onControlValueChanges).toHaveBeenCalled();
//     });

//     it("should update control value when model value changes", () => {
//         spyOn(component, "onModelValueUpdates");

//         inputModel.valueUpdates.next("test");

//         expect(component.onModelValueUpdates).toHaveBeenCalled();
//     });

//     it("should update control activation when model disabled property changes", () => {
//         spyOn(component, "onModelDisabledUpdates");

//         inputModel.disabledUpdates.next(true);

//         expect(component.onModelDisabledUpdates).toHaveBeenCalled();
//     });

//     it("should update control activation when model required property changes", () => {
//         spyOn(component, "onModelRequiredUpdates");

//         inputModel.requiredUpdates.next(true);

//         expect(component.onModelRequiredUpdates).toHaveBeenCalled();
//     });
//     */
// });
