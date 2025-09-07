


// const euclideanDistance = (a,b,weights)=> {
//     return Math.sqrt(a.reduce((sum, val, i) => {
//     const diff = val - b[i];
//     return sum + weights[i] * diff * diff;
//   }, 0));

// //    return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
// }

function euclideanDistance(vec1, vec2) {
  let sum = 0;
  for (let i = 0; i < vec1.length; i++) {
    const diff = vec1[i] - vec2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

module.exports = euclideanDistance