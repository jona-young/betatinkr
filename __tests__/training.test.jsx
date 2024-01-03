describe("Training", () => {
    let trainingPlan
    beforeAll(() => {
        trainingPlan = {
            message: "hello world"
        }
    })
    
    it("training plan message says hello world", () => {
      expect(trainingPlan.message).toEqual("hello world");
    });
  });