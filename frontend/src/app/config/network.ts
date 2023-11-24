import { images } from "shared/assets";
import { mainnet } from "wagmi";
import {
  polygon,
  polygonMumbai,
  avalanche,
  bsc,
  optimism,
  arbitrum,
  celo,
  zkSync,
} from "wagmi/chains";

export const networkData = [
  
  {
    icon: images.network_2,
    name: "Polygon",
    id: polygon.id,
    nftNetwork: "polygon-mainnet",
  },
  {
    icon: images.network_2,
    name: "Polygon Testnet",
    id: polygonMumbai.id,
    nftNetwork: "polygon-mumbai",
  },
  {
    icon: images.network_1,
    name: mainnet.nativeCurrency.symbol,
    id: mainnet.id,
    nftNetwork: "eth-mainnet",
  },
  {
    icon: images.network_3,
    name: bsc.nativeCurrency.name,
    id: bsc.id,
    nftNetwork: "eth-mainnet",
  },
  {
    icon: images.optimismNetwork,
    name: optimism.network,
    id: optimism.id,
    nftNetwork: "opt-mainnet",
  },
  {
    icon: images.nova,
    name: "Arbitrum Nova",
    id: 42170,
    nftNetwork: "eth-mainnet",
  },
  {
    icon: images.avalancheNetwork,
    name: avalanche.nativeCurrency.symbol,
    id: avalanche.id,
    nftNetwork: "eth-mainnet",
  },
  {
    icon: images.arbitrumNetwork,
    name: arbitrum.network,
    id: arbitrum.id,
    nftNetwork: "arb-mainnet",
  },
  {
    icon: images.celo,
    name: celo.network,
    id: celo.id,
    nftNetwork: "eth-mainnet",
  },
  {
    icon: images.zk,
    name: zkSync.network,
    id: zkSync.id,
    nftNetwork: "eth-mainnet",
  },
  {
    icon: images.near,
    name: "Near",
    id: -1,
    nftNetwork: "eth-mainnet",
  },
];
