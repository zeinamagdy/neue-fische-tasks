import {SummoningCircle} from "./FactoryPattern/SummoningCirclce"



console.log("Factory pattern")
const dragon = new SummoningCircle()
console.log("dragon",dragon.summon("fire"))


const Unicorn = new SummoningCircle()
console.log("Unicorn",Unicorn.summon("sparkles"))