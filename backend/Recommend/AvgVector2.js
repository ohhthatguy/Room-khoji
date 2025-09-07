const averageVector = (vectors)=> {
  const len = vectors.length;
  const sum = vectors.reduce((acc, vec) =>
    acc.map((val, i) => val + vec[i]), new Array(vectors[0].length).fill(0)
  );
  return sum.map(val => val / len);
}

export default averageVector