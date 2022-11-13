const express = require("express"); 
const app = express(); 
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer"); 

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(3000, function() {
    console.log("listening on port 3000"); 
}); 

app.post('/', function(req, res) {
    let email = req.body.email;
    let fname = req.body.fname; 
    let lname = req.body.lname; 
    let answer = req.body.answer;
    addEmailToMailchimp(email, fname, lname, answer);

    var transporter = nodemailer.createTransport(
      {
        service: "gmail", 
        auth: {
          user: "luistest27@gmail.com", 
          pass: "pbpmfgvaoumdtzyw"
        }
      }
    )
    
    // Thank you! Submitted. Check your spam folder if email is not received wihithin one hour.
    var mailOptions = {
      from : 'luistest27@gmail.com', 
      to: 'luistest27@gmail.com', 
      subject: 'Welcome to my mailing list', 
      html: `<h1>Hello ${fname}!</h1>,
      <img src= "cid:welcome"/>

      <p>Thanks for registering for my email list!</p>

      I want to help you with your issue. You had said "${answer}"
      
      <h2>As promised, attached is the copy of your free book, Happy Gay Christian Hereafter.</h2>
  
      ..link...
    
      Reply to this email if you have any questions. I'm here to help!
      
      best,
      
      Carter`,
      attachments: [
        {
        filename: 'book.png', 
        path: "./public/book.png"
      }, 
      {
        filename: 'welcome-page.jpg', 
        path: "./public/welcome-page.jpg",
        cid: "welcome"
      }
    ]
    
    }
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent" + info.response)
      }
    }); 
    
  });

// 17 and a303c7223d fbbb839a40
function addEmailToMailchimp(email, fname, lname, answer) {
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://us21.api.mailchimp.com/3.0//lists/a303c7223d/members',
      'headers': {
        'Authorization': 'Basic e4c5da6f8a9ea8df6fb5b6b826a0868a-us21',
        'Content-Type': 'application/json',
        'Cookie': 'ak_bmsc=1AABD22109A167F032A0E521A03CFD20~000000000000000000000000000000~YAAQxSABF2R7oz2EAQAAamlUPxF0sUv66AOyw07bqX+3hI8cDn3TjXEzxWco4JBQUS0c9fmCcKyLvA1jbtBX7fsygPsz8XJZhumYQOQEFOEcWr8mKUXHweZMuINUGuVhXpQ8MdVDwKSx7pHFFN7vEHl/Ine3iQLbSByzPSKLJ4s/l12pvc6ls5h3CIUupWuFNne3/vu9AKWFzee+HPcAHzqCeL0ZYNkEsYklnm7tEJM+VbLhwHzCbOPQdtRbKrl2rjVmuoiuEsDzCyEdWep+b5wAUQkC2Aa4X4nJKwsdhtKaexQXdHMVM7JP2upokauzFj1VBJK/+YM77ys3PI3N4iv2AbH6JhQIxdrqat9ZaBvKFL3vqvR1iE0nEgsr9twdDJM=; bm_sv=1A894FD2F09E842E6B8993A76799E37B~YAAQCqvbF9JrnDyEAQAA7t9tPxHggze36EB6313wnSVXvSVl3C0GHHvpOGHUxz5c/gdBDAxTWfVYuI0w/Rr7hBmqb0ti1H/zE0liJ+mwb5c1Vdj6EUYE0GuO5p61U33OAMJIB59+gmU5Pn9f5xPgqsZGmCoqtGcddUchi27fHCV/TQKEkC2AqQ5NQgnMMgfB0xpm/+TsUJzLK1udJsGRr7jmy8KNunhQjgZtXsMRuE22DvaVPyn2pOxzzYPK4s9gjWhlk8nvK+w=~1'
      },
      body: JSON.stringify({
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
          "FNAME": fname,
          "LNAME": lname,
          "ANSWER": answer
        }
      })
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
}