import {
  AssetName,
  AssetNames,
  ScriptHash,
} from '@emurgo/cardano-serialization-lib-nodejs';
import { Observable, of } from 'rxjs';

import { AmmPool } from '../../common/models/AmmPool';
import { Balance } from '../../common/models/Balance';
import { Currency } from '../../common/models/Currency';
import { TxId } from '../../common/types';
import { Network } from '../common/Network';
import {
  getAddresses,
  getUnusedAddresses,
  getUsedAddresses,
} from './api/addresses/addresses';
import { ammPools$ } from './api/ammPools/ammPools';
import { assetBalance$ } from './api/balance/assetBalance';
import { balance$ } from './api/balance/balance';
import { networkAsset } from './api/networkAsset/networkAsset';
import { networkContext$ } from './api/networkContext/networkContext';
import { utxos$ } from './api/utxos/utxos';
import { CardanoWalletContract } from './api/wallet/common/CardanoWalletContract';
import {
  availableWallets,
  connectWallet,
  disconnectWallet,
  selectedWallet$,
  supportedWalletFeatures$,
  walletState$,
} from './api/wallet/wallet';

export const cardanoNetwork: Network<CardanoWalletContract> = {
  name: 'cardano',
  networkAsset,
  networkAssetBalance$: of(new Currency(0n, networkAsset)),
  assetBalance$,
  lpBalance$: of(new Balance([])),
  locks$: of([]),
  positions$: of([]),
  ammPools$,
  getAddresses: getAddresses,
  getUsedAddresses: getUsedAddresses,
  getUnusedAddresses: getUnusedAddresses,
  txHistoryManager: {} as any,
  connectWallet: connectWallet,
  disconnectWallet: disconnectWallet,
  availableWallets: availableWallets,
  walletState$: walletState$,
  selectedWallet$: selectedWallet$,
  supportedFeatures$: supportedWalletFeatures$,
  networkContext$,
  swap(pool: AmmPool, from: Currency, to: Currency): Observable<TxId> {
    return of('');
  },
};

balance$.subscribe((res) => {
  console.log(res);
});
