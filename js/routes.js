app.config(function($routeProvider){
	$routeProvider.when('/matchDetails/:selectedSeason/:matchDayName/:date/:team1code/vs/:team2code',{
		templateUrl: 'views/matchDetails.html',
		controller: 'MatchDetailController',
		controllerAs:'detailCtrl'
		
	}).when('/LeaderBoard/:selectedSeason',{
		templateUrl: '/views/LeaderBoard.html',
		controller: 'tableController',
		controllerAs:'tableCtrl'
	}).when('/',{
		templateUrl: '/views/AllMatches.html',
		controller: 'allMatchesHeldController',
		controllerAs:'matchCtrl'
	}).otherwise({
		redirectTo: '/'
		
	});
	
});