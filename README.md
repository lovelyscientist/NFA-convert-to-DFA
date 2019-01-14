# Simple app to converte NFA to DFA and check if the string applies to a rule.


### Breif definition about DFA and NFA.
---
**[DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton)**: A DFA is a finite state machine that accepts or rejects strings of symbols and only produce a uniques computation (or run) of the automation for each input string. *Deterministic* refers to the uniqueness of the computation. In search of the simplest models to capture finite-state machines.
<br>![DFA](https://github.com/hirocsingh/NFA-convert-to-DFA/blob/master/DFA.png)

> A DFA can be represented by a 5-tuple (Q, ∑, δ, q0, F) where −
>
> 1. Q is a finite set of states.
>
>2. ∑ is a finite set of symbols called the alphabet.
>
>3. δ is the transition function where δ: Q × ∑ → Q
>
>4. q0 is the initial state from where any input is processed (q0 ∈ Q).
>
>5. F is a set of final state/states of Q (F ⊆ Q).

*Learn more about DFA [here](https://en.wikipedia.org/wiki/Deterministic_finite_automaton).*

**[NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton)**: n NFA, similar to a DFA, consumes a string of input symbols. For each input symbol, it transitions to a new state until all input symbols have been consumed. Unlike a DFA, it is non-deterministic, i.e., for some state and input symbol, the next state may be nothing or one or two or more possible states.<br>![NFA](https://github.com/hirocsingh/NFA-convert-to-DFA/blob/master/NFA.png)

>An NDFA can be represented by a 5-tuple (Q, ∑, δ, q0, F) where −
>
>1. Q is a finite set of states.
>
>2. ∑ is a finite set of symbols called the alphabets.
>
>3. δ is the transition function where δ: Q × ∑ → 2Q
>
>       (Here the power set of Q (2Q) has been taken because in case of NDFA, from a state, transition can occur to any combination of Q states)
>
>4. q0 is the initial state from where any input is processed (q0 ∈ Q).
>
>5. F is a set of final state/states of Q (F ⊆ Q).

*Learn more about NFA [here](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton).*