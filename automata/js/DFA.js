'use strict';
class DFA {
        constructor(states, start, finishes,string) {
            this.states = states;
            this.start = start;
            this.finishes = finishes;
            this.string = string;
        }
        transition() {
           var curState = this.start;
			for (var i=0; i<this.string.length;i++){
				curState = this.states[curState][this.string[i]];

			}
            if (curState === undefined) {
                throw 'error'; 
            }  else {
                if (this.finishes.indexOf(curState) > -1) {
                    return 'Yes!';
                } else return 'No!'; 
            }     
			  
    	}
}   		
