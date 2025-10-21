/**
 * Assesses how system performs when loads are heavier than usual.
 * Verify stability and reliablity of the system under conditions of heavy use.
 */

/**
 * Load should be higher than what system experience on avg
 * Only run after avg load test
 * Reuse avg load test ( modify duration and target)
 * Expect worse performance compared to avg load
 */

// sample
export const default_stress_test = {
  stages: [
    { duration: '10m', target: 100 }, 
    { duration: '20m', target: 200 },
    { duration: '5m', target: 0 },  
  ],
  thrsholds:{
    http_req_failed: ['rate< 0.01'],
    http_req_duration:['p(95)<400']
  },
};