import { Component, Input } from '@angular/core';
import { Toast } from 'src/app/models/Toast';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent {
  @Input() messageType?: string;
  @Input() username?: string;
  public toastQueue: Toast[] = [];
  private timeoutIds: { [key: string]: NodeJS.Timeout } = {};

  ngOnChanges(): void {
    if (this.messageType) {
      this.displayToast(this.messageType);
    }
  }

  displayToast(messageType: string): void {
    const toast: Toast = this.createToast(messageType);
    this.toastQueue.push(toast);

    const timeoutId = setTimeout(() => {
      this.removeToast(toast);
    }, 5000);
    this.timeoutIds[toast.id] = timeoutId;
  }

  createToast(messageType: string): Toast {
    const ICON_SUCCESS = 'fa-circle-check';
    const ICON_WARNING = 'fa-triangle-exclamation';
    const ICON_INFO = 'fa-circle-info';

    const id = this.generateUniqueId();
    let icon: string;
    let text: string;

    switch (messageType) {
      case 'success':
        icon = ICON_SUCCESS;
        text =
          'Congrats! You successfully bit a human and turned them into a zombie.';
        break;
      case 'warning':
        icon = ICON_WARNING;
        text = 'No luck! Human outsmarted.';
        break;
      case 'kill':
        icon = ICON_INFO;
        text = `Another brave hero has fallen. Nobody is safe!`;
        break;
      case 'patient_zero':
        icon = ICON_INFO;
        text = `Game has started, patient zero has been chosen. Good luck!`;
        break;
      case 'game_over':
        icon = ICON_INFO;
        text = `Game over!`;
        break;
      default:
        icon = ICON_INFO;
        text = '';
        break;
    }

    return { id, messageType, icon, text, display: true };
  }

  public setCurrentClasses(toast: Toast): Record<string, boolean> {
    return {
      info: ['kill', 'patient_zero', 'game-over'].includes(toast.messageType),
      success: toast.messageType === 'success',
      warning: toast.messageType === 'warning',
    };
  }

  removeToast(toast: Toast): void {
    const timeoutId = this.timeoutIds[toast.id];
    if (timeoutId) {
      clearTimeout(timeoutId);
      delete this.timeoutIds[toast.id];
    }

    const index = this.toastQueue.indexOf(toast);
    if (index !== -1) {
      toast.display = false;
      this.toastQueue.splice(index, 1);
    }
  }

  private generateUniqueId(): string {
    const randomString = Math.random().toString(36).substring(2);
    return randomString.length >= 9
      ? randomString.substring(0, 9)
      : randomString;
  }
}
