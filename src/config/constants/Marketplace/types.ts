export interface CarouselDataConfig {
  title: string;
  description: string;
  image: string;
}



// Temporary details for NFT

export const NftCat: {[key:string]: string} = {
  doge: '#ff2bff',
  egod: '#ff2bff',
  catto: '#622bff',
  doggi: '#2bd4ff',
  iggod: '#8eff2b',
  kitteh: '#ff2b2b'
}

export interface NftConfig {
  name: string;
  src: string;
  description: string;
  price: string;
  status: string; 
  category: string
}