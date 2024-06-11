export type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  gender: string;
  location?: {
    name: string;
    url: string;
  };
  episode?: string[];
};
