const serviceWorkerConfig = {
  onUpdate: (e: ServiceWorkerRegistration) => {
    const { waiting: { postMessage = null } = {} as any, update } = e || {};
    if (postMessage) {
      postMessage({ type: 'SKIP_WAITING' });
    }
    update().then(() => {
      window.location.reload();
    });
  },
};

export default serviceWorkerConfig;
