const Voting = artifacts.require("Voting");

contract("Voting", async accounts => {
  it("correct initialization voting contract", async () => {
    let instance = await Voting.deployed();
    let name = await instance.name();
    let number = await instance.getNumberVariants();
    assert.equal(name, "What is the best platform for DAPP development?");
    assert.equal(number, 4);
  });

  it("correct vote", async () => {
    let instance = await Voting.deployed();
    await instance.vote(0, { from: accounts[0] });
    await instance.vote(0, { from: accounts[1] });
    await instance.vote(1, { from: accounts[2] });
    let variant0 = await instance.variants(0);
    let variant1 = await instance.variants(1);
    assert.equal(2, variant0.votes);
    assert.equal(1, variant1.votes);
  });

  it("correct winning variants", async () => {
    let instance = await Voting.deployed();
    let winId = await instance.getWinVariantId();
    assert.equal(winId, 0);
  });
});
