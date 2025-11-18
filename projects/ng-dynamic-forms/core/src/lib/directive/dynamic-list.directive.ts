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
    constructor(...args: unknown[]);

    constructor() {
    }

    ngAfterViewInit() {
        if (isString(this.listId)) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'list', this.listId as string);
        }
    }
}
