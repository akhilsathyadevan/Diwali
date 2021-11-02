const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@akhilprojectfiles.wnbnw.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const schema=mongoose.Schema;
const userSchema=new schema({
    name:String,
    email:String
})
var userdata=mongoose.model('userdata',userSchema);
module.exports=userdata;