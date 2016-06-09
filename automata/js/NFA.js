'use strict';
class NFA {
        constructor (states, start, finishes,string) {
            this.states = states;
            this.start = start;
            this.finishes = finishes;
            this.string = string;
        }

        conversationToDFA () {
			var createNewStatesStore = () => {
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

                for (var key in newStore) {
                    renamedStore[key] = {};
                }

                for (var key in newStore) {
                    for (var letter  in newStore[key]) {
                        //console.log(newStore[key]);
                        if (namesHash[newStore[key][letter]]) {
                            renamedStore[key][letter] = namesHash[newStore[key][letter]];
                        }
                    }

                }

                for (var key in newStore) {
                     renamedStore[namesHash[key]] = renamedStore[key];
                     delete renamedStore[key];   
                }

                console.log(renamedStore);
                console.log(namesHash);

            }

            createNewStatesStore();
    	}
}   		
