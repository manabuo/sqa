var N = 2048;
var kT = 5;
var q = [];
var jij = -1;
var hcell = 16;
var hq = hcell*8;

for(var i=0;i<N;i++){
 q[i] = Math.floor(Math.random()-0.5)*2+1;
};

for(var i=0;i<550;i++){
 for(var k=0;k<N;k++){
  var x = Math.floor(Math.random()*N);
  var xcell = Math.floor(x/8)*8;
  if(x%8<4){
   var dE = jij*2*q[x]*(q[xcell+4]+q[xcell+5]+q[xcell+6]+q[xcell+7]);
   if(x<N-hq){
    dE += jij*2*q[x]*(q[x+hq]);
   }
   if(x>hq-1){
    dE += jij*2*q[x]*(q[x-hq]);
   }
  }else{
   var dE = jij*2*q[x]*(q[xcell+0]+q[xcell+1]+q[xcell+2]+q[xcell+3]);
   if(x%hq>7){
    dE += jij*2*q[x]*q[x-8];
   }
   if(x%hq<hq-8){
    dE += jij*2*q[x]*q[x+8];
   }
  }
  if(dE<0 || Math.exp(-dE/kT)>Math.random()){
   q[x] = -q[x];
  };
 }

 kT= kT*0.99;
};
