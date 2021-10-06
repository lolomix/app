import {
  injected,
  network,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  lattice,
  frame,
  authereum,
  fortmatic,
  magic,
  portis,
  torus
} from './connectors2';

const ConnectorNames = {
  "Injected": 'Injected',
  "Network": 'Network',
  "WalletConnect": 'WalletConnect',
  "WalletLink": 'WalletLink',
  "Ledger": 'Ledger',
  "Trezor": 'Trezor',
  "Lattice": 'Lattice',
  "Frame": 'Frame',
  "Authereum": 'Authereum',
  "Fortmatic": 'Fortmatic',
  "Magic": 'Magic',
  "Portis": 'Portis',
  "Torus": 'Torus'
}

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  [ConnectorNames.Ledger]: ledger,
  [ConnectorNames.Trezor]: trezor,
  [ConnectorNames.Lattice]: lattice,
  [ConnectorNames.Frame]: frame,
  [ConnectorNames.Authereum]: authereum,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.Magic]: magic,
  [ConnectorNames.Portis]: portis,
  [ConnectorNames.Torus]: torus
}

export default ConnectorNames;