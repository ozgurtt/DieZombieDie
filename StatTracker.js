var StatTracker = function(){
	this.shotsFired = 0;
	this.zombiesKilled = 0;
	this.score = 0;
}

StatTracker.prototype.score = function (){
	return this.zombiesKilled * 100 - shotsFired;
}

StatTracker.prototype.registerZombieKilled = function (){
	// increment the count of zombies our player has killed 
	this.zombiesKilled = this.zombiesKilled + 1;
}