import './Ratio.less';

import React, { useState } from 'react';
import { debounceTime, map } from 'rxjs';

import { Currency } from '../../../common/models/Currency';
import { Animation, Typography } from '../../../ergodex-cdk';
import { FormGroup } from '../../../ergodex-cdk/components/Form/NewForm';
import { useObservable } from '../../../hooks/useObservable';
import { SwapFormModel } from '../SwapFormModel';

const calculateOutputPrice = ({
  fromAmount,
  fromAsset,
  pool,
}: Required<SwapFormModel>): Currency => {
  if (fromAmount?.isPositive()) {
    return pool.calculateOutputPrice(fromAmount);
  } else {
    return pool.calculateOutputPrice(new Currency('1', fromAsset));
  }
};

const calculateInputPrice = ({
  toAmount,
  toAsset,
  pool,
}: Required<SwapFormModel>): Currency => {
  if (toAmount?.isPositive()) {
    return pool.calculateInputPrice(toAmount);
  } else {
    return pool.calculateInputPrice(new Currency('1', toAsset));
  }
};

export const Ratio = ({ form }: { form: FormGroup<SwapFormModel> }) => {
  const [reversed, setReversed] = useState(false);
  const [ratio] = useObservable(
    form.valueChangesWithSilent$.pipe(
      debounceTime(100),
      map((value) => {
        if (!value.pool || !value.fromAsset) {
          return undefined;
        }
        if (reversed) {
          return calculateInputPrice(value as Required<SwapFormModel>);
        } else {
          return calculateOutputPrice(value as Required<SwapFormModel>);
        }
      }),
      map((price) =>
        reversed
          ? `1 ${form.value.toAsset?.name} - ${price?.toString()}`
          : `1 ${form.value.fromAsset?.name} - ${price?.toString()}`,
      ),
    ),
    { deps: [form, reversed] },
  );

  const toggleReversed = () => setReversed((reversed) => !reversed);

  return (
    <Animation.Expand expanded={!!form.value.pool}>
      <Typography.Body className="price-indicator" onClick={toggleReversed}>
        {ratio}
      </Typography.Body>
    </Animation.Expand>
  );
};
