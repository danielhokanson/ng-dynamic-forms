import { Directive, ElementRef, Input, Renderer2, AfterViewInit, inject } from '@angular/core';
import { isString } from '../utils/core.utils';

@Directive({
    selector: '[dynamicList]',
    standalone: true
})
export class DynamicListDirective implements AfterViewInit {
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input('dynamicList') listId?: string;

    /** Inserted by Angular inject() migration for backwards compatibility */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@angular-eslint/prefer-inject
    constructor(...args: unknown[]);

    // TODO: Constructor uses inject() internally - prefer-inject warning can be ignored
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor() {
    }

    ngAfterViewInit() {
        if (isString(this.listId)) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'list', this.listId as string);
        }
    }
}
