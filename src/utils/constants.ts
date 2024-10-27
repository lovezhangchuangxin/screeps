import { gent } from './utils'

export const baseRes = ['energy', 'U', 'L', 'K', 'Z', 'X', 'O', 'H', 'G']

export const powerRes = ['power', 'ops']

export const barsRes = [
  'battery',
  'utrium_bar',
  'lemergium_bar',
  'keanium_bar',
  'zynthium_bar',
  'purifier',
  'oxidant',
  'reductant',
  'ghodium_melt',
]

export const c_greyRes = ['composite', 'crystal', 'liquid']

export const c_blueRes = [
  'silicon',
  'wire',
  'switch',
  'transistor',
  'microchip',
  'circuit',
  'device',
]

export const c_yellowRes = [
  'metal',
  'alloy',
  'tube',
  'fixtures',
  'frame',
  'hydraulics',
  'machine',
]

export const c_pinkRes = [
  'mist',
  'condensate',
  'concentrate',
  'extract',
  'spirit',
  'emanation',
  'essence',
]

export const c_greenRes = [
  'biomass',
  'cell',
  'phlegm',
  'tissue',
  'muscle',
  'organoid',
  'organism',
]

export const b_greyRes = ['OH', 'ZK', 'UL', 'G']

export const b_blueRes = gent('U')
export const b_yellowRes = gent('Z')
export const b_pinkRes = gent('K')
export const b_greenRes = gent('L')
export const b_witheRes = gent('G')

export const RES_COLOR_MAP: { [key: string]: string } = {
  empty: 'rgba(0,0,0,0)',
  energy: 'rgb(255,242,0)',
  battery: 'rgb(255,242,0)',
  Z: 'rgb(247, 212, 146)',
  L: 'rgb(108, 240, 169)',
  U: 'rgb(76, 167, 229)',
  K: 'rgb(218, 107, 245)',
  X: 'rgb(255, 192, 203)',
  G: 'rgb(255,255,255)',
  zynthium_bar: 'rgb(247, 212, 146)',
  lemergium_bar: 'rgb(108, 240, 169)',
  utrium_bar: 'rgb(76, 167, 229)',
  keanium_bar: 'rgb(218, 107, 245)',
  purifier: 'rgb(255, 192, 203)',
  ghodium_melt: 'rgb(255,255,255)',
  power: 'rgb(224,90,90)',
  ops: 'rgb(224,90,90)',
  composite: '#ccc',
  crystal: '#ccc',
  liquid: '#ccc',
  device: 'rgb(76, 167,229)',
  circuit: 'rgb(76, 167,229)',
  microchip: 'rgb(76, 167,229)',
  transistor: 'rgb(76, 167,229)',
  switch: 'rgb(76, 167,229)',
  wire: 'rgb(76, 167,229)',
  silicon: 'rgb(76, 167,229)',
  machine: 'rgb(247,212,146)',
  hydraulics: 'rgb(247,212,146)',
  frame: 'rgb(247,212,146)',
  fixtures: 'rgb(247,212,146)',
  tube: 'rgb(247,212,146)',
  alloy: 'rgb(247,212,146)',
  metal: 'rgb(247,212,146)',
  essence: 'rgb(218,107,245)',
  emanation: 'rgb(218,107,245)',
  spirit: 'rgb(218,107,245)',
  extract: 'rgb(218,107,245)',
  concentrate: 'rgb(218,107,245)',
  condensate: 'rgb(218,107,245)',
  mist: 'rgb(218,107,245)',
  organism: 'rgb(108,240,169)',
  organoid: 'rgb(108,240,169)',
  muscle: 'rgb(108,240,169)',
  tissue: 'rgb(108,240,169)',
  phlegm: 'rgb(108,240,169)',
  cell: 'rgb(108,240,169)',
  biomass: 'rgb(108,240,169)',
  OH: '#ccc',
  ZK: '#ccc',
  UL: '#ccc',
  UH: 'rgb(76, 167,229)',
  UH2O: 'rgb(76, 167,229)',
  XUH2O: 'rgb(76, 167,229)',
  UO: 'rgb(76, 167,229)',
  UHO2: 'rgb(76, 167,229)',
  XUHO2: 'rgb(76, 167,229)',
  ZH: 'rgb(247,212,146)',
  ZH2O: 'rgb(247,212,146)',
  XZH2O: 'rgb(247,212,146)',
  ZO: 'rgb(247,212,146)',
  ZHO2: 'rgb(247,212,146)',
  XZHO2: 'rgb(247,212,146)',
  KH: 'rgb(218,107,245)',
  KH2O: 'rgb(218,107,245)',
  XKH2O: 'rgb(218,107,245)',
  KO: 'rgb(218,107,245)',
  KHO2: 'rgb(218,107,245)',
  XKHO2: 'rgb(218,107,245)',
  LH: 'rgb(108,240,169)',
  LH2O: 'rgb(108,240,169)',
  XLH2O: 'rgb(108,240,169)',
  LO: 'rgb(108,240,169)',
  LHO2: 'rgb(108,240,169)',
  XLHO2: 'rgb(108,240,169)',
  GH: 'rgb(255,255,255)',
  GH2O: 'rgb(255,255,255)',
  XGH2O: 'rgb(255,255,255)',
  GO: 'rgb(255,255,255)',
  GHO2: 'rgb(255,255,255)',
  XGHO2: 'rgb(255,255,255)',
  H: '#ccc',
  O: '#ccc',
  oxidant: '#ccc',
  reductant: '#ccc',
}
