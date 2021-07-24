'use strict';
const assert = require('assert');

// This is an object that has types of jobs and the values each provide.
const jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// Your code will go here
class CrewMember {
  name;
  job;
  specialSkill;
  ship;
  constructor (iName, iJob, iSpecialSkill) {
    this.name = iName;
    this.job = iJob;
    this.specialSkill = iSpecialSkill;
    this.ship = null;
  } 

  updateOldShipsCrew () {
    let crewIndex = this.ship.crew.indexOf(this);
    this.ship.crew.splice(crewIndex, 1);
  }

  enterShip (newship) {
    // Set the ship that the crew member is assigned to
    // Add this crew member to the ship's crew list
    // If this crewmember already is assigned to a ship, remove them from that crew.
    if(this.ship) {
      this.updateOldShipsCrew()
    }

    this.ship = newship;
    this.ship.crew.push(this);
  }
}

class Ship {
  name;
  type; 
  ability;
  crew;
  constructor (iName, iType, iAbility) {
    this.name = iName;
    this.type = iType;
    this.ability = iAbility;
    this.crew = [];
  }

  canFly () {
    // Look through the ship's crew members
    // Compare the value of the current crew member's job in the jobTypes list (value is equal to ship type) to 
    // this ships ship type. If they are the same or the crew member's job is a programmer then the ship can fly.
    let foundCrew = this.crew.findIndex(crewMember => { 
      return jobTypes[crewMember['job']] === this.type || crewMember['job'] === 'programmer';
    })
    return foundCrew;
  }

  missionStatement () {
    if (this.canFly() === -1) {
      return this.missionStatement = 'Can\'t perform a mission yet.'
    } 
    return this.missionStatement = this.ability;
  }
}


// Debugging
// let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
// const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');

// let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
// const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');

// console.log('MAV mission statement1: ', mav.missionStatement());
// console.log('Hermes mission statement1: ', hermes.missionStatement());

// crewMember1.enterShip(mav);
// console.log('MAV mission statement: ', mav.missionStatement());

// crewMember2.enterShip(hermes);
// console.log('Hermes mission statement: ', hermes.missionStatement());



// Begin by reading the tests and building a function that will full each one.
// As you build, you might not have to build them in order, maybe you do...
// These are the tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      // this creates a CrewMember and passes the following arguments into its constructor:
      // 'Rick Martinez', 'pilot', 'chemistry'
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      // this creates a new Ship. Can you build a class that can be called so that this Ship can be built?
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });

    it('can only belong to one ship', function() {
      // This creates two new ships and one crew member. It assigns the crew member to one ship and then to the other.
      // We are checking to make sure the crew member was removed from the first ship when they were added to the second one.
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      crewMember1.enterShip(hermes);
      assert.equal(mav.crew.length, 0);
      assert.equal(hermes.crew.length, 1);
    })
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    // Original Test
    // it('can return a mission statement correctly', function(){
    //   let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
    //   const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
    //   let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
    //   const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
    //   assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
    //   assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

    //   crewMember1.enterShip(mav);
    //   assert.equal(mav.missionStatement(), "Ascend into low orbit");

    //   crewMember2.enterShip(hermes);
    //   assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    // });

    // New Tests
    it('can return a mission statement correctly if the ship can\'t fly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");
    });

    it('can return a mission statement correctly if the ship can fly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
