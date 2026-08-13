import {SummoningCircle} from "./FactoryPattern/SummoningCirclce"



console.log("Factory pattern")
const circle = new SummoningCircle()
const creature1 =circle.summon("fire")
creature1.useAbility()

const creature2 =circle.summon("sparkles")
creature2.useAbility()