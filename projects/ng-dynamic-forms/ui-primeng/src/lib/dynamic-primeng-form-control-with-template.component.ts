import { TemplateRef } from "@angular/core";
import { DynamicFormControlWithTemplateComponent, DynamicTemplateDirective } from "@danielhokanson/ng-dynamic-forms-core";

export abstract class DynamicPrimeNGFormControlWithTemplateComponent extends DynamicFormControlWithTemplateComponent {
    mapTemplate(template: DynamicTemplateDirective): DynamicTemplateDirective | TemplateRef<any> {
        return template.templateRef;
    }
}
