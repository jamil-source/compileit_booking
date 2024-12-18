// shared-modal.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ModalService } from '../../../services/shared/modal.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css'],
})
export class SharedModalComponent implements OnInit {
  public message: string = '';
  public icon: IconDefinition;
  public isError: boolean = false;

  public modalInstance: bootstrap.Modal;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.currentMessage$.subscribe((message) => {
      this.message = message;

      if (this.message) {
        this.openModal();
      }
    });

    this.modalService.currentIcon$.subscribe((icon) => {
      this.icon = icon;
    });

    this.modalService.erroState$.subscribe((isError) => {
      this.isError = isError;
    });
  }

  openModal() {
    const modalElement = document.getElementById('sharedModal');

    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }

    this.modalInstance.show();

    setTimeout(() => {
      this.modalInstance.hide();
      this.message = '';
      this.icon = null;
      this.isError = false;
    }, 3000);
  }
}
