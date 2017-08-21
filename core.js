 //parameters
 var N = 150;
 var kT = 0.02;
 var G = 10;
 var q = [];
 var m = 50 ;
 var jij = 1;
 var loop = 50000;

 //qbit initialize
 for(var j=0;j<m;j++){
  q[j] = [];
  for(var i=0;i<N;i++){
   q[j][i] = Math.floor(Math.random()-0.5)*2+1;
  };
 };

 //monte carlo loop start
 for(var l=0;l<2000;l++){
  for(var k=0;k<loop;k++){
   var y = Math.floor(Math.random()*m); //select random trotter
   var x = Math.floor(Math.random()*N); //select random qbit
   var dE = (jij*2*q[y][x]*q[y][(N+x-1)%N] + jij*2*q[y][x]*q[y][(x+1)%N])/m; //Energy difference calc
   var kk = G/kT/m;
   var kk1 = Math.exp(kk);
   var kk2 = Math.exp(-kk);
   dE += q[y][x]*(q[(m+y-1)%m][x]+q[(y+1)%m][x])*Math.log((kk1+kk2)/(kk1-kk2))/kT; //Quantum flactuation calc
   if(dE<0 || Math.exp(-dE/kT)>Math.random()){ // Metropolis
    q[y][x] = -q[y][x]; //flipping qbit
   };
  };

  G = G*0.999;
 };
