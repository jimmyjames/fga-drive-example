import { NodeSDK } from "@opentelemetry/sdk-node";
import {
    HttpInstrumentation
} from '@opentelemetry/instrumentation-http';

// Looks like the trace exporter is experimental
// https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

const sdk = new NodeSDK({
  traceExporter:  new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    //url: 'http://localhost:9193/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, reqInfo: any) => {
        span.updateName( `${reqInfo.method} ${reqInfo.url || reqInfo.path}`);
      },
    }),
  ],
});
sdk.start();