export const default_soak_test = {
  stages: [
    { duration: '1m', target: 30 },    // ramp up
    { duration: '2m', target: 30 },   // steady (1 hour)
    { duration: '1m', target: 0 },
  ],
};