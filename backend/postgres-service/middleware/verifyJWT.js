import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload to request
        req.user = {
            user_id: decoded.user_id,
            role: decoded.role,
            vessel_id: decoded.vessel_id || null,
            plant_id: decoded.plant_id || null
        };

        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
