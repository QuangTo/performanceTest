import http from "k6/http";
import { check } from "k6";

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
  const headers = { "Content-Type": "application/json" };
  const res = http.get("http://localhost:8081/course-list", { headers });
  check(res, {
    "Ohmygot! Server is alive": (r) => res.status == 200,
  });
}

export function teardown(data) {
  // 4. teardown code
}
