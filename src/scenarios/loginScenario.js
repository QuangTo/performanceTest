import http from 'k6/http';
import { check, sleep } from 'k6';
import { LoginDuration } from '../utils/metrics.js';


export function loginScenario(baseUrl, user) {
  const url = `${baseUrl}/auth/login`;

  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);
  //  Record custom metric
  LoginDuration.add(res.timings.duration);

  // Validate basic response
  check(res, {
    '✅ status is 200': (r) => r.status === 200,
    '✅ has non-empty body': (r) => r.body && r.body.length > 0,
    '✅ response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
  return res;
}
