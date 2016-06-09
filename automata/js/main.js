window.addEventListener('load', function(){
	document.getElementById('getResult').addEventListener('click', function(){
		try {
			var string = document.getElementById('string').value;
			var nfa1 = new NFA(statesNFA, 'q1', ['q3'], string);
			document.getElementById('result').textContent = "Result: " + nfa1.conversationToDFA();
		}
		catch(err){
			console.log(err);
			document.getElementById('result').textContent = "Your string is wrong!";
		}
	}, false);
}, false);
