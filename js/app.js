var app = angular.module('PL', ['ngRoute']);



app.controller('allMatchesHeldController', ['$http', function($http) {
    var main = this;
    this.names = ['2015-16', '2016-17'];
    this.heading = 'English Premier League';
    this.selectedSeason = '';

    this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master";
    this.loadAllMatches = function() {
        $http({
            method: "GET",
            url: main.baseUrl + "/" + main.selectedSeason + "/en.1.json"
        }).then(function successCallback(response) {
            main.heading = response.data.name;
            main.rounds = response.data.rounds;
            console.log(response.data);
        }, function errorCallBack(response) {
            console.log("Error");
        })
    };
    this.setMatchData = function(match) {
        main.team1 = match.team1.name;
        main.team2 = match.team2.name;
        main.score1 = match.score1;
        main.score2 = match.score2;
        console.log(main.team1, main.team2, main.score1, main.score2);
    }



}]);


app.controller('MatchDetailController', ['$http', '$routeParams', function($http, $routeParams) {
    var main = this;
    this.heading = "";
    this.rounds = [];
    this.matchDay = "";
    this.matches = [];
    this.teamName1 = "";
    this.teamName2 = "";
    this.teamCode1 = "";
    this.teamCode2 = "";
    this.teamKey1 = "";
    this.teamKey2 = "";
    this.teamScore1 = "";
    this.teamScore2 = "";
    this.roundName = "";
    this.matchDate = "";

    this.date = $routeParams.date;
    this.matchDayName = $routeParams.matchDayName;
    this.selectedSeason = $routeParams.selectedSeason;
    this.team1code = $routeParams.team1code;
    this.team2code = $routeParams.team2code;


    this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master";
    this.loadMatchDetail = function() {
        $http({
            method: "GET",
            url: main.baseUrl + "/" + main.selectedSeason + "/en.1.json"
        }).then(function successCallback(response) {
            //need to search the data in json and assign values to varriable defined above
            console.log(response.data);
            console.log(main.matchDay);

            main.heading = response.data.name;
            main.rounds = response.data.rounds;

            main.MatchDayObject = main.rounds.find(function(e) {
                if (e.name === main.matchDayName) {
                    return e.matches;
                };
            });

            //all the matches on clicked matchday
            main.MatchDayMatches = main.MatchDayObject.matches;

            //clicked match
            main.match = main.MatchDayMatches.find(function(e) {
                if ((e.team1.code === main.team1code)) {
                    return e;
                }
            });

            //Assigning values to the above delared variable from selected match
            main.teamName1 = main.match.team1.name;
            main.teamName2 = main.match.team2.name;
            main.teamCode1 = main.match.team1.code;
            main.teamCode2 = main.match.team2.code;
            main.teamKey1 = main.match.team1.key;
            main.teamKey2 = main.match.team2.key;
            main.teamScore1 = main.match.score1;
            main.teamScore2 = main.match.score2;



            //    console.log(main.team1code);
            //  console.log(main.MatchDayMatches);
            //  console.log(main.match);
        }, function errorCallBack(response) {
            console.log("Error");
        })
    };
    this.loadMatchDetail();

}]);


app.controller('tableController', ['$http', '$routeParams', function($http, $routeParams) {
    var main = this;
    this.heading = "";
    this.rounds = [];
    this.matchDay = "";
    this.matches = [];
    this.teamName1 = "";
    this.teamName2 = "";
    this.teamCode1 = "";
    this.teamCode2 = "";
    this.teamScore1 = "";
    this.teamScore2 = "";
    this.teamObjArray = [];
    this.matchDate = "";
    this.teamsA = [];
    this.matchesObjArray = [];
    this.orderByField = 'position';
    this.reverseSort = false;


    this.date = $routeParams.date;
    this.matchDayName = $routeParams.matchDayName;
    this.selectedSeason = $routeParams.selectedSeason;
    this.team1code = $routeParams.team1code;
    this.team2code = $routeParams.team2code;


    this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master";
    this.loadTable = function() {
        $http({
            method: "GET",
            url: main.baseUrl + "/" + main.selectedSeason + "/en.1.json"
        }).then(function successCallback(response) {
            //need to search the data in json and assign values to varriable defined above
            console.log(response.data);
            console.log(main.matchDay);

            main.heading = response.data.name;
            main.rounds = response.data.rounds;
            main.matches = main.rounds.map(function(e) {
                return e.matches;
            });
            for (var i = 0; i < main.matches.length; i++) {
                for (var j = 0; j < main.matches[i].length; j++) {
                    main.teamsA.push(main.matches[i][j].team1.name);
                    main.matchesObjArray.push(main.matches[i][j]);
                }


            }
            //All teams names
            main.teams = main.teamsA.filter(function(item, pos) {
                return main.teamsA.indexOf(item) == pos;
            });;
            console.log(main.teams);
            //console.log(main.matchesObjArray);


            for (var k = 0; k < main.teams.length; k++) {
                var wins = 0;
                var draw = 0;
                var lose = 0;
                var goalScored = 0;
                var goalConceded = 0;
                var teamCode = '';
                var teamObj = {
                    position: "",
                    name: "",
                    code: "",
                    wins: "",
                    drawn: "",
                    lost: "",
                    GF: "",
                    GA: "",
                    Points: ""
                };




                for (var m = 0; m < main.matchesObjArray.length; m++) {


                    if (main.teams[k] == main.matchesObjArray[m].team1.name) {
                        goalScored += main.matchesObjArray[m].score1;
                        goalConceded += main.matchesObjArray[m].score2;
                        teamCode = main.matchesObjArray[m].team1.code;
                        if (main.matchesObjArray[m].score1 > main.matchesObjArray[m].score2) {
                            wins++;
                        } else if (main.matchesObjArray[m].score1 == main.matchesObjArray[m].score2) {
                            draw++;
                        } else {
                            lose++;
                        }
                    } else if (main.teams[k] == main.matchesObjArray[m].team2.name) {
                        goalScored += main.matchesObjArray[m].score2;
                        goalConceded += main.matchesObjArray[m].score1;
                        teamCode = main.matchesObjArray[m].team2.code;
                        if (main.matchesObjArray[m].score2 > main.matchesObjArray[m].score1) {
                            wins++;
                        } else if (main.matchesObjArray[m].score1 == main.matchesObjArray[m].score2) {
                            draw++;
                        } else {
                            lose++;
                        }
                    }



                    // console.log(main.teamObj);
                    //main.teamObjArray.push(main.teamObj);
                }
                teamObj.name = main.teams[k];
                console.log(teamObj.name);
                teamObj.code = teamCode;
                teamObj.wins = (wins);
                teamObj.drawn = (draw);
                teamObj.lost = lose;
                teamObj.GF = goalScored;
                teamObj.GA = goalConceded;
                teamObj.GD = ((goalScored - goalConceded) < 0 ? "" : "+") + (goalScored - goalConceded);
                teamObj.Points = 3 * wins + draw;

                //console.log(main.teamObj);
                main.teamObjArray.push(teamObj);

                console.log(main.teamObjArray[k]);
                console.log(main.teamObjArray);

                //sorted by points
                main.teamObjArray.sort(compareP);

                function compareP(a, b) {
                    if (a.Points > b.Points)
                        return -1;
                    if (a.Points < b.Points)
                        return 1;

                    if (a.GD < b.GD)
                        return -1;
                    if (a.GD > b.GD)
                        return 1;
                    if (a.GF > b.GF)
                        return -1;
                    if (a.GF < b.GF)
                        return 1;
                    return 0;
                }
                

            }
            for (var i = 0; i < main.teamObjArray.length; i++) {
                main.teamObjArray[i].position = i+1;
            }
            console.log(main.teamObjArray);

        }, function errorCallBack(response) {
            console.log("Error");
        })
    };
    this.loadTable();

}]);