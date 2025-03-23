@var hello = "Hello World"
BSL 1
:start
MOV @hello, #R2
ADD #R2, 1
MOV #ACC*, #R1
BSW #R1, 0
MOV #ACC, #R2
MOV #R1, #ACC
JNQ :start, 7
HLT


