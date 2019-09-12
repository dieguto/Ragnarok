const middleware = (req, res, next) =>{

   if(req.session.email){
      session.cookie.maxAge += 10 * 1000;
   }

   next();
};