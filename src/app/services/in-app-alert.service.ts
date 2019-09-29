import { Injectable } from '@angular/core';

export class InAppMessage {
  type: string;
  message: string;
  closed?: boolean;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InAppAlertService {

  constructor() { }

  success(message: string, messages: InAppMessage[] = []) {
    const i = messages.push({type: 'success', message}) - 1;
    setTimeout(() => {
      messages[i].closed = true;
    }, 5000);
  }

  error(message: string, messages: InAppMessage[] = []) {
    const i = messages.push({type: 'danger', message}) - 1;
    setTimeout(() => {
      messages[i].closed = true;
    }, 5000);
  }

  info(message: string, messages: InAppMessage[] = []) {
    const i = messages.push({type: 'info', message}) - 1;
    setTimeout(() => {
      messages[i].closed = true;
    }, 5000);
  }

  warn(message: string, messages: InAppMessage[] = []) {
    const i = messages.push({type: 'warning', message}) - 1;
    setTimeout(() => {
      messages[i].closed = true;
    }, 5000);
  }
}
