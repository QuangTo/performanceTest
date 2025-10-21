/**
 * Another variation of avg load test. it focus on extended periods
 */
export const default_load_test ={
    stages: [
    {duration :'0.5m', target: 10}, //ramp-up
    {duration :'8h', target: 10}, //steady
    {duration :'0.5m', target: 0}, //ramp-down
  ],
  thrsholds:{
    http_req_failed: ['rate< 0.01'],
    http_req_duration:['p(95)<400']
  },
}