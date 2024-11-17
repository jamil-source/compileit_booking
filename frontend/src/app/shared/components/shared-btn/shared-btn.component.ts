import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-btn',
  templateUrl: './shared-btn.component.html',
  styleUrl: './shared-btn.component.css',
})
export class SharedBtnComponent {
  @Input() text: string;
  @Output() clicked = new EventEmitter<boolean>();
  public _disabled: boolean = false;

  @Input() set disabled(disabled: boolean) {
    this.changeDisabledVal(disabled);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  changeDisabledVal(val: boolean) {
    this._disabled = val;
  }

  clickEvent() {
    if (this._disabled === false) {
      this.clicked.next(true);
    }
  }
}
