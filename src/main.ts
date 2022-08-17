import { cleanMemory } from './clean-memory';
import { roleBuilder } from './roles/role.builder';
import { roleHarvester } from './roles/role.harvester';
import { roleUpgrader } from './roles/role.upgrader';

declare global {
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

export function loop() {
  cleanMemory.run();
  for (let name in Game.creeps) {
    const creep: Creep = Game.creeps[name];
    switch (creep.memory.role) {
      case 'harvester':
        roleHarvester.run(creep);
        break;
      case 'upgrader':
        roleUpgrader.run(creep);
        break;
      case 'builder':
        roleBuilder.run(creep);
        break;
    }
  }
}
