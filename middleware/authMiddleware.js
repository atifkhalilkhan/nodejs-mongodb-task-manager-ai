import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next)=>{
    
    const autHeader = req.headers.authorization

    if(!autHeader || !autHeader.startsWith('Bearer ')){
        return res.status(401).json({msg: "No Token Provided"})
    }
    
    const token = autHeader.split(' ')[1]
    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = {id: decoded.id}

        next()
            
    } catch (error) {
    return res.status(401).json({msg: "Invalid or expired token"})

    }
}

export default authMiddleware