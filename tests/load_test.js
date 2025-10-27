import { BASE_URL, USER } from '../configs/env.config.js';
import { loginScenario } from '../src/scenarios/loginScenario.js';
import { default_load_test } from '../src/options/default-load-test.js';

export const options = {
  ...default_load_test,
  thresholds: {
    ...default_load_test.thresholds,
    login_sample: ['p(95) < 500']
  }
};

export default function () {
  // run tét
  loginScenario(BASE_URL, USER);
}
