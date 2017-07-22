from numpy import *

N = 10
kT = 5 
jij = 1

q = random.choice([-1,1],N)

for i in range(550):
	for j in range(500):
		x = random.randint(N)
		dE = jij*2*q[x]*(q[(N+x-1)%N]+q[(x+1)%N])
		if dE<0 or exp(-dE/kT)>random.rand():
			q[x] = -q[x]
	kT = kT*0.99

print(q)
