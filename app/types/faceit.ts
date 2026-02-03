export interface FaceitPlayer {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  cover_image: string;
  platforms: Record<string, string>;
  games: Record<string, FaceitGame>;
  settings: {
    language: string;
  };
  friends_ids: string[];
  new_steam_id: string;
  steam_id_64: string;
  steam_nickname: string;
  memberships: string[];
  faceit_url: string;
  membership_type: string;
  cover_featured_image: string;
  infractions: Record<string, unknown>;
}

export interface FaceitGame {
  region: string;
  game_player_id: string;
  skill_level: number;
  faceit_elo: number;
  game_player_name: string;
  skill_level_label: string;
  regions: Record<string, unknown>;
  game_profile_id: string;
}
