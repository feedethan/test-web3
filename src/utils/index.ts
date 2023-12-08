export const fibonacci = (n: number) => {
  let n1 = 1,
    n2 = 1,
    sum;
  for (let i = 2; i < n; i++) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
};
