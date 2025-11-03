const ImageModel = require("../model/image/image");
const accountModel = require("../model/account/account");
const postModel = require("../model/account/post");
const Click = require("../model/Clicked");
const favouriteModel = require("../model/favourite");
const rentedModel = require("../model/rented_product/rented");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Recommend = require("../Recommend/Recommend");

const cloudinary = require("../Middleware/cloudinaryUpload");
const upload = require("../Middleware/upload");
const sendMailFunction = require("../Middleware/authorizeEmail");
const sendMailFunctionByResendAPI = require("../Middleware/authEmailResend");

const streamUpload = (buffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

const createNewAccount = async (req, res) => {
  try {
    const hashedPswrd = await bcrypt.hash(req.body.password, 10);
    const hashedUser = { ...req.body, password: hashedPswrd };

    let response = new accountModel(hashedUser);

    await response.save();
    return res.status(200).json({ msg: "data save sucesfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "data did not save sucesfully. ERROR: ", err });
  }
};

const otpAuth = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const subject = "Confirm Your Account";

    const code = Number(
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "9")
    );

    const message = `<p1>Here is your otp for <strong>Room Khoji.</strong><br/><h1>OTP: <strong>${code}<strong> </h1>`;

    sendMailFunction(userEmail, subject, message); //nodemailer
    // sendMailFunctionByResendAPI(userEmail, subject, message); //resend not working

    console.log("Code backedn: ", code);
    return res.status(200).json({ msg: "OTP sent sucesfully", code });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "OTP did not sent sucesfully. ERROR: ", err });
  }
};

const checkLogIn = async (req, res) => {
  const response = await accountModel.findOne({ email: req.body.email });
  if (!response) {
    return res
      .status(404)
      .json({ msg: "there is no account with such email." });
  }
  try {
    let isValid = await bcrypt.compare(req.body.password, response.password);
    if (isValid) {
      const accessToken = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_ACCESS_KEY,
        { expiresIn: "10s" }
      );
      const refreshToken = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_REFRESH_KEY,
        { expiresIn: "1h" }
      );
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("accessToken", accessToken, {
        maxAge: 10000,
        httpOnly: true,
        secure: isProduction, // Only true in production
        sameSite: isProduction ? "none" : "lax",
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction, // Only true in production
        sameSite: isProduction ? "none" : "lax",
      });
      // after confirming the valid user and also saving the token return back the accesstoken, refershtoken, name and email to frontend for us to use it
      let data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        response: response,
      };
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ msg: `Password doesn't match !` });
    }
  } catch (err) {
    return res.status(500).json({ msg: `error while login in with data` });
  }
};

const saveProfilePicture = async (req, res) => {
  // console.log(req.file.filename);
  // console.log(req.files[0])

  try {
    let response = new ImageModel({ image: req.file.filename });

    await response.save();
    // console.log("here1");

    return res.status(200).json({ msg: "data save sucesfully" });
  } catch (err) {
    // console.log('here2')
    return res
      .status(500)
      .json({ msg: "data did not save sucesfully. ERROR: ", err });
  }
};

const getProfilePicture = async (req, res) => {
  try {
    // console.log(req)
    const response = await accountModel.findOne({
      profile: req.params.profile,
    });

    if (!response) {
      return res.status(404).json({ msg: "no such image" });
    }
    let profilePic = `${process.env.BACKEND_URL}/profile/${response.profile}`;
    console.log(profilePic);

    return res.status(200).json(profilePic);
  } catch (err) {
    return res.status(500).json("error", err);
  }
};

const getGharbetiById = async (req, res) => {
  // console.log(req.query)
  try {
    const response = await accountModel.find({ _id: { $in: req.query.id } }); //lot of id i.e id:ids

    if (response.length > 0) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ msg: "data none" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "some error from server side" });
  }
};

const getProductPicture = async (req, res) => {
  if (!req.files) {
    return res.status(404).json({ msg: "no files were found to upload" });
  }

  try {
    // const result = await streamUpload(req.file.buffer);
    // Upload all files in parallel
    const uploadPromises = req.files.map((file) =>
      streamUpload(file.buffer, "profile")
    );
    const urls = await Promise.all(uploadPromises);

    res.json(urls); // array of Cloudinary URLs
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }

  // let endPoints = [];
  // req.files.map((e) => {
  //   endPoints = [
  //     ...endPoints,
  //     `${process.env.BACKEND_URL}/profile/${e.filename}`,
  //   ];
  // });
  // // console.log(endPoints)

  // return res.status(200).json(endPoints);
};

const savePost = async (req, res) => {
  // console.log(req.body)

  try {
    let response = new postModel(req.body);

    await response.save();
    return res.status(200).json({ msg: "post saved/updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getPostsOfId = async (req, res) => {
  // console.log(req.query)
  try {
    let response;
    if (req.query.postId) {
      response = await postModel.find({ _id: req.query.postId });
    } else {
      response = await postModel.find({ Gharbeti_id: req.query.Gharbeti_id });
    }

    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ msg: "data none" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "some error from server side" });
  }
};

const deletePostsOfId = async (req, res) => {
  try {
    let response = await postModel.findOne({ _id: req.query._id });

    if (!response) {
      return res.status(404).json({ msg: "data to delete is not in database" });
    }

    await postModel.deleteOne({ _id: req.query._id });
    return res.status(200).json({ msg: "data is delete successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "error while deleting the blog is, " + err });
  }
};

const deleteScheduleOfId = async (req, res) => {
  try {
    let response = await rentedModel.findOne({ _id: req.query._id });

    if (!response) {
      return res.status(404).json({ msg: "data to delete is not in database" });
    }

    await rentedModel.deleteOne({ _id: req.query._id });
    return res.status(200).json({ msg: "data is delete successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "error while deleting the blog is, " + err });
  }
};

const updatePost = async (req, res) => {
  try {
    await postModel.findByIdAndUpdate(req.body._id, {
      $set: req.body,
    });

    return res.status(200).json({ msg: "post successfully updated!!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Reusable function (no res involved)
const findPostsByCategory = async (category) => {
  return await postModel.find({ Category: category });
};

// const getPostByCategory = async (req, res) => {
//   // console.log(req)
//   const userID = req.query.userID;
//   try {
//     const response = await postModel.find({ Category: req.query.Category });

//     if (response) {
//       return res.status(200).json(response);
//     } else {
//       return res.status(404).json({ msg: "data none" });
//     }
//   } catch (err) {
//     return res.status(500).json({ msg: "some error from server side" });
//   }
// };

//new one

const getPostByCategory = async (req, res) => {
  const userID = req.query.userID;
  const category = req.query.Category;

  try {
    // Get all rooms for the selected category
    const categoryRooms = await postModel.find({ Category: category });

    // Get sorted recommended rooms with count
    const recommendedRooms = await clickRecomendation(userID);
    // console.log("reco-return-room")
    // console.log(recommendedRooms)

    // Create a Set of recommended room IDs to avoid duplication
    const recommendedIds = new Set(
      recommendedRooms.map((r) => r._id.toString())
    );

    // Filter out category rooms that are already recommended
    const remainingRooms = categoryRooms.filter(
      (room) => !recommendedIds.has(room._id.toString())
    );

    // Combine: recommended first (sorted), then remaining
    const finalRooms = [...recommendedRooms, ...remainingRooms];
    const finalFilter = finalRooms.filter((e) => e.Category == category);
    // console.log(finalRooms)

    res.status(200).json(finalFilter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error in getPostByCategory" });
  }
};

//new one

const getRecommendedList = async (req, res) => {
  try {
    // console.log(req.query);
    const allCategoryList = await findPostsByCategory(req.query.Category);
    // console.log(allCategoryList)

    // console.log("/////////////after////////////")

    const tempData = Recommend(allCategoryList, req.query.userPrefData);
    // console.log(tempData)
    return res.status(200).json(tempData);
  } catch (err) {
    console.log(err);
  }
};

const saveFavouritePost = async (req, res) => {
  // console.log(req.query)
  const { Post_id } = req.query;
  const { Tenant_id } = req.query;

  try {
    let data = await favouriteModel.find({ Tenant_id: Tenant_id });

    if (data.length > 0) {
      if (!data[0].Post_id.includes(Post_id)) {
        //dont in list already
        req.query.Post_id = [...data[0].Post_id, Post_id];
      } else {
        //it is in list already
        let temp = data[0].Post_id.filter((item) => item !== Post_id);
        req.query.Post_id = temp;
      }
    }

    // console.log(req.query)

    let response = await favouriteModel.updateOne(
      { Tenant_id: Tenant_id },
      { $set: req.query },
      { upsert: true }
    );
    // console.log(response)

    return res.status(200).json({ msg: req.query.Post_id });
  } catch (err) {
    console.log("here1");
    return res.status(500).json(err);
  }
};

const getFavouritePost = async (req, res) => {
  //gets id of fav posts
  try {
    const response = await favouriteModel.find({ Tenant_id: req.query.id });

    if (response) {
      return res.status(200).json({ initializeBookmark: response });
    } else {
      return res.status(404).json({ msg: "data none" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "some error from server side" });
  }
};

const getFavDataFromFavPostId = async (req, res) => {
  try {
    // console.log('here' )

    // console.log(req.query.id )
    const response = await postModel.find({ _id: { $in: req.query.id } });
    // console.log(response)
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/////esewa

async function getEsewaPaymentHash(amount, transaction_uuid) {
  try {
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

    const secretKey = process.env.ESEWA_SECRET_KEY;
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
  } catch (error) {
    throw error;
  }
}

const getSignature = async (req, res) => {
  const { total_amount } = req.query;

  let transaction_uuid = uuidv4();
  //get hashed
  try {
    let hash = await getEsewaPaymentHash(total_amount, transaction_uuid);

    hash = {
      ...hash,
      transaction_uuid: transaction_uuid,
      total_amount: total_amount,
    };
    // console.log(hash)
    return res.status(200).json(hash);
  } catch (err1) {
    console.log("error at hasing: ", err1);
    return res.status(500).json(err1);
  }
};

async function verifyEsewaPayment(encodedData) {
  try {
    // decoding base64 code revieved from esewa
    let decodedData = atob(encodedData);
    decodedData = await JSON.parse(decodedData);

    console.log(decodedData);

    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

    const secretKey = process.env.ESEWA_SECRET_KEY;
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    //   console.log(hash);
    //   console.log(decodedData);

    if (hash !== decodedData.signature) {
      throw { message: "Invalid Info", decodedData };
    }

    //   console.log('here1')

    return decodedData;
  } catch (error) {
    throw error;
  }
}

const verifyPayment = async (req, res) => {
  const { data } = req.query;

  try {
    let response = await verifyEsewaPayment(data);

    // console.log(response)
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};

////

//save rented product
const saveRentedProduct = async (req, res) => {
  // console.log(req.body)
  try {
    let response = new rentedModel(req.body);
    await response.save();
    return res.status(200).json({ msg: "post saved/updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//sent mail after payment
const sendMailAfterPayment = async (req, res) => {
  try {
    const responseGharbeti = await accountModel.find({
      _id: { $in: req.body.Gharbeti_id },
    }); //lot of id i.e id:ids
    const responseTenant = await accountModel.find({
      _id: { $in: req.body.tenantID },
    }); //lot of id i.e id:ids

    if (responseGharbeti.length > 0 && responseTenant.length > 0) {
      const userEmail = responseTenant[0].email;
      const subject = "Contact Email of Landlord.";

      const LandlordEMail = responseGharbeti[0].email;

      const message = `<p1>Here is your Email for the Gharbeti You were looking for. <br/><h1>Email: <strong>${LandlordEMail}<strong> </h1>`;

      sendMailFunction(userEmail, subject, message); //nodemailer

      console.log("LandlordEMail: ", LandlordEMail);
      console.log("userEmail:", userEmail);

      return res
        .status(200)
        .json({ msg: "email after payment sent sucesfully" });
    } else {
      return res.status(404).json({ msg: "email after payment not sucesful" });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "some error from server side while sending email after payment",
      err,
    });
  }
};

const getRentedProduct = async (req, res) => {
  try {
    let response;
    if (req.query._id) {
      response = await rentedModel.find({ tenantID: req.query._id });
    } else {
      response = await rentedModel.find({});
    }

    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ msg: "data none" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "some error from server side" });
  }
};

const updateRentedProduct = async (req, res) => {
  const { updatedObject } = req.body;

  try {
    await rentedModel.findByIdAndUpdate(updatedObject._id, {
      $set: updatedObject,
    });

    return res.status(200).json({ msg: "Rented successfully updated!!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const clickRecomendation = async (userId) => {
  // Step 1: Get all clicks
  const allClicks = await Click.find();

  // Step 2: Build user -> room vector
  const userRoomMap = {}; // { userId: { roomId: count } }
  const roomSet = new Set();

  allClicks.forEach((click) => {
    const uid = click.userId.toString();
    const rid = click.roomId.toString();
    roomSet.add(rid);
    if (!userRoomMap[uid]) userRoomMap[uid] = {};
    userRoomMap[uid][rid] = (userRoomMap[uid][rid] || 0) + click.count;
  });

  // Step 3: Convert user vectors to same dimension
  const allRoomIds = Array.from(roomSet);

  const currentUserVector = allRoomIds.map(
    (rid) => userRoomMap[userId?._id]?.[rid] || 0
  );

  const similarityScores = []; // { userId, score }

  for (let otherUserId in userRoomMap) {
    if (otherUserId === userId._id) continue;

    const otherVector = allRoomIds.map(
      (rid) => userRoomMap[otherUserId][rid] || 0
    );

    //  console.log("otherVector: ", otherVector)
    const score = cosineSimilarity(currentUserVector, otherVector);

    if (score > 0) {
      similarityScores.push({ userId: otherUserId, score });
    }
  }

  // Step 4: Sort similar users by similarity
  similarityScores.sort((a, b) => b.score - a.score);

  // Step 5: Collect rooms they clicked that current user hasn't
  const clickedByUser = new Set(Object.keys(userRoomMap[userId._id] || {}));
  const roomScoreMap = {}; // { roomId: weightedScore }

  similarityScores.forEach(({ userId: otherId, score }) => {
    const rooms = userRoomMap[otherId];
    for (let roomId in rooms) {
      if (!clickedByUser.has(roomId)) {
        roomScoreMap[roomId] =
          (roomScoreMap[roomId] || 0) + score * rooms[roomId];
      }
    }
  });

  // Step 6: Sort rooms by score
  const sortedRoomIds = Object.entries(roomScoreMap)
    .sort((a, b) => b[1] - a[1])
    .map(([roomId]) => roomId);

  const getRoomIdsByCount = (userRoomMap, userId) =>
    Object.entries(userRoomMap[userId._id] || {})
      .sort((a, b) => b[1] - a[1])
      .map(([roomId]) => roomId);

  const userRoomIds = getRoomIdsByCount(userRoomMap, userId);

  const finalRoomIds = [...sortedRoomIds, ...userRoomIds];
  // Step 7: Fetch room details
  const recommendedRooms = await postModel.find({ _id: { $in: finalRoomIds } });

  const enriched = recommendedRooms.map((room) => {
    const id = room._id.toString();
    return { ...room.toObject(), score: roomScoreMap[id] || 0 };
  });

  return enriched.sort((a, b) => b.score - a.score);
};

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0; // avoid divide by zero

  return dotProduct / (magnitudeA * magnitudeB);
}

const registerClick = async (req, res) => {
  try {
    const { userId, postId } = req.query;

    try {
      // Option 1: Check if user already clicked this post before
      let click = await Click.findOne({ userId, roomId: postId });

      if (click) {
        // Increment count
        click.count += 1;
        await click.save();
      } else {
        // First time clicking — create new
        click = new Click({
          userId,
          roomId: postId,
          count: 1,
        });
        await click.save();
      }

      res
        .status(200)
        .json({ message: "Click registered", click, isSuccess: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something  error in registering click" });
  }
};

const getLocation = async (req, res) => {
  try {
    
    const { lat, lng } = req.body;

    try {
      // Option 1: Check if user already clicked this post before
      // let click = await Click.findOne({ userId, roomId: postId });
      const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();
      // console.log(data);

    return  res
        .status(200)
        .json({ address: data, isSuccess: true });

    } catch (error) {
    return  res.status(500).json({ error: error.message });
    }
  } catch (err) {
    console.error(err);
   return res.status(500).json({ message: "Something  error in registering click" });
  }
};

module.exports = {
  saveRentedProduct,
  getRentedProduct,
  verifyPayment,
  getSignature,
  getFavouritePost,
  getFavDataFromFavPostId,
  getPostByCategory,
  saveFavouritePost,
  getPostsOfId,
  createNewAccount,
  deletePostsOfId,
  checkLogIn,
  updatePost,
  saveProfilePicture,
  getGharbetiById,
  getProfilePicture,
  getProductPicture,
  savePost,
  getRecommendedList,
  clickRecomendation,
  registerClick,
  updateRentedProduct,
  deleteScheduleOfId,
  otpAuth,
  sendMailAfterPayment,
  getLocation
};
