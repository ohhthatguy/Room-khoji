function encodeWater(water) { //[24hrs, once/week,twice/week]
  if (!water) return 0;
  console.log(water)
  const val = water.toLowerCase();
  if (val.includes("24")) return 2.0;
  if (val.includes("twice")) return 1.5;
  if (val.includes("once")) return 0.5;
  return 0; // fallback
}

function encodePeople(people) { //[student,family, couple ]
  if (!people) return 0;
  const val = people.toLowerCase();
  if (val.includes("couple")) return 0.5;
  if (val.includes("student")) return 2.0;
  if (val.includes("family")) return 1.5;
  return 0;
}



const buildUserVector = (user) =>{
  const temp = [
   
    encodeWater(user.Water),
    user.Parking?.toLowerCase().includes("spacious") ? 2.0 : 0.5,
    user.Pets?.toLowerCase().includes("not") ? 0.5 : 2.0,
    encodePeople(user.People)
  ];

  // let k = temp.flatMap(x=>x)
  return temp;
}

module.exports= buildUserVector