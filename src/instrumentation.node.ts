import { NodeSDK } from "@opentelemetry/sdk-node";
import {
    HttpInstrumentation
} from '@opentelemetry/instrumentation-http';
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";

const sdk = new NodeSDK({
  traceExporter:  new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    //url: 'http://localhost:9193/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      //url: '<your-otlp-endpoint>/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      headers: {}, // an optional object containing custom headers to be sent with each request
      concurrencyLimit: 1, // an optional limit on pending requests
    }),
  }),
  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, reqInfo: any) => {
        console.log(`***** reqInfo: ${JSON.stringify(reqInfo)}`);
        span.updateName( `${reqInfo.method} ${reqInfo.url || reqInfo.path}`);
      },
    }),
  ],
});
sdk.start();