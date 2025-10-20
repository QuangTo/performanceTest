import { loginScenario } from '../src/scenarios/loginScenario.js';
import { BASE_URL, USER } from '../configs/env.config.js';
import { default_load_test } from '../src/options/default-load-test.js';

export const options = default_load_test;

export default function () {
  loginScenario(BASE_URL, USER);
}
