export interface ProofRequest {
  input: Record<string, any>; // input object for circuits
}

export interface ProofResult {
  proof: any;                 // zk-SNARK/Plonk proof
  publicSignals: any[];
}
