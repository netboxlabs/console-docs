# Metrics

## Available Metrics

### Core Metrics (All Services)
- `diode_{service}_service_info` - Service information
- `diode_{service}_service_startup_attempts_total` - Startup attempts

### Service-Specific Metrics

#### Auth Service
- `diode_auth_service_info` - Service information
- `diode_auth_service_startup_attempts_total` - Startup attempts

#### Ingester Service
- `diode_ingester_service_info` - Service information
- `diode_ingester_service_startup_attempts_total` - Startup attempts
- `diode_ingester_ingest_requests_total` - Ingest requests (success)
- `diode_ingester_ingest_entities_total` - Entities ingested

#### Reconciler Service
- `diode_reconciler_service_info` - Service information
- `diode_reconciler_service_startup_attempts_total` - Startup attempts
- `diode_reconciler_handle_message_total` - Messages handled (success)
- `diode_reconciler_ingestion_log_create_total` - Ingestion logs created (success)
- `diode_reconciler_change_set_create_total` - Change sets created (success)
- `diode_reconciler_change_set_apply_total` - Change sets applied (success)
- `diode_reconciler_change_create_total` - Individual changes created
- `diode_reconciler_change_apply_total` - Individual changes applied

## Configuration Overview

Diode's telemetry implementation supports multiple configuration methods and exporters.

### Exporters
- **prometheus**: Serve metrics on `/metrics` endpoint
- **otlp**: Send to OpenTelemetry Collector
- **console**: Output to stdout (debugging)
- **none**: Disable metrics

## Environment Variables

### Core Configuration

| Variable | Description | Default | Required | Example |
|----------|-------------|---------|----------|---------|
| `TELEMETRY_SERVICE_NAME` | Service identifier | Auto-detected | No | `netboxlabs/diode/auth` |
| `TELEMETRY_EXPORTER` | Metrics exporter | `prometheus` | No | `prometheus`, `otlp`, `console`, `none` |
| `TELEMETRY_PROMETHEUS_PORT` | Prometheus port | `9090` | No | `9090` |
| `TELEMETRY_OTLP_ENDPOINT` | OTLP endpoint | - | Yes (if OTLP) | `http://collector:4317` |
| `TELEMETRY_OTLP_INSECURE` | OTLP insecure | `false` | No | `true`, `false` |

### Advanced Configuration

| Variable | Description | Default | Required | Example |
|----------|-------------|---------|----------|---------|
| `TELEMETRY_OTLP_TIMEOUT` | OTLP timeout | `30s` | No | `30s` |
| `TELEMETRY_OTLP_COMPRESSION` | OTLP compression | `none` | No | `gzip`, `none` |
| `TELEMETRY_RESOURCE_ATTRIBUTES` | Resource attributes | - | No | `service.version=1.0.0` |

## Docker Compose Example

```yaml
version: '3.8'

services:
  diode-auth:
    image: netboxlabs/diode-auth:latest
    environment:
      - TELEMETRY_SERVICE_NAME=netboxlabs/diode/auth
      - TELEMETRY_EXPORTER=prometheus
      - TELEMETRY_PROMETHEUS_PORT=9090
    ports:
      - "9090:9090"

  diode-ingester:
    image: netboxlabs/diode-ingester:latest
    environment:
      - TELEMETRY_SERVICE_NAME=netboxlabs/diode/ingester
      - TELEMETRY_EXPORTER=prometheus
      - TELEMETRY_PROMETHEUS_PORT=9091
    ports:
      - "9091:9091"

  diode-reconciler:
    image: netboxlabs/diode-reconciler:latest
    environment:
      - TELEMETRY_SERVICE_NAME=netboxlabs/diode/reconciler
      - TELEMETRY_EXPORTER=prometheus
      - TELEMETRY_PROMETHEUS_PORT=9092
    ports:
      - "9092:9092"

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9093:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
```

### Prometheus Configuration

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'diode-auth'
    static_configs:
      - targets: ['diode-auth:9090']

  - job_name: 'diode-ingester'
    static_configs:
      - targets: ['diode-ingester:9091']

  - job_name: 'diode-reconciler'
    static_configs:
      - targets: ['diode-reconciler:9092']
```

## OTLP Configuration

### Environment Variables

```bash
export TELEMETRY_EXPORTER=otlp
export TELEMETRY_OTLP_ENDPOINT=http://otel-collector:4317
export TELEMETRY_OTLP_INSECURE=true
export TELEMETRY_OTLP_TIMEOUT=30s
export TELEMETRY_OTLP_COMPRESSION=gzip
```

### OpenTelemetry Collector Configuration

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:

exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"
  logging:
    loglevel: debug

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus, logging]
```

## Troubleshooting

### Common Issues

1. **Metrics not appearing**
   - Check the exporter configuration
   - Verify the service is running
   - Check firewall rules for metrics ports

2. **Prometheus scraping failures**
   - Verify the target endpoint is accessible
   - Check the scrape configuration
   - Ensure the service is exposing metrics on the correct port

3. **OTLP connection issues**
   - Verify the collector endpoint is reachable
   - Check TLS/insecure settings
   - Validate the collector configuration

### Debugging

1. **Enable console exporter**
   ```bash
   export TELEMETRY_EXPORTER=console
   ```

2. **Check service logs**
   ```bash
   docker compose logs diode-auth
   docker compose logs diode-ingester
   docker compose logs diode-reconciler
   ```

3. **Verify metrics endpoints**
   ```bash
   curl http://localhost:9090/metrics
   curl http://localhost:9091/metrics
   curl http://localhost:9092/metrics
   ```

## Grafana Dashboard

### Sample Queries

#### Service Health
```promql
# Service uptime
up{job=~"diode-.*"}

# Service restarts
increase(diode_*_service_startup_attempts_total[5m])
```

#### Ingestion Metrics
```promql
# Ingestion rate
rate(diode_ingester_ingest_requests_total[5m])

# Entities ingested
rate(diode_ingester_ingest_entities_total[5m])
```

#### Reconciliation Metrics
```promql
# Message processing rate
rate(diode_reconciler_handle_message_total[5m])

# Change set creation rate
rate(diode_reconciler_change_set_create_total[5m])

# Change set application rate
rate(diode_reconciler_change_set_apply_total[5m])
```

### Dashboard JSON

A sample Grafana dashboard configuration is available in the [Diode repository](https://github.com/netboxlabs/diode/tree/develop/examples/grafana).

## References

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)