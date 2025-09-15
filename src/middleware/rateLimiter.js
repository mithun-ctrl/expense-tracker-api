import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const identifier = req.ip || "global";
        const { success } = await ratelimit.limit(identifier);

        if(!success) {
            return res.status(429).send({
                message: "Too many requests, try again later.",
            });
        }
        next();
    }catch (e) {
        console.log("error rate limiter", e);
        next(e);
    }
}

export default rateLimiter;