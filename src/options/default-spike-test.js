import { Trend, Rate } from 'k6/metrics';

export const default_spike_test = {
  stages: [
    { duration: '30s', target: 10 }, //ramup
    { duration: '10s', target: 300 }, // spike
    { duration: '20s', target: 500 }, // spike
    { duration: '20s', target: 10 }, // recover
    { duration: '10s', target: 0 }, // rampdown
  ],
  threshold:{
    http_req_duration: ['p(95)<1200', 'p(99)<2500'],
    'error_rate': ['rate<0.02'],           
  }
};