pragma circom 2.0.0;


include "circomlib/circuits/sha256.circom";


component main {
signal input preimage[1];
signal output out[2];


component sha = Sha256(1);
sha.in[0] <== preimage[0];
out[0] <== sha.out[0];
out[1] <== sha.out[1];
}
