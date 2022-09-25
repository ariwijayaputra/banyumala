
function checkAutinticated(req, res, next){
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next()
    }else{
        console.log("not auth")
        
    }
    
}
function checkRoleMember( req, res, next){
    if(req.user.id_role == 3){
        if(req.params.id == req.user.id_user){
            return next()
        }
        return res.redirect(301,'/member/'+String(req.user.id_user))
    }
    else if(req.user.id_role == 2){
        return res.redirect(301,'/bumdes/')
    }
    else if(req.user.id_role == 1){
        return res.redirect(301,'/admin/')
    }
}
function checkRoleAdmin( req, res, next){
    
    if(req.user.id_role == 1){
        console.log("admin");
        return next()
    }
    else if(req.user.id_role == 2){
        console.log("not admin")
        return res.redirect(301,'/bumdes/')
    }
    else if(req.user.id_role == 3){
        console.log("not admin")
        return res.redirect(301,'/member/'+String(req.user.id_user))
    }
}
function checkRoleBumdes( req, res, next){
    if(req.user.id_role == 2){
        return next()
    }
    else if(req.user.id_role == 1){
        return res.redirect(301,'/member/'+String(req.user.id_user))
    }
    else if(req.user.id_role == 1){
        return res.redirect(301,'/admin/')
    }
}
module.exports = {
    checkAutinticated,
    checkRoleAdmin,
    checkRoleBumdes,
    checkRoleMember
}