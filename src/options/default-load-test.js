
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
export const default_load_test ={
  // stages: [
  //   {duration :'5m', target: 100}, //ramp-up
  //   {duration :'30m', target: 100}, //steady
  //   {duration :'5m', target: 0}, //ramp-down
  // ],
    stages: [
    {duration :'0.5m', target: 10}, //ramp-up
    {duration :'1m', target: 10}, //steady
    {duration :'0.5m', target: 0}, //ramp-down
  ],
  thrsholds:{
    http_req_failed: ['rate< 0.01'],
    http_req_duration:['p(95)<400']
  },
}