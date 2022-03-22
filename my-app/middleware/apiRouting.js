const RoleModel = require("../models/roles");
const jwt = require('jsonwebtoken');

const getAccessRoutes = async (req, res, next, Name) => {
    const authHeader = req.headers["authorization"];
    let isEmpty = true;
    if (!!authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            var decoded = jwt.verify(token, "AppointmentBooking");
            const result = await RoleModel.findById({ _id: decoded.role._id });
            isEmpty = Object.keys(result).length === 0;
            if (!isEmpty) {
                if (Name === 'Check') {
                    next();
                } else {
                    if (result.name == Name) {
                        next();
                    }
                }


            }
        } catch (ex) {
            unauthorized(res);
        }

    } else {
        unauthorized(res);
    }
}

const unauthorized = (res) => {
    return res.status(401).send({
        erorr: "Unauthorized Access",
    });
}

export const adminRoute = async (req, res, next) => {
    getAccessRoutes(req, res, next, 'Super Admin');
};

export const ShopOwnerRoutes = async (req, res, next) => {
    getAccessRoutes(req, res, next, 'Shop Owner');
}

export const userRoutes = async (req, res, next) => {
    getAccessRoutes(req, res, next, 'User');
}

export const chkForValidToken = async (req, res, next) => {
    getAccessRoutes(req, res, next, 'Check');
}