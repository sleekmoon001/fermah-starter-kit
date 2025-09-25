import { ProofRequest, ProofResult } from "./types";

export class FermahClient {
  async generateProof(req: ProofRequest): Promise<ProofResult> {
    return {
      proof: { dummy: true },
      publicSignals: [req.input],
    };
  }

  async verifyProof(proof: ProofResult): Promise<boolean> {
    return true;
  }
}
