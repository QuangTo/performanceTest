import { sleep } from "k6";
import util from "./util";

export const options_smoke = {
  vus: 1, // Number of virtual users to run concurrently
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(99)<2000"], // 99% of requests should be below 1s
  },
  timeUnit: "1s",
};

// export const options_load = {
//   thresholds: {
//     http_req_failed: ["rate<0.01"], // http errors should be less than 1%
//     http_req_duration: ["p(90)<400", "p(95)<1", "p(99)<2000"], // 90% of requests should be below 400ms
//     http_req_duration: ["avg<200"],
//   },
//   vus: 1,
//   scenarios: {
//     //
//     get_list_user: {
//       // executor: "ramping-vus",
//       stages: [
//         { duration: "5s", target: 500 },
//         { duration: "20s", target: 5000 },
//         { duration: "5s", target: 0 },
//       ],
//     },
//   },
//   timeUnit: "1s",
// };

export const options = {
  // stress
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(90)<400", "p(95)<1", "p(99)<2000"], // 90% of requests should be below 400ms
    http_req_duration: ["avg<200"],
  },
  vus: 1,
  executor: "ramping-vus",
  scenarios: {
    stress_test: {
      executor: "ramping-vus",
      stages: [
        { duration: "5s", target: 100 },
        { duration: "10s", target: 100 },
        { duration: "5s", target: 200 },
        { duration: "10s", target: 200 },
        { duration: "5s", target: 500 },
        { duration: "10s", target: 500 },
        { duration: "5s", target: 0 },
      ],
    },
  },
  timeUnit: "1s",
};

// export const options_soak = {
//   thresholds: {
//     http_req_failed: ["rate<0.01"], // http errors should be less than 1%
//     http_req_duration: ["p(90)<400", "p(95)<1", "p(99)<2000"], // 90% of requests should be below 400ms
//     http_req_duration: ["avg<200"],
//   },
//   vus: 1,
//   scenarios: {
//     get_list_user: {
//       // executor: "ramping-vus",
//       stages: [
//         { duration: "1m", target: 1000 }, // ramp up to 1k
//         { duration: "5m", target: 1000 }, // stay with 1000 users in 5m
//         { duration: "1m", target: 0 }, // tear down
//       ],
//     },
//   },
//    timeUnit: '1s',
// };

// connect to server
export default function () {
  const headers = { "Content-Type": "application/json" };
  const res = http.get("http://localhost:8081/course-list", { headers });
  check(res, {
    "Ohmygot! Server is alive": (r) => res.status == 200,
  });
}
