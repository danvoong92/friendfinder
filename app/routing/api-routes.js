var friends = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });
    
    app.post("/api/friends", function(req,res){
        
        var bestMatch = {
            name: "",
            photo: "",
            default: 10000 // Set initial value high for comparison with total score difference.
        };

        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        // Run through friends and scores arrays and determine absolute difference between user's scores and friends' scores.
        // Then update best match with friend whose total score is less than or equal to default.

        for(var i = 0; i < friends.length; i++){
            totalDifference = 0;

            for(var j = 0; j < friends.length; j++){
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if(totalDifference <= bestMatch.default){
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.default = totalDifference;
                }
            }
        }

        friends.push(userData);
        res.json(bestMatch);
    });
};