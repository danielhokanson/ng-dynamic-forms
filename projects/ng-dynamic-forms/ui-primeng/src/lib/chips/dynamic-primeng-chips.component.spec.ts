// TODO: PrimeNG v20 removed the Chips component. These tests are disabled until a replacement is implemented.
// The component has been temporarily disabled and replaced with AutoComplete for multiple inputs.

// import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
// import { DebugElement } from '@angular/core';
// import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { Chips } from 'primeng/chips';
// import { DynamicFormService, DynamicInputModel } from '@danielhokanson/ng-dynamic-forms-core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DynamicPrimeNGChipsComponent } from './dynamic-primeng-chips.component';

describe('DynamicPrimeNGChipsComponent test suite', () => {
    // const testModel = new DynamicInputModel({id: 'input', multiple: true});
    // const formModel = [testModel];

    // let formGroup: UntypedFormGroup;
    // let fixture: ComponentFixture<DynamicPrimeNGChipsComponent>;
    // let component: DynamicPrimeNGChipsComponent;
    // let debugElement: DebugElement;
    // let testElement: DebugElement;

    // All tests are disabled - component is temporarily disabled in PrimeNG v20
    // beforeEach(waitForAsync(() => {
    //     TestBed.configureTestingModule({
    //         imports: [DynamicPrimeNGChipsComponent]
    //     }).compileComponents().then(() => {
    //         fixture = TestBed.createComponent(DynamicPrimeNGChipsComponent);
    //         component = fixture.componentInstance;
    //         debugElement = fixture.debugElement;
    //     });
    // }));

    // beforeEach(inject([DynamicFormService], (service: DynamicFormService) => {
    //     formGroup = service.createFormGroup(formModel);
    //     component.group = formGroup;
    //     component.model = testModel;
    //     fixture.detectChanges();
    //     testElement = debugElement.query(By.css(`p-chips[id="${testModel.id}"]`));
    // }));

    xit('should initialize correctly', () => {
        // TODO: Re-enable when Chips component replacement is implemented
        // expect(component.control instanceof UntypedFormControl).toBe(true);
        // expect(component.group instanceof UntypedFormGroup).toBe(true);
        // expect(component.model instanceof DynamicInputModel).toBe(true);
        // expect(component.pChips instanceof Chips).toBe(true);
        // expect(component.viewChild instanceof Chips).toBe(true);
    });

    xit('should have an p-chips element', () => {
        // TODO: Re-enable when Chips component replacement is implemented
        // expect(testElement instanceof DebugElement).toBe(true);
    });

    xit('should emit blur event', () => {
        // TODO: Re-enable when Chips component replacement is implemented
    });

    xit('should emit change event', () => {
        // TODO: Re-enable when Chips component replacement is implemented
    });

    xit('should emit focus event', () => {
        // TODO: Re-enable when Chips component replacement is implemented
    });

    xit('should emit custom event', () => {
        // TODO: Re-enable when Chips component replacement is implemented
    });
});
