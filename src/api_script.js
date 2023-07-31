/**
 * sample API/  service load test
 *  k6 HTTP module to test a single endpoint
 * set up and run local before publishing to cluster
*/

import { check } from 'k6';
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate', 
      //'constant-vus',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources     preAll

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
  ext: {
    loadimpact: {
      distribution: {
        loadZone1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        loadZone2: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
  discardResponseBodies: true, // Do not keep response bodies in memory
  setupTimeout: '10s', // Time allowed for setup before the load test starts
  teardownTimeout: '10s', // Time allowed for teardown after the load test ends
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
  check(res, {
    'check status code is 200': (r) => res.status == 200,
  });
}
