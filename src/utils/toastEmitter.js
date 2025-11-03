class ToastEmitter {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit(message, type = 'error') {
    this.listeners.forEach(listener => listener({ message, type }));
  }
}

export const toastEmitter = new ToastEmitter();
