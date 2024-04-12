import { Component, Input } from '@angular/core';
import { Toast } from 'src/app/models/Toast';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent {
  @Input() messageType?: string;
  public currentToast: Toast | null = null;

  ngOnChanges(): void {
    if (this.messageType) {
      this.displayToast(this.messageType);
    }
  }

  displayToast(messageType: string): void {
    const toast: Toast = this.createToast(messageType);
    this.currentToast = toast;

    setTimeout(() => {
      this.removeToast();
    }, 5000);
  }

  createToast(messageType: string): Toast {
    let icon: string;
    let text: string;

    switch (messageType) {
      case 'success':
        icon = 'fa-circle-check';
        text =
          'Congrats! You successfully bit a human and turned them into a zombie.';
        break;
      case 'warning':
        icon = 'fa-triangle-exclamation';
        text = 'No luck! Human outsmarted.';
        break;
      case 'error':
        icon = 'fa-circle-xmark';
        text = '';
        break;
      case 'info':
        icon = 'fa-circle-info';
        text = '';
        break;
      default:
        icon = 'fa-circle-info';
        text = '';
        break;
    }

    return { messageType, icon, text };
  }

  removeToast(): void {
    this.currentToast = null;
  }
}
