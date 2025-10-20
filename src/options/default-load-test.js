export const default_load_test = {
  stages: [
    { duration: '0.5m', target: 20 },   // ramp-up
    { duration: '1m', target: 20 },   // steady
    { duration: '0.5m', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<400'],
  },
};