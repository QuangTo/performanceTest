/**
 * Avg load test assesses how the system performs under typical load. Typical load might be a regular day on production env
 * Identify early degradation sign durings ramp up and full load perios
 * Assure that system meets performance standards after system changes(migrate, new upgrade..etc)
 */

/**
 * Input params:
 * - Stages
 * - Thresholds
 */

export const default_load_test = {
  discardResponseBodies: true,
  tags: { suite: 'avg-load', environment: 'staging' },

  scenarios: {
    constant_vus: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
      exec: 'default'
    },
    ramping_arrival_rate: {
      executor: 'ramping-arrival-rate',
      startRate: 5,
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 100,
      stages: [
        { target: 10, duration: '0.5m' }, // ramp to 10 rps
        { target: 30, duration: '1m' }, // ramp to 30 rps and hold
        { target: 0, duration: '0.5m' } // ramp down
      ],
      exec: 'default'
    }
  },

  // Thresholds for pass/fail criteria for a test run
  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 800']
  },
  //summray on report
  summaryTrendStats: ['avg', 'p(50)', 'p(90)', 'p(95)', 'p(99)', 'min', 'max']
};
