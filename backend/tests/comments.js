const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("comments", () => {
  const provider = anchor.Provider.env();
  const testComment = "Test comment";

  anchor.setProvider(provider);

  it("It initializes the account", async () => {
    const program = anchor.workspace.Comments;
    const baseAccount = anchor.web3.Keypair.generate();

    await program.rpc.initialize(testComment, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    assert.ok(account.data === testComment);

    _baseAccount = baseAccount;
  });
});
