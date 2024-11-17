// modal.service.ts
import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private messageSource = new BehaviorSubject<string>('');
  public currentMessage$ = this.messageSource.asObservable();

  private iconSource = new BehaviorSubject<IconDefinition>(null);
  public currentIcon$ = this.iconSource.asObservable();

  private isErrorSource = new BehaviorSubject<boolean>(false);
  public erroState$ = this.isErrorSource.asObservable();

  constructor() {}

  messageOutput(message: string) {
    this.messageSource.next(message);
  }

  iconOutput(icon: IconDefinition) {
    this.iconSource.next(icon);
  }

  isErrorOutput(isError: boolean) {
    this.isErrorSource.next(isError);
  }
}
