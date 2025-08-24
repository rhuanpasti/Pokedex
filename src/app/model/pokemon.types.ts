// Pokemon API Response Types based on https://pokeapi.co/api/v2/

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  sprites: PokemonSprites;
  species: PokemonSpecies;
  stats: PokemonStat[];
  types: PokemonType[];
  order: number;
  past_types: PastType[];
}

export interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Ability {
  name: string;
  url: string;
}

export interface PokemonForm {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}

export interface Item {
  name: string;
  url: string;
}

export interface VersionDetail {
  rarity: number;
  version: Version;
}

export interface PokemonMove {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

export interface Move {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: VersionSprites;
}

export interface OtherSprites {
  dream_world: DreamWorldSprites;
  home: HomeSprites;
  'official-artwork': OfficialArtworkSprites;
}

export interface DreamWorldSprites {
  front_default: string | null;
  front_female: string | null;
}

export interface HomeSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface OfficialArtworkSprites {
  front_default: string | null;
  front_shiny: string | null;
}

export interface VersionSprites {
  'generation-i': GenerationISprites;
  'generation-ii': GenerationIISprites;
  'generation-iii': GenerationIIISprites;
  'generation-iv': GenerationIVSprites;
  'generation-v': GenerationVSprites;
  'generation-vi': GenerationVISprites;
  'generation-vii': GenerationVIISprites;
  'generation-viii': GenerationVIIISprites;
}

export interface GenerationISprites {
  'red-blue': RedBlueSprites;
  yellow: YellowSprites;
}

export interface RedBlueSprites {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

export interface YellowSprites {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

export interface GenerationIISprites {
  crystal: CrystalSprites;
  gold: GoldSprites;
  silver: SilverSprites;
}

export interface CrystalSprites {
  back_default: string | null;
  back_shiny: string | null;
  back_shiny_transparent: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_shiny_transparent: string | null;
  front_transparent: string | null;
}

export interface GoldSprites {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_transparent: string | null;
}

export interface SilverSprites {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_transparent: string | null;
}

export interface GenerationIIISprites {
  emerald: EmeraldSprites;
  'firered-leafgreen': FireRedLeafGreenSprites;
  'ruby-sapphire': RubySapphireSprites;
}

export interface EmeraldSprites {
  front_default: string | null;
  front_shiny: string | null;
}

export interface FireRedLeafGreenSprites {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

export interface RubySapphireSprites {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

export interface GenerationIVSprites {
  'diamond-pearl': DiamondPearlSprites;
  'heartgold-soulsilver': HeartGoldSoulSilverSprites;
  platinum: PlatinumSprites;
}

export interface DiamondPearlSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface HeartGoldSoulSilverSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface PlatinumSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface GenerationVSprites {
  'black-white': BlackWhiteSprites;
}

export interface BlackWhiteSprites {
  animated: AnimatedSprites;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface AnimatedSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface GenerationVISprites {
  'omegaruby-alphasapphire': OmegaRubyAlphaSapphireSprites;
  'x-y': XYSprites;
}

export interface OmegaRubyAlphaSapphireSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface XYSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface GenerationVIISprites {
  'ultra-sun-ultra-moon': UltraSunUltraMoonSprites;
}

export interface UltraSunUltraMoonSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface GenerationVIIISprites {
  icons: IconsSprites;
}

export interface IconsSprites {
  front_default: string | null;
  front_female: string | null;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: Type;
}

export interface Type {
  name: string;
  url: string;
}

export interface PastType {
  generation: Generation;
  types: PokemonType[];
}

export interface Generation {
  name: string;
  url: string;
}

// Simplified Pokemon interface for display purposes
export interface PokemonDisplay {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  weight: number;
  height: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
}

// Search event interface
export interface SearchEvent {
  target: {
    value: string;
  };
}
