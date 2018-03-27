export function loadServiceWorker() {
  if (ENV.BUILD_TARGET === ENV.BUILD_TARGET_CLIENT && ENV.DEPLOY_TARGET !== ENV.TARGET_DEV) {
      let registerServiceWorker = require('service-worker-loader!./service.ts').default;
      registerServiceWorker().then(() => console.log('loaded sw'))
        .catch(() => console.warn('failed to register sw'));
    }
}