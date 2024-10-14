import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Request } from "express";
import { _ } from "../helpers/locale.helper";
import User from "../models/user.model";
import bcrypt from "bcrypt";

// We use that strategy to authenticate users with their username and password and get a token.
export const localStrategy = new LocalStrategy(
	{
		usernameField: "name",
		passReqToCallback: true,
	},
	(req: Request, username: any, password: any, done: any) => {
		User.findOne({ name: username }).then((user) => {
			if (!user) {
				console.log(_(req, "auth", "INVALID_CREDENTIALS"));
				return done(null, false, {
					message: _(req, "auth", "INVALID_CREDENTIALS"),
				});
			}
			bcrypt
				.compare(password + process.env.PASSWORD_SALT, user.password)
				.then(function (result: any) {
					return done(null, user);
				})
				.catch((err) => {
					console.log(_(req, "auth", "INVALID_CREDENTIALS"));
					return done(null, false, {
						message: _(req, "auth", "INVALID_CREDENTIALS"),
					});
				});
		});
		// .catch((err) => {
		// 	return done(null, false, { message: "User does not exist" });
		// });
	}
);

// We use that strategy accessing protected routes with the token.
export const jwtStrategy = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: "secret",
	},
	function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.sub }, function (err: any, user: any) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
				// or you could create a new account
			}
		});
	}
);
