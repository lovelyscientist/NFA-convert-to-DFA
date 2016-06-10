'use strict';
class NFA {
        constructor (states, start, finishes,string) {
            this.states = states;
            this.start = start;
            this.finishes = finishes;
            this.string = string;
        }

        conversationToDFA () {

            var normalizeStates = () => {
                for (var state in this.states) {
                    if (!this.states[state]["$"]) {
                        this.states[state]["$"] = state;
                    } else {
                        if (typeof this.states[state]["$"] === "object") {
                            if (this.states[state]["$"].indexOf(state) === -1) {
                                this.states[state]["$"].push(state);
                            }
                        }  else {
                            var existingState = this.states[state]["$"];
                            this.states[state]["$"] = [];
                            if (existingState !== state) {
                                this.states[state]["$"].push(state);
                            }
                            this.states[state]["$"].push(existingState);
                        }
                    }

                }
            }

			var createNewStatesStore = () => {

                normalizeStates();
                console.log(this.states);

                var looopedStates = [];
                let newStore = {};
                let state = this.start;
                newStore[state] = {};
                // read and write first state
                for (let letter in this.states[state]) {
                    if (letter  !== "$") {
                        let stateValue = this.states[state][letter];
                        if (stateValue && this.states[stateValue]) {
                            newStore[state][letter] = this.states[stateValue]["$"];   
                        } else {
                            newStore[state][letter] = "";
                        }
                    }
                }

                // push new states to the newStore
                for (var i = 0; i < Object.keys(newStore).length; i++) {
                    for (var mixState in newStore) {
                        if (looopedStates.indexOf(mixState) === -1) {
                            looopedStates.push(mixState);
                            for (var letter in newStore[mixState]) {
                                var searchStateList = newStore[mixState][letter]; // new state which we need to add 
                                if (!newStore[searchStateList] && searchStateList !== "") {
                                    newStore[searchStateList] = {};
                                    // loop through states in mixState who's type is list
                                    for (var oneLetter in newStore[mixState]) {
                                         var resultListForOneLetter = [];
                                        searchStateList.forEach(s => {
                                            var midStateByLetter = this.states[s][oneLetter];
                                            if (midStateByLetter !== "") {
                                                 var midStateBy$ = this.states[midStateByLetter]["$"];
                                                 // if it is one item
                                                 if (typeof midStateBy$ === "string") resultListForOneLetter.push(midStateBy$); 
                                                 // if it is list already
                                                 else resultListForOneLetter =  resultListForOneLetter.concat(midStateBy$); 
                                            }
                                        });
                                         newStore[searchStateList][oneLetter] = resultListForOneLetter;
                                    }
                                  
                                } 
                            }
                        }
                        
                    }
                }   
                 // rename all list states to new single states
                var renamedStore = {};
                var newNames = [];
                var counter = 0;
                var namesHash = {};
                var finishStates = this.finishes;
                var startState = this.start;
                var names = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
                for (var i = 0; i < Object.keys(newStore).length; i++) {
                    newNames.push(names[i]);
                }


                // creating namesHash 
                for (var key in newStore) {
                    if (namesHash[key] === undefined) {
                        namesHash[key] = newNames[counter];
                        counter++;
                    }
                }

                // prepare finish states
    
                for (var key in newStore) {
                    this.finishes.forEach(f => {
                        if (key.includes(f) && key !== f) {
                            this.finishes.push(key);
                        }
                    });
                    
                }

                
                //rename finish states

                for (let i=0; i< finishStates.length; i++) {
                    finishStates[i] = namesHash[finishStates[i]];
                }
               
                //renameStartState
                startState = namesHash[startState];

                

                // register new store
                for (var key in newStore) {
                    renamedStore[key] = {};
                }

                // rename values
                for (var key in newStore) {
                    for (var letter  in newStore[key]) {
                        if (namesHash[newStore[key][letter]]) {
                            renamedStore[key][letter] = namesHash[newStore[key][letter]];
                        }
                    }

                }

                // create new keys
                for (var key in newStore) {
                     renamedStore[namesHash[key]] = renamedStore[key];
                     delete renamedStore[key];   
                }

                return {
                    states: renamedStore,
                    finish: finishStates,
                    start: startState
                }
            }

            var res = createNewStatesStore();
            console.log(res);
            return res;
            }
}   		
