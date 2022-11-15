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
          user: "carterholmes2@gmail.com", 
          pass: "rekqrswevqhtujun"
        }
      }
    )
    
    var mailOptions = {
      from : 'carterholmes2@gmail.com', 
      to: `${email}`, 
      subject: 'Welcome to my mailing list', 
      html: `
      <br>
      <h1>Hey ${fname},</h1>
      <br>
      I'm so excited and honored, ${fname}, that you've requested the free copy of my book! Welcome to my mission of helping gay guys prepare for the long-term relationship of their dreams.
      <br>
      <br>

      Stick around! You'll receive a few emails over the next week. I want to give you free resources: 
      <br>
      <br>
      <ol>
      <li><strong>Understand the book</strong></li>
      <li><strong>Get an overview of how to work it yourself through a podcast or two</strong></li>
      <li><strong>See some case studies for yourself of clients who have turned their lives around!</strong></li>
      </ol>
      <br>
      <img src="cid:carter"/>
      <br>
      <br>
      Do you want to speak with me? I take only a few clients every two months who want to work with me. It's important that I give them enough time and attention. If you want to be one of them, respond to this email saying:
      <br>
      <br>
      "I want to get on your calendar!"
      <br>
      I need to chat with you one-on-one to see if you're a good fit for the mission. What's my mission: prepare guys for long-term relationship of their dreams. You also need to see if I'm the guy to help you move forward into new love.
      <br>
      <br>
      Hang in there. I pray for my email list.
      <br>
      <br>
      Peace,
      <br>
      Carter
      <br>
      <br>
      Carter N.Holmes
      <br>
      I help gay people prepare for the long-term relationship of their dreams.
      <br>
     Do you want that? Get on my calendar by emailing me.
      <br>
      <span><a href="https://www.facebook.com/happygayauthorfb/"/> FB: @happygayauthorfb</span>
      <br>
      <span><a href="https://www.tiktok.com/@happygayauthor" /> Tiktok: @happygayauthor</span>
      <br>
      <span><a href="https://www.instagram.com/happygayauthor" /> IG: @happygayauthor</span>
      <br>
      
      
      <img src= "cid:libro"/>
</p>
      <br>
      <br>
      `,
      attachments: [
      {
        filename: 'pic.jpg', 
        path: "./public/pic.jpg", 
        cid: "carter"
      }, 
      {
        filename: 'book.pdf', 
        path: "./public/book.pdf", 
        cid: "freebook"
      }, 
      {
        filename: 'book.png', 
        path: "./public/book.png", 
        cid: "libro"
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
      'url': 'https://us17.api.mailchimp.com/3.0//lists/fbbb839a40/members',
      'headers': {
        'Authorization': 'Basic c98a3bf7d23ba05bac89fda722a2af69-us17',
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