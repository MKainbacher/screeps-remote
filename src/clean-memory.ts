export const cleanMemory = {
  run: function () {
    for (let creepName in Memory.creeps) {
      if (!Game.creeps[creepName]) {
        delete Memory.creeps[creepName];
        console.log(`Deleted obsolete memory for ${creepName}`);
      }
    }
  },
};
