    // [quantity,0,water(24),water(once),water(twice),parking,pets,'people(student),'people(family),'people(couple)]


const generateWeightsFromPrefs = (user) => {

  return [
    1, // roomQuantity always 1
    0, // (unused slot)
    user.Water?.toLowerCase().includes("24") ? 2.0 :
      user.Water?.toLowerCase().includes("twice")? 1.5 : 1.0, // water availability
    user.Water?.toLowerCase().includes("once") ? 1.5 : 0.5, // waterOnce


    user.Water?.toLowerCase().includes("twice") ? 1.5 : 0.5, // waterTwice


    user.Parking?.toLowerCase().includes("spacious") ? 2.0 : 0.5, // parking

      user.Pets?.toLowerCase().includes("not") ? 2.0 : 0.5, // pets

    user.People?.toLowerCase().includes("student") ? 2.0 : 0.5,
    user.People?.toLowerCase().includes("family") ? 2.0 : 0.5,


     user.People?.toLowerCase().includes("couple") ? 2.0 : 0.5,

  ];



  // return [
  //   user.Quantity ? 1 : 0, // quantity
  //   0, // rate skipped

  //   user.Water?.toLowerCase().includes("24") ? 2 :
  //   user.Water?.toLowerCase().includes("twice") ? 1.5 : 1,

  //   user.Parking?.toLowerCase().includes("spacious") ? 1.5 : 1,

  //   user.Pets?.toLowerCase().includes("not") ? 0.5 : 2,

  //   user.People?.toLowerCase().includes("student") ? 1.2 :
  //   user.People?.toLowerCase().includes("couple") ? 1 :
  //   1.5
  // ];
}

module.exports= generateWeightsFromPrefs;