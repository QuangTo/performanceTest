import { Trend, Rate } from 'k6/metrics';

// Centralized metrics for all scenarios.
export const LoginSample = new Trend('login_sample');
