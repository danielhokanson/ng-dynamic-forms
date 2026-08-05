import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';
import {
    DynamicFormService,
    DynamicFormControlEvent,
    DynamicFormGroupModel,
    DynamicInputModel
} from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicBasicFormComponent } from './dynamic-basic-form.component';
import {
    DynamicBasicFormControlContainerComponent,
    DynamicBasicFormGroupComponent
} from './dynamic-basic-form-control-container.component';

describe('DynamicBasicFormComponent test suite', () => {
    const inputModel = new DynamicInputModel({ id: 'sampleInput' });
    const nestedInputModel = new DynamicInputModel({ id: 'nestedInput' });
    const groupModel = new DynamicFormGroupModel({ id: 'sampleGroup', group: [nestedInputModel] });
    const formModel = [inputModel, groupModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicBasicFormComponent>;
    let component: DynamicBasicFormComponent;
    let debugElement: DebugElement;

    const testEvent = {
        $event: null,
        context: null,
        control: null,
        group: null,
        model: nestedInputModel,
        type: 'custom'
    } as unknown as DynamicFormControlEvent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicBasicFormComponent],
            providers: [provideNgxMask()]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicBasicFormComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;

            component.group = formGroup;
            component.model = formModel;

            fixture.detectChanges();
        });
    }));

    it('should initialize correctly', () => {
        expect(component.group instanceof UntypedFormGroup).toBe(true);
        expect(component.model).toBe(formModel);
        expect(component.layout).toBeUndefined();

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.customEvent).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.templates).toBeDefined();
        expect(component.components.length).toBe(2);
    });

    it('should render a form control container for each top level model', () => {
        const containers = debugElement.children.filter(child => child.name === 'dynamic-basic-form-control');

        expect(containers.length).toBe(2);
    });

    it('should relay a blur event from a form control container', () => {
        let relayedEvent: DynamicFormControlEvent | undefined;
        component.blur.subscribe(($event: DynamicFormControlEvent) => relayedEvent = $event);

        component.components.first.onBlur(testEvent);

        expect(relayedEvent).toBe(testEvent);
    });

    it('should relay a change event from a form control container', () => {
        let relayedEvent: DynamicFormControlEvent | undefined;
        component.change.subscribe(($event: DynamicFormControlEvent) => relayedEvent = $event);

        component.components.first.onChange(testEvent);

        expect(relayedEvent).toBe(testEvent);
    });

    it('should relay a focus event from a form control container', () => {
        let relayedEvent: DynamicFormControlEvent | undefined;
        component.focus.subscribe(($event: DynamicFormControlEvent) => relayedEvent = $event);

        component.components.first.onFocus(testEvent);

        expect(relayedEvent).toBe(testEvent);
    });

    it('should relay a custom event from a form control container', () => {
        let relayedEvent: DynamicFormControlEvent | undefined;
        component.customEvent.subscribe(($event: DynamicFormControlEvent) => relayedEvent = $event);

        component.components.first.onCustomEvent(testEvent);

        expect(relayedEvent).toBe(testEvent);
    });

    it('should populate the components query list of a nested form group', () => {
        const formGroupComponent = debugElement
            .query(By.directive(DynamicBasicFormGroupComponent)).componentInstance as DynamicBasicFormGroupComponent;

        expect(formGroupComponent.components.length).toBe(1);
        expect(formGroupComponent.components.first instanceof DynamicBasicFormControlContainerComponent).toBe(true);
    });

    it('should propagate a custom event from a form control nested in a form group to the form output', () => {
        const containers = debugElement.queryAll(By.directive(DynamicBasicFormControlContainerComponent));
        const nestedContainer = containers
            .map(container => container.componentInstance as DynamicBasicFormControlContainerComponent)
            .find(container => container.model === nestedInputModel);

        expect(nestedContainer).toBeDefined();

        let relayedEvent: DynamicFormControlEvent | undefined;
        component.customEvent.subscribe(($event: DynamicFormControlEvent) => relayedEvent = $event);

        nestedContainer?.onCustomEvent(testEvent);

        expect(relayedEvent).toBe(testEvent);
    });
});
