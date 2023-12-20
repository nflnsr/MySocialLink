import { datadogRum } from "@datadog/browser-rum";

export function initDatadogRum() {
  datadogRum.init({
    applicationId: import.meta.env.VITE_DATADOG_RUM_APPLICATION_ID,
    clientToken: import.meta.env.VITE_DATADOG_RUM_CLIENT_TOKEN,
    site: import.meta.env.VITE_DATADOG_RUM_SITE,
    service: import.meta.env.VITE_DATADOG_RUM_SERVICE,
    env: import.meta.env.VITE_DATADOG_RUM_ENVIRONMENT,
    version: import.meta.env.VITE_DATADOG_RUM_VERSION,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: import.meta.env.VITE_DATADOG_RUM_DEFAULT_PRIVACY_LEVEL,
  });
}
