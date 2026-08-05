import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DynamicFormService, DynamicInputModel, DynamicTemplateDirective } from '@danielhokanson/ng-dynamic-forms-core';
import { DynamicPrimeNGFormControlWithTemplateComponent } from './dynamic-primeng-form-control-with-template.component';
import { DynamicPrimeNGChipsComponent } from './chips/dynamic-primeng-chips.component';
import { PRIME_NG_TEMPLATE_DIRECTIVES } from './dynamic-primeng-form.const';

describe('DynamicPrimeNGFormControlWithTemplateComponent test suite', () => {
    const testModel = new DynamicInputModel({ id: 'input', multiple: true });
    const formModel = [testModel];

    let formGroup: UntypedFormGroup;
    let fixture: ComponentFixture<DynamicPrimeNGChipsComponent>;
    let component: DynamicPrimeNGChipsComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DynamicPrimeNGChipsComponent]
        }).compileComponents().then(() => {
            const service = TestBed.inject(DynamicFormService);
            formGroup = service.createFormGroup(formModel);

            fixture = TestBed.createComponent(DynamicPrimeNGChipsComponent);

            component = fixture.componentInstance;

            component.group = formGroup;
            component.model = testModel;

            fixture.detectChanges();
        });
    }));

    it('should extend the abstract with-template base class', () => {
        expect(component instanceof DynamicPrimeNGFormControlWithTemplateComponent).toBe(true);
    });

    it('should declare the PrimeNG template directives', () => {
        expect(component.templateDirectives).toBe(PRIME_NG_TEMPLATE_DIRECTIVES);
        expect(component.templateDirectives.get('itemTemplate')).toEqual('itemTemplate');
        expect(component.templateDirectives.get('selectedItemTemplate')).toEqual('selectedItemTemplate');
    });

    it('should expose the PrimeNG component as view child', () => {
        expect(component.viewChild).toBe(component.pChips);
    });

    it('should map a dynamic template directive to its template ref', () => {
        const templateRef = {} as TemplateRef<any>;
        const template = { templateRef } as DynamicTemplateDirective;

        expect(component.mapTemplate(template)).toBe(templateRef);
    });
});
