import { t } from '@lingui/macro';
import React, { FC } from 'react';

import {
  FeesView,
  FeesViewItem,
} from '../../../../components/FeesBox/FeesView';
import { useMinExFee } from '../../settings/executionFee';
import { useMinTotalFee } from '../../settings/totalFee';
import { useTransactionFee } from '../../settings/transactionFee';

export const RedeemFees: FC = () => {
  const minExFee = useMinExFee('swap');
  const minTotalFee = useMinTotalFee('swap');
  const transactionFee = useTransactionFee('swap');

  const fees: FeesViewItem[] = [
    { caption: t`Transaction Fee`, currency: transactionFee },
    { caption: t`Execution Fee`, currency: minExFee },
  ];

  return <FeesView totalFees={minTotalFee} fees={fees} />;
};