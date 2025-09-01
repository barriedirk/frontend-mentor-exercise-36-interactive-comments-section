import {
  Injectable,
  inject,
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';

import { ModalDeleteComment } from './modal-delete-comment';

@Injectable({
  providedIn: 'root',
})
export class ModalDeleteCommentService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private modalRef: ComponentRef<ModalDeleteComment> | null = null;

  open(): Promise<any> {
    if (this.modalRef) return Promise.reject('Modal already open');

    this.modalRef = createComponent(ModalDeleteComment, { environmentInjector: this.injector });

    const result = new Promise<any>((resolve) => {
      this.modalRef!.instance.close.subscribe((action) => {
        resolve(action);

        this.close();
      });
    });

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(this.modalRef.location.nativeElement);

    return result;
  }

  close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
