class RoomsController{
    async create(req,res){
        //room creation
        const {topic,roomType} = req.body;

        if(!topic || !roomType){
            return res.status(400).json({
                message:"All fields are required"
            })
        }


    }
}

module.exports = new RoomsController();