function encodeWater(water) { //[24hrs, once/week,twice/week]
  if (!water) return 0;
  console.log(water)
  const val = water.toLowerCase();
  if (val.includes("24")) return [1,0.2,0.5];
  if (val.includes("twice")) return [1,0.2,1];
  if (val.includes("once")) return [1,1,1];
  return 0; // fallback
}

function encodePeople(people) { //[student,family, couple ]
  if (!people) return 0;
  const val = people.toLowerCase();
  if (val.includes("couple")) return [0.5,1,0.2];
  if (val.includes("student")) return [1,0.2,0.5];
  if (val.includes("family")) return [0.5,1,0.2];
  return 0;
}



const buildUserVector = (user) =>{
  const temp = [
    parseInt(user.Quantity) >2 ? 1: parseInt(user.Quantity) == 2 ? 0.5 : 0.25,
    0, // rate is filtered, not used in similarity
    encodeWater(user.Water),
    user.Parking?.toLowerCase().includes("spacious") ? 1 : 0,
    user.Pets?.toLowerCase().includes("not") ? 0 : 1,
    encodePeople(user.People)
  ];

  let k = temp.flatMap(x=>x)
  return k;
}

module.exports= buildUserVector