export type realmResponse = {
  _id: number;

  slug: string;

  name: string;

  region: string;

  name_locale: string;

  slug_locale: string;

  ticker: string;

  status: string;

  category: string;

  locale: string;

  timezone: string;

  type: string;

  population_status: string;

  connected_realm_id: number;

  connected_realms: [string];

  wcl_id: number;

  auctions: number;

  valuations: number;

  golds: number;
}
