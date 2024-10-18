import { sign } from "jsonwebtoken";

export const createJWTToken = (user: any): string => {
	return sign({ iss: "hb3nce04", id: user._id }, process.env.JWT_SECRET || "", {
		expiresIn: process.env.JWT_LIFETIME,
	});
};
