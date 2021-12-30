import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface AccountInfoInterface {
  accountInfo?: web3.AccountInfo<Buffer>;
  programId: PublicKey;
}

export interface ProgramAccountInterface {
  pubkey: web3.PublicKey;
  account: web3.AccountInfo<Buffer>;
}
