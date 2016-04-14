// Author: Thomas Wheeler
// A record keeping object that keeps track of important player statistics

var StatTracker = function(){
	this.shotsFired = 0;
	this.zombiesKilled = 0;
}

StatTracker.prototype.score = function (){
	// score = # of zombies killed x 100 - # of shots fired
	return this.zombiesKilled * 100 - shotsFired;
}

StatTracker.prototype.registerZombieKilled = function (){
	// increment the count of zombies our player has killed 
	this.zombiesKilled = this.zombiesKilled + 1;
}

StatTracker.prototype.registerShotFired = function() {
	// increment # of shots fired
	this.shotsFired = this.shotsFired + 1;
};