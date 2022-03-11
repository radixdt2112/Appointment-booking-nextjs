const ReviewModel = require('../models/review');

export const getReviews = async (req, res) => {
    const result = await ReviewModel.find().select('-__v').populate('role', '-__v -createdAt -updatedAt');
    return res.send(result);
};

export const getReviewById = async (req, res) => {
    const result = await ReviewModel.findById(req.query.id).select('-__v -createdAt');
    console.log(result);
    if (!result) {
        return res.send('error');
    } else {
        return res.send(result);
    }

};

export const addReview = async (req, res) => {

    // const result = await ReviewModel.find({ email: { $in: [req.body.email] } });

    // if (result.length == 0) {
    const reviewObj = new ReviewModel(req.body);
    try {
        const result = await reviewObj.save();
        res.send(result);
    } catch (ex) {
        console.log(ex);
        res.status(400).send('Error');
    }
    // } else {

    // }


}

export const updateReview = async (req, res) => {
    try {
        const result = await ReviewModel.findByIdAndUpdate(req.query.id, {
            $set: req.body
        }, { new: true });
        res.send(result);

    } catch (e) {
        res.status(400).send("Error");
    }

};

export const deleteReview = async (req, res) => {
    try {
        const result = await ReviewModel.findByIdAndDelete(req.query.id);
        res.send(`User Id:${req.query.id}  Deleted Successfully `);
    } catch {
        return res.send("Not Found Id");
    }
}