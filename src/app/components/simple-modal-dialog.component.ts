/// Learned from https://coryrylan.com/blog/build-a-angular-modal-dialog-with-angular-animate
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, 
  trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'app-simple-modal-dialog',
  exportAs: '',
  styleUrls: ['./simple-modal-dialog.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ],  
  template: `
  <div [@dialog] *ngIf="visible" class="app-dialog">
    <button *ngIf="closable" (click)="close()" aria-label="Close" 
    class="app-dialog-close-btn">X</button>
    <ng-content></ng-content>
  </div>
  <div *ngIf="visible" class="app-overlay" (click)="close()"></div>  
  `
})
export class SimpleModalDialogComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
