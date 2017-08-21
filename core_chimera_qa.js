 var N = 512;
 var kT = 0.02;
 var G = 10;
 var q = [];
 var m = 256;
 var jij = 1;
 var hcell = 8;
 var hq = hcell*8;

 for(var j=0;j<m;j++){
  q[j] = [];
  for(var i=0;i<N;i++){
   q[j][i] = Math.floor(Math.random()-0.5)*2+1;
  };
 };

 for(var l=0;l<600;l++){
  for(var k=0;k<N*m;k++){
   var x = Math.floor(Math.random()*N);
   var y = Math.floor(Math.random()*m);
   var xcell = Math.floor(x/8)*8;
   if(x%8<4){
    var dE = jij*2*q[y][x]*(q[y][xcell+4]+q[y][xcell+5]+q[y][xcell+6]+q[y][xcell+7]);
    if(x<N-hq){
     dE += jij*2*q[y][x]*(q[y][x+hq]);
    }
    if(x>hq-1){
     dE += jij*2*q[y][x]*(q[y][x-hq]);
    }
   }else{
    var dE = jij*2*q[y][x]*(q[y][xcell+0]+q[y][xcell+1]+q[y][xcell+2]+q[y][xcell+3]);
    if(x%hq>7){
     dE += jij*2*q[y][x]*q[y][x-8];
    }
    if(x%hq<hq-8){
     dE += jij*2*q[y][x]*q[y][x+8];
    }
   }

   dE = dE/m;
   var kk = G/kT/m;
   var kk1 = Math.exp(kk);
   var kk2 = Math.exp(-kk);
   dE += q[y][x]*(q[(m+y-1)%m][x]+q[(y+1)%m][x])*Math.log((kk1+kk2)/(kk1-kk2))/kT;
   if(dE<0 || Math.exp(-dE/kT)>Math.random()){
    q[y][x] = -q[y][x];
   };
  };

  G = G*0.99;
 };
