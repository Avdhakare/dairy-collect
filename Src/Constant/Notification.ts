export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface INotificationData {
  title?: string,
  message: string,
  type: NotificationType,
}