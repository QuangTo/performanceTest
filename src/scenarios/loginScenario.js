import http from 'k6/http';
import { check, sleep } from 'k6';
import { createHeaders } from '../utils/header.js';
import { LoginSample } from '../utils/metrics.js';

export function loginScenario(baseUrl, user) {
  const url = `${baseUrl}/auth/basic/login/`;
  const params = {
    headers: createHeaders()
  };
  const payload = JSON.stringify({
    username: user.username,
    password: user.password
  });

  const res = http.post(url, payload, params);
  LoginSample.add(res.timings.duration);

  check(res, {
    '✅ status is 200': (r) => r.status === 200,
    '✅ has non-empty body': (r) => r.body && r.body.length > 0,
    '✅ response time < 800ms': (r) => r.timings.duration < 800
  });

  sleep(1);
  return res;
}
