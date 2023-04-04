const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const menuItemModel = require('./../models/menuItem.model');

const createMenuItem = async ({ item, category, season, sellingPrice, preparingTime, manual, rawMaterial, itemDetails }) => {
  const createdMenuItem = await menuItemModel.create({
    item,
    category,
    season,
    sellingPrice,
    preparingTime,
    manual,
    rawMaterial,
    itemDetails
  });

  return createdMenuItem;
};

const getAllMenuItem = async (query) => {
  const { category, season, tags, nutriScore, classifyStatus, time, selling_price, total_sold, total_cost, total_profit } = query;



  //  console.log(category,season,tags,nutriScore,classifyStatus,time,selling_price,total_sold,total_cost,total_profit)


  if (category == "" && season == "" && tags == "" && nutriScore == "" && classifyStatus == "" && time == "" && selling_price == "" && total_sold == "" && total_cost == "" && total_profit == "") {

    const getAllMenuItem = await menuItemModel.find();
    return getAllMenuItem;
  }

  else if (category !== "" && season !== "" && tags !== "" && nutriScore !== "" && classifyStatus !== "" && time !== "" && selling_price !== "" && total_sold !== "" && total_cost !== "" && total_profit !== "") {

    const tagsArr = tags.split(",")
    const nutriScoreArr = nutriScore.split(",")
    const classifyStatusArr = classifyStatus.split(",")
    const timeArr = time.split(",").map(Number)
    const selling_priceArr = selling_price.split(",").map(Number)
    const total_soldArr = total_sold.split(",").map(Number)
    const total_costArr = total_cost.split(",").map(Number)
    const total_profitArr = total_profit.split(",").map(Number)

    console.log(tagsArr, nutriScoreArr, classifyStatusArr, timeArr, selling_priceArr, total_soldArr, total_costArr, total_profitArr)

    const getAllMenuItem = await menuItemModel.find();
    return getAllMenuItem;
  }
  else if (category == "" || season == "" || tags == "" || nutriScore == "" || classifyStatus == "" && time == "" || selling_price == "" || total_sold == "" || total_cost == "" || total_profit == "") {
    // console.log("hello")

    const tagsArr = tags.split(",")
    const nutriScoreArr = nutriScore.split(",")
    const classifyStatusArr = classifyStatus.split(",")
    const timeArr = time.split(",").map(Number)
    const selling_priceArr = selling_price.split(",").map(Number)
    const total_soldArr = total_sold.split(",").map(Number)
    const total_costArr = total_cost.split(",").map(Number)
    const total_profitArr = total_profit.split(",").map(Number)
    // console.log(typeof (timeArr[0]))

    console.log(tagsArr, nutriScoreArr, classifyStatusArr, timeArr, selling_priceArr, total_soldArr, total_costArr, total_profitArr)

    if (category == "" && season == "" && tags == "" && nutriScore == "" && classifyStatus == "") {
console.log("all")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } }] });
      return getAllMenuItem;
    }

    else if (category == "" && season == "" && tags == "") {
      console.log("nutriscore is given only")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}}] });
      return getAllMenuItem;
    }

    else if (category == "" && season == "" && nutriScore == "") {
      console.log("Tags is given only")
      // console.log(tagsArr)
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.tag":{$in:tagsArr}}] });
      // const getAllMenuItem = await menuItemModel.find({"itemDetails.tag":{$in:tagsArr}} );
      return getAllMenuItem;
    }
    else if (season == "" && nutriScore == "" && tags == "") {
      console.log("category is given only")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{category:category}] });
      return getAllMenuItem;
    }
    else if (category == "" && nutriScore == "" && tags == "") {
      console.log("season is given only")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{season:season}] });
      return getAllMenuItem;

    }
    // else if (category == "" && season == "" && tags == "") {
    //   console.log("nutriscore is given only")
    //   const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":"A"}] });
    //   return getAllMenuItem;

    // }
    else if (category == "" && season == "") {
      console.log("nutriscore and tags is given")
       const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}},{"itemDetails.tag":{$in:tagsArr}}] });
      return getAllMenuItem;
    }
    else if (season == "" && nutriScore == "") {
      console.log("category and tags is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{category:category},{"itemDetails.tag":{$in:tagsArr}}] });
      return getAllMenuItem;
    }
    else if (nutriScore == "" && tags == "") {
console.log("category and season is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{category:category},{season:season}] });
      return getAllMenuItem;

    }
    else if (category == "" && nutriScore == "") {
console.log("season and tags is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{season:season},{"itemDetails.tag":{$in:tagsArr}}] });
      return getAllMenuItem;

    }
    else if (category == "" && tags == "") {
console.log("season and nutriscore is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}},{season:season}] });
      return getAllMenuItem;

    }
    else if (season == "" && tags == "") {
console.log("category and nutriscore is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}},{category:category}] });
      return getAllMenuItem;

    } else if (category == "") {
      console.log("nutriscore,season and tags is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}},{"itemDetails.tag":{$in:tagsArr}},{season:season}] });
      return getAllMenuItem;
    }
    else if (season == "") {
console.log("category,nutriscore and tags is given")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}},{"itemDetails.tag":{$in:tagsArr}},{category:category}] });
      return getAllMenuItem;

    }
    else if (nutriScore == "") {
      console.log("nutriscore is not given only")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{category:category},{"itemDetails.tag":{$in:tagsArr}},{season:season}] });
      return getAllMenuItem;
    }
    else if (tags == "") {
      console.log("tags is not given only")
      const getAllMenuItem = await menuItemModel.find({ $and: [{ sellingPrice: { $gte: selling_priceArr[0], $lte: selling_priceArr[1] } }, { preparingTime: { $gte: timeArr[0], $lte: timeArr[1] } },{"itemDetails.nutriScore":{$in:nutriScoreArr}},{season:season},{category:category}] });
      return getAllMenuItem;
    }
  }
};
const getMenuItem = async ({ id }) => {
  const getAllMenuItem = await menuItemModel.findById(id);

  return getAllMenuItem;
};
const updateMenuItem = async ({ id, body }) => {
  const updatedMenuItem = await menuItemModel.findByIdAndUpdate(id, body, { new: true });

  return updatedMenuItem;
};

const deleteMenuItem = async ({ id }) => {
  await menuItemModel.findByIdAndDelete(id);
};

module.exports = {
  createMenuItem,
  getAllMenuItem,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem
};