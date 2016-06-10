window.addEventListener('load', function(){
	document.getElementById('getResult').addEventListener('click', function(){
		//try {
			var string = document.getElementById('string').value;
			var nfa1 = new NFA(statesNFA, 'q1', ['q3'], string);
			var config = nfa1.conversationToDFA();
			var dfa1 = new DFA(config.states, config.start, config.finish, string);
			document.getElementById('result').textContent = "Result: " + dfa1.transition();
		//}
		//catch(err){
			document.getElementById('result').textContent = "Your string is wrong!";
		//}
	}, false);
}, false);

