export default function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user.role){
            return res.status(401).send({success:false,message:"Unauthorized Request"})
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).send({success:false,message:"Access Denied"})
        }

        next()
    }
}