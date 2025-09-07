// function encodeWater(water) {
//   if (!water) return 0;
//   const val = water.toLowerCase();
//   if (val.includes("24")) return 1;
//   if (val.includes("twice")) return 0.5;
//   if (val.includes("once")) return 0;
//   return 0; // fallback
// }

// function encodePeople(people) {
//   if (!people) return 0;
//   const val = people.toLowerCase();
//   if (val.includes("couple")) return 0;
//   if (val.includes("student")) return 0.5;
//   if (val.includes("family")) return 1;
//   return 0;
// }

// function getPeopleScore(roomPeople, userPrefPeople) {
//   const rp = roomPeople?.toLowerCase();
//   const up = userPrefPeople?.toLowerCase();

//   if (!rp || !up) return 0;

//   if (rp === up) return 1; // exact match
//   if ((rp === 'student' && up === 'family') || (rp === 'family' && up === 'student')) return 0.5;
//   if ((rp === 'student' || rp === 'family') && up === 'couple') return 0.3;
//   return 0; // least match
// }


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

function getRoomVector(room,userPref) {
    // [quantity,0,water(24),water(once),water(twice),parking,pets,'people(student),'people(family),'people(couple)]


  const temp =  [
    // parseInt(room.Quantity) || 0,
    parseInt(room.Quantity) >=2 ? 1: parseInt(room.Quantity) == 1 ? 0.5 : 0.25,
    0, // rate is not in similarity vector
    encodeWater(room.Water),
    room.Parking?.toLowerCase().includes("spacious") ? 1 : 0,
    room.Pets?.toLowerCase().includes("not") ? 0 : 1,
    encodePeople(room.People)
    //  getPeopleScore(room.People, userPref.People)
  ];

  let k = temp.flatMap(x=>x)
  return k;

}

const generateWeightsFromPrefs = (user) => {
  return [
    user.Quantity ? 1.2 : 0.8, // quantity
    0, // rate skipped
    user.Water?.toLowerCase().includes("24") ? 2 :
    user.Water?.toLowerCase().includes("twice") ? 1.5 : 1,
    user.Parking?.toLowerCase().includes("spacious") ? 1.5 : 1,
    user.Pets?.toLowerCase().includes("not") ? 0.5 : 2,
    user.People?.toLowerCase().includes("student") ? 1.2 :
    user.People?.toLowerCase().includes("couple") ? 1 :
    1.5
  ];
}


module.exports = getRoomVector