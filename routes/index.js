var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

handleIntents=(req,res,intent)=>{
  switch(intent.name){
    case "MovieOfActor":
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Here are the movies of "+intent.slots.Actor.value+".!</speak>"
            }
        }
      });
      break;
    case "ActorsOfMovie":
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Here are the actors of "+intent.slots.Movie.value+".!</speak>"
            }
        }
      });
      break;
    case "Email":
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Email sent to "+intent.slots.Member.value+" with the content "+intent.slots.Data.value+".!</speak>"
            }
        }
      });
      break;
    case "NearbyShop":
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>The closest"+intent.slots.Shop.value+" is about 2 miles.!</speak>"
            }
        }
      });
      break;
    default:
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Sorry I cannot respond to that.!</speak>"
            }
        }
      });
      break;
  }
}

router.post('/',(req,res,next)=>{
  let reqType=req.body.request.type;
  switch(reqType){
    case "LaunchRequest":
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Hello.!</speak>"
            }
        }
      });
      break;
    case "IntentRequest":
      handleIntents(req,res,req.body.request.intent);
      break;
    case "SessionEndedRequest":
      res.json({
        "version": "1.0",
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Bye.!</speak>"
            }
        }
      });
      break;
    default:
      break;
  }
})

module.exports = router;
