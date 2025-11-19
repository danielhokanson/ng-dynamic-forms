import { Directive, Input, TemplateRef } from '@angular/core';

export enum DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT {
    Start = 'START',
    End = 'END'
}

@Directive({
    selector: 'ng-template[modelId],ng-template[modelType]',
    standalone: true
})
export class DynamicTemplateDirective {
    @Input() align: string = DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT.End;
    @Input() as: string | null = null;
    @Input() index?: number;
    @Input() modelId?: string;
    @Input() modelType?: string;

    // TODO: TemplateRef must be injected via constructor in directives - this is correct
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor(public templateRef: TemplateRef<any>) {
    }
}
