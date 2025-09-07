// import averageVector from "../Recommend/AvgVector2";
const getRoomVector = require("./RoomVector1");
const euclideanDistance  =  require("./EuclidAlgo");
const haversine  =  require("./HaverSine");
const generateWeightsFromPrefs  =  require("./UserPref");
const buildUserVector  =  require("./UserVector");


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

  const FilterByRate =(rooms, userPref )=> rooms.filter(r => parseInt(r.Rate) <= parseInt(userPref.Rate));


const Recommend = (rooms, userPref)=> {
  //1. first get the rooms with right price
  const [userLat, userLng] = userPref.Location.split(',')
  .map(str => str.trim())          // remove whitespace
  .map(Number)                     // convert to numbers
  .filter(val => !isNaN(val)); 
  const radius = userPref.radius || 100;

  console.log(userLat, userLng, radius)

 let filteredByRate = [];

do {
  filteredByRate = FilterByRate(rooms, userPref);
  if (filteredByRate.length === 0) { //minum starting 10000, user rate=11000
    userPref.Rate = (parseInt(userPref.Rate) + 10000); 
  }
} while (filteredByRate.length === 0);

  //2. get all the rooms between the range 
   const filteringForHaversine= filteredByRate.filter(r => {
      const [lat, lng] = r.Location.split(',')
  .map(str => str.trim())          
  .map(Number).filter(val => !isNaN(val));

   console.log("///HaverSine Value//")
      console.log(` ${r.Description}:  ${haversine(userLat, userLng, lat, lng)}`)
      return haversine(userLat, userLng, lat, lng) <= radius;}) //for 10km radius

       console.log("///filteringForHaversine//")
      console.log(filteringForHaversine)
  console.log("///filteringForHaversine//")


    //3. if only need according to distance, sort this "filteringForHaversine" data by ascending and return it



    //4. else now build the vector, first build the ideal room vector:

    // [quantity,0,water(24),water(once),water(twice),parking,pets,'people(student),'people(family),'people(couple)]

    const weights = generateWeightsFromPrefs(userPref);
  console.log("///generateWeightsFromPrefs////")
  console.log(weights)
  console.log("///generateWeightsFromPrefs////")



    //4. else now build the vector, first build the ideal room vector i.e the user vector:
  const userVector = buildUserVector(userPref);
  console.log("///userVEctor////")
  console.log(userVector)
  console.log("///userVEctor////")

  //4.  now build the room vector, :

console.log("///EculidDistance//")
  const filteringWithEculidian = filteringForHaversine.map(room => {
      const roomVector = getRoomVector(room);
       

      console.log(`${room.Description} ${euclideanDistance(userVector, roomVector)}`)
      return {
        room,
        score: euclideanDistance(userVector, roomVector) // lower is better
      };
    })
console.log("///EculidDistance//")

console.log("///Final List before sort//")

    const finalListbeforeSort = filteringWithEculidian.map(r => r.room);

    finalListbeforeSort.map((e)=> {
              console.log(`${e.Description}`)

    })

console.log("///Final List before sort//")

console.log("///Final List //")



  const finalList = filteringWithEculidian.sort((a, b) => a.score - b.score)
    .map(r => r.room);
      finalList.map((e)=> {
              console.log(`${e.Description}`)

    })

console.log("///Final List //")




  return finalList
}


module.exports = Recommend
