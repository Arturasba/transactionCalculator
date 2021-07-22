const commissionController = require("./commission");

describe("CalculateCommission", () => {
  it("calculates commission successfully when EUR is passed as a currency", async () => {
    const data = {
      amount: 50,
      currency: "EUR",
    };
    await expect(
      commissionController.calculateCommission({
        body: {
          date: "2021-01-05",
          amount: "10000",
          currency: "EUR",
          client_id: 43,
        },
      })
    ).resolves.toEqual(data);
  });
});
