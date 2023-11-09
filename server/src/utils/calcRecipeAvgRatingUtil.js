const StarRating = require('../models/StarRating');

exports.calcAvgRating = async (recipe) => {
    const totalRatings = recipe.ratings.length;

    let totalRatingsSum = 0;

    const ratingPromises = recipe.ratings.map(async (x) => {
        const rating = await StarRating.findById(x);
        totalRatingsSum += rating.value;
    });

    await Promise.all(ratingPromises);

    const averageRating = totalRatingsSum / totalRatings;

    return averageRating;
};