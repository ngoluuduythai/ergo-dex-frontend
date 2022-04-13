import {
  AmmPool,
  mkNetworkPoolsV1,
  Quickblue,
  ScriptCredsV1,
} from '@ergolabs/cardano-dex-sdk';
import { mkPoolsParser } from '@ergolabs/cardano-dex-sdk/build/main/amm/parsers/poolsParser';
import { RustModule } from '@ergolabs/cardano-dex-sdk/build/main/utils/rustLoader';
import {
  catchError,
  combineLatest,
  filter,
  from,
  map,
  of,
  publishReplay,
  refCount,
  switchMap,
  tap,
} from 'rxjs';

import { getAssetInfo } from '../assetManager/getAssetInfo';
import { CardanoAmmPool } from './CardanoAmmPool';

const req = RustModule.load().then((wasm) => {
  const cardanoNetwork = new Quickblue('https://testnet-api.quickblue.io/v1');
  const poolsParser = mkPoolsParser(wasm);
  const poolsRepository = mkNetworkPoolsV1(
    cardanoNetwork,
    poolsParser,
    ScriptCredsV1,
  );

  return poolsRepository.getAll({ offset: 0, limit: 100 });
});

export const ammPools$ = from(req).pipe(
  catchError(() => of(undefined)),
  filter(Boolean),
  switchMap(([pools]: [AmmPool[], number]) =>
    combineLatest(
      pools.map((p) =>
        combineLatest(
          [p.lp.asset, p.x.asset, p.y.asset].map((asset) =>
            getAssetInfo(asset),
          ),
        ).pipe(map(([lp, x, y]) => new CardanoAmmPool(p, { lp, x, y }))),
      ),
    ),
  ),
  tap((res) => console.log(res)),
  publishReplay(1),
  refCount(),
);