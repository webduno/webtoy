import BASKETBALL_COURT_JSON from './maps/BASKETBALL_COURT.json'
import MINECRAFT_PARKOUR_JSON from './maps/MINECRAFT_PARKOUR.json'
import SHOOTING_RANGE_JSON from './maps/SHOOTING_RANGE.json'
import GOLF_COURSE_JSON from './maps/GOLF_COURSE.json'
import CONST_HOUSE_JSON from './maps/CONST_HOUSE.json'
import GARDEN_PARKOUR_JSON from './maps/GARDEN_PARKOUR.json'
import MOUNTAIN_VIEW_JSON from './maps/MOUNTAIN_VIEW.json'
import CITY_BLOCK_JSON from './maps/CITY_BLOCK.json'
import CASTLE_JSON from './maps/CASTLE.json'
import BOWLING_ALLEY_JSON from './maps/BOWLING_ALLEY.json'
import FOOTBALL_FIELD_JSON from './maps/FOOTBALL_FIELD.json'
import SOCCER_FIELD_JSON from './maps/SOCCER_FIELD.json'
import DOMINOES_JSON from './maps/DOMINOES.json'
import CARDBOX_WAREHOUSE_JSON from './maps/CARDBOX_WAREHOUSE.json'


const GOLF_COURSE = GOLF_COURSE_JSON
const CONST_HOUSE = CONST_HOUSE_JSON
const GARDEN_PARKOUR = GARDEN_PARKOUR_JSON
const MOUNTAIN_VIEW = MOUNTAIN_VIEW_JSON
const CITY_BLOCK = CITY_BLOCK_JSON
const CASTLE = CASTLE_JSON
const BOWLING_ALLEY = BOWLING_ALLEY_JSON
const FOOTBALL_FIELD = FOOTBALL_FIELD_JSON
const SOCCER_FIELD = SOCCER_FIELD_JSON
const DOMINOES = DOMINOES_JSON

/**
 * Get template data based on the template name
 * @param templateName - The name of the template to retrieve
 * @returns The template data array or null if not found
 */
export function getTemplateData(templateName: string | null): any[] | null {
  if (!templateName) return null;
  
  switch (templateName) {
    case 'golf_course': return GOLF_COURSE;
    case 'const_house': return CONST_HOUSE;
    case 'garden_parkour': return GARDEN_PARKOUR;
    case 'mountain_view': return MOUNTAIN_VIEW;
    case 'shooting_range': return SHOOTING_RANGE_JSON;
    case 'city_block': return CITY_BLOCK;
    case 'castle': return CASTLE;
    case 'bowling_alley': return BOWLING_ALLEY;
    case 'basketball_court': return BASKETBALL_COURT_JSON;
    case 'football_field': return FOOTBALL_FIELD;
    case 'soccer_field': return SOCCER_FIELD;
    case 'dominoes': return DOMINOES;
    case 'minecraft_parkour': return MINECRAFT_PARKOUR_JSON;
    case 'cardbox_warehouse': return CARDBOX_WAREHOUSE_JSON
    default:
      return null;
  }
} 


export const DEFAULT_TEMPLATE_LIST = [
  { name: 'garden_parkour', description: '🌳#Parkour garden' },
  { name: 'minecraft_parkour', description: '🏃‍♂️#Minecraft Parkour' },
  { name: 'shooting_range', description: '🎯#Shooting range' },
  { name: 'bowling_alley', description: '🎳#Bowling alley' },
  { name: 'cardbox_warehouse', description: '📦#Cardbox warehouse' },
  { name: 'castle', description: '🏰#Medieval castle' },
  { name: 'basketball_court', description: '🏀#Basketball court' },
  { name: 'golf_course', description: '⛳#Golf course' },
  { name: 'mountain_view', description: '⛰️#Mountain view' },
  { name: 'football_field', description: '🏈#American football' },
  { name: 'soccer_field', description: '⚽#Soccer field' },
  { name: 'const_house', description: '🏠#Simple house' },
  { name: 'city_block', description: '🏙️#Urban city block' },
  { name: 'dominoes', description: '🎲#Domino Line' },
]
