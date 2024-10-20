export const jwtTokenCookieOptions = {
	maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? "0"),
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: true,
};
