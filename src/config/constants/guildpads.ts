import { GuildpadConfig } from "./types";
import MggGuildpad from "./Guildpads/MggGuildpad";
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone';
import DemoleGuildpad from './Guildpads/Demole';
import AcknoledgerGuildpad from './Guildpads/Acknoledger';

const Guildpads: GuildpadConfig[] = [
    TankWarsZoneGuildpad,
    DemoleGuildpad,
]

export default Guildpads
