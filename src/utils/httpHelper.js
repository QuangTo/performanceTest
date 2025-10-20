import http from 'k6/http';
import { check } from 'k6';
import { LoginDuration } from './metrics.js';

export function loginRequest(baseUrl, user) {
  const url = `${baseUrl}/auth/login`;

  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);
  LoginDuration.add(res.timings.duration);

  check(res, {
    'Status 200': (r) => r.status === 200,
    'Response time < 500ms': (r) => r.timings.duration < 500,
    'Contains token or message': (r) => r.body.length > 0,
  });

  return res;
}
