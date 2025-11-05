// import averageVector from "../Recommend/AvgVector2";
const getRoomVector = require("./RoomVector1");
const euclideanDistance = require("./EuclidAlgo");
const haversine = require("./HaverSine");
const generateWeightsFromPrefs = require("./UserPref");
const buildUserVector = require("./UserVector");

// const Recommend = (roomList) => {
//   const rates = roomList.map(r => parseFloat(r.Rate));
//   const minRate = Math.min(...rates);
//   const maxRate = Math.max(...rates);

//   const vectorizedRooms = roomList.map(room => ({
//     room,
//     vector: getRoomVector(room, minRate, maxRate)
//   }));

//   const idealVector = averageVector(vectorizedRooms.map(r => r.vector));

//   const ranked = vectorizedRooms.map(r => ({
//     ...r,
//     distance: euclideanDistance(r.vector, idealVector)
//   })).sort((a, b) => a.distance - b.distance); // Closest = most similar

//   console.log(ranked)
// //   return ranked.map(r => r.room);
// }

function cosineSimilarity(a, b) {
  let dot = 0,
    magA = 0,
    magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function priceScore(userPrice, roomPrice) {
  if (roomPrice > userPrice) return 0;
  return (userPrice - roomPrice) / userPrice; // 0 to 1
}

function locationScore(roomDistance, preferredDistance) {
  return Math.max(0, 1 - roomDistance / preferredDistance);
}

const FilterByRate = (rooms, userPref) =>
  rooms.filter((r) => parseInt(r.Rate) <= parseInt(userPref.Rate));

const Recommend = (rooms, userPref) => {
  //filter

  //1. first get the rooms with right price
  const [userLat, userLng] = userPref?.Location?.split(",")
    .map((str) => str.trim()) // remove whitespace
    .map(Number) // convert to numbers
    .filter((val) => !isNaN(val));

  const radius = userPref.radius || 10;

  console.log(userLat, userLng, radius);

  let filteredByRate = [];

  do {
    filteredByRate = FilterByRate(rooms, userPref);
    if (filteredByRate.length === 0) {
      //minum starting 10000, user rate=11000
      userPref.Rate = parseInt(userPref.Rate) + 10000;
    }
  } while (filteredByRate.length === 0);

  // console.log("Filter by price= ", FilterByRate)

  const finalByRate = [...filteredByRate].sort(
    (a, b) => Number(a.Rate) - Number(b.Rate)
  );

  //2. get all the rooms between the range
  // const filteringForHaversine = filteredByRate.filter((r) => {
  //   const [lat, lng] = r.Location.split(",")
  //     .map((str) => str.trim())
  //     .map(Number)
  //     .filter((val) => !isNaN(val));

  //   console.log("///HaverSine Value//");
  //   console.log(` ${r.Description}:  ${haversine(userLat, userLng, lat, lng)}`);
  //   return haversine(userLat, userLng, lat, lng) <= radius;
  // }); //for 15km radius

  const filteringForHaversine = filteredByRate
    .map((r) => {
      const [lat, lng] = r.Location.split(",")
        .map((str) => str.trim())
        .map(Number);

      const distance = haversine(userLat, userLng, lat, lng);

      console.log("///HaverSine Value//");
      console.log(`${r.Description}: ${distance}`);

      return { ...r, distance }; // attach distance temporarily
    })
    .filter((r) => r.distance <= radius) // filter by radius
    .sort((a, b) => a.distance - b.distance); // ascending order

  // console.log("Filter by haversine= ", filteringForHaversine);
  //     const byDistance = filteringForHaversine;
  // const finalByRate = [...filteringForHaversine].sort((a, b) => Number(a.Rate) - Number(b.Rate));

  //3.  now build the room vector, :
  const userVector = buildUserVector(userPref);
  console.log("///userVEctor////");
  console.log(userVector);
  console.log("///userVEctor////");

  console.log("///EculidDistance//");
  const filteringWithEculidian = filteringForHaversine.map((room) => {
    const roomVector = getRoomVector(room?._doc);

    const [lat, lng] = room?._doc.Location.split(",")
      .map((str) => str.trim())
      .map(Number)
      .filter((val) => !isNaN(val));

    const cosine = cosineSimilarity(userVector, roomVector);

    //  find match score

    const price = priceScore(userPref.Rate, room?._doc.Rate);

    const roomDistance = haversine(userLat, userLng, lat, lng);

    const location = locationScore(roomDistance, radius);

    const score = cosine * 0.6 + price * 0.2 + location * 0.2;

    return {
      room,
      score,
    };
  });
  console.log("///EculidDistance//");

  console.log("///Final List before sort//");

  const finalByDistance = filteringForHaversine.map((r) => {

    return {room: r._doc, distance: r.distance}
  });


  console.log("///Final List before sort//");

  console.log("///Final List //");

  // console.log(filteringWithEculidian[0])
 const formatted = filteringWithEculidian.map((e) => {
  const roomObj = e.room ? e.room._doc : e._doc;      // take _doc safely
  const distance = e.room ? e.room.distance : e.distance; 
  const score = e.score ?? 0;                        // default to 0 if missing

  return { room: roomObj, distance, score };
});




  console.log("///Formatted //");

  // console.log(formatted);

  console.log("///Formatted //");

  //  sort filtered rooms based on match_score
  const finalList = formatted
    .sort((a, b) => Number(b.score) - Number(a.score))
    .map((e) => {
      if (!e || !e.room) return null; // skip invalid entries
      return {
        ...e.room,
        score: e.score, // safer name
      };
    });

  

  console.log("///Final List //");

  const k = {finalByRate, finalByDistance, finalByScore: finalList }

  return k;
};

module.exports = Recommend;
