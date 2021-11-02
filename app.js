const express=require('express');
const port=process.env.PORT||5000
const nodemailer=require('nodemailer');
const Userdata=require('./src/model/userdata')
const app=new express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set('view engine','ejs');
app.set('views','./src/views');

app.get('/',function(req,res){
    res.render('index')
})
// app.get('/main',function(req,res){
//     res.render('main',{
//         name:req.query.name

//     })
// })
app.post("/main", function(req, res) {

    const id = req.params.id;
    var item = {
        name: req.body.name,

        email: req.body.email,

    }
    let nam = item.name;
    console.log(nam);
    var user = Userdata(item);
    user.save((err, result) => {
        console.log(result)
        if (err) {} else {
            res.redirect(`main/${result._id}`)
        }

    });
    console.log(user._id)

});

app.get('/main/:id', function(req, res) {
    const id = req.params.id;
    var item = {
        name: req.body.name,

        email: req.body.email,

    }
    let nam = item.name;
    Userdata.findOne({ _id: id })
        .then(function(wish) {
            res.render('main', {
                nam,
                wish


            })

        })


})

app.post('/send/:id', (req, res) => {
    const id = req.params.id

    Userdata.findOne({ _id: id })
        .then(function(wish) {
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sa2184396@gmail.com',
                    pass: 'Akhil@1993'
                }
            });

            let mailDetails = {
                from: 'sa2184396@gmail.com',
                to: wish.email,
                subject: 'Happy Diwali ' + wish.name,
                text: 'hi ' + wish.name + ' , click the  link  to get your Diwali wishes.' +
                    ' https://diwaliwishing.herokuapp.com/main/' + wish._id

            };

            mailTransporter.sendMail(mailDetails, function(err, data) {
                if (err) {
                    console.log(err)
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                    res.send("<h1 style='text-align:center; color:green; background-color:yellow;'>Please check  Mail</h1>")
                  
                }
            });



        })

})

app.listen(port,()=>{
    console.log("server ready at"+port)
});