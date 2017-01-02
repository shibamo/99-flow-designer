/// Learned from https://coryrylan.com/blog/build-a-angular-modal-dialog-with-angular-animate
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, 
  trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'app-simple-modal-dialog',
  exportAs: '',
  outputs: ['visibleChange','confirmed'],
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
    class="app-dialog-command-close-btn">X</button>
    <button *ngIf="closable" (click)="confirm()" aria-label="确定" 
    class="app-dialog-command-confirm-btn">确 定</button>
    <ng-content></ng-content>
  </div>
  <div *ngIf="visible" class="app-overlay" (click)="close()"></div>  
  `
})
export class SimpleModalDialogComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  confirm() {
    this.visible = false;
    this.confirmed.emit(true);
  }
}
