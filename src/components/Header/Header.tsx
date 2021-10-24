import './Header.less';

import Icon from '@ant-design/icons';
import { useState } from 'react';
import React from 'react';

import { ReactComponent as DarkModeOutlined } from '../../assets/icons/darkmode.svg';
import {
  BarChartOutlined,
  Button,
  Dropdown,
  FileTextOutlined,
  GithubOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  Logo,
  Menu,
  Popover,
  QuestionCircleOutlined,
  RightOutlined,
  SettingOutlined,
  Tabs,
} from '../../ergodex-cdk';
import { ConnectWallet } from '../ConnectWallet/ConnectWallet';
import { NetworkDropdown } from '../NetworkDropdown/NetworkDropdown';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

const DotsSVG = () => (
  <svg
    width="16"
    height="4"
    viewBox="0 0 16 4"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M0.125 1.97656C0.125 2.14892 0.158949 2.3196 0.224908 2.47884C0.290867 2.63807 0.387546 2.78276 0.509422 2.90464C0.631299 3.02652 0.775988 3.12319 0.935228 3.18915C1.09447 3.25511 1.26514 3.28906 1.4375 3.28906C1.60986 3.28906 1.78053 3.25511 1.93977 3.18915C2.09901 3.12319 2.2437 3.02652 2.36558 2.90464C2.48745 2.78276 2.58413 2.63807 2.65009 2.47884C2.71605 2.3196 2.75 2.14892 2.75 1.97656C2.75 1.8042 2.71605 1.63353 2.65009 1.47429C2.58413 1.31505 2.48745 1.17036 2.36558 1.04848C2.2437 0.926608 2.09901 0.82993 1.93977 0.763971C1.78053 0.698012 1.60986 0.664063 1.4375 0.664063C1.26514 0.664063 1.09447 0.698012 0.935228 0.763971C0.775988 0.82993 0.631299 0.926608 0.509422 1.04848C0.387546 1.17036 0.290867 1.31505 0.224908 1.47429C0.158949 1.63353 0.125 1.8042 0.125 1.97656ZM6.6875 1.97656C6.6875 2.32466 6.82578 2.6585 7.07192 2.90464C7.31806 3.15078 7.6519 3.28906 8 3.28906C8.3481 3.28906 8.68194 3.15078 8.92808 2.90464C9.17422 2.6585 9.3125 2.32466 9.3125 1.97656C9.3125 1.62847 9.17422 1.29463 8.92808 1.04848C8.68194 0.802343 8.3481 0.664062 8 0.664063C7.6519 0.664062 7.31806 0.802343 7.07192 1.04848C6.82578 1.29463 6.6875 1.62847 6.6875 1.97656ZM13.25 1.97656C13.25 2.32466 13.3883 2.6585 13.6344 2.90464C13.8806 3.15078 14.2144 3.28906 14.5625 3.28906C14.9106 3.28906 15.2444 3.15078 15.4906 2.90464C15.7367 2.6585 15.875 2.32466 15.875 1.97656C15.875 1.62847 15.7367 1.29463 15.4906 1.04848C15.2444 0.802343 14.9106 0.664062 14.5625 0.664063C14.2144 0.664062 13.8806 0.802343 13.6344 1.04848C13.3883 1.29463 13.25 1.62847 13.25 1.97656Z"
    />
  </svg>
);

const DotsIcon = () => <Icon component={DotsSVG} />;

const networks = [
  { name: 'ergo', token: 'erg-orange' },
  { name: 'cardano', token: 'ada' },
];

const settingsPopup: JSX.Element = (
  <div>
    <p>Content</p>
  </div>
);

export const Header: React.FC = () => {
  const [isMainMenu, setIsMainMenu] = useState<boolean>(true);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  const onMenuClicked = (e: { key: string }) => {
    if (e.key === '6') {
      setIsMainMenu(false);
    } else if (e.key === '8') {
      setIsMainMenu(true);
    }
  };

  const onMenuVisibleChange = (flag: boolean) => {
    setMenuVisible(flag);
    if (flag) {
      setIsMainMenu(true);
    }
  };

  const menu = [
    {
      title: 'About',
      icon: <InfoCircleOutlined />,
    },
    {
      title: 'How to use',
      icon: <QuestionCircleOutlined />,
    },
    {
      title: 'Docs',
      icon: <FileTextOutlined />,
    },
    {
      title: 'GitHub',
      icon: <GithubOutlined />,
    },
    {
      title: 'Analytics',
      icon: <BarChartOutlined />,
    },
    {
      title: 'Language',
      icon: <GlobalOutlined />,
      additional: <RightOutlined style={{ marginLeft: 36 }} />,
    },
    {
      title: 'Dark mode',
      icon: <DarkModeOutlined />,
      additional: (
        <ThemeSwitch
          defaultChecked
          size="small"
          className="header__theme-switch"
        />
      ),
    },
  ];

  const menuOthers = (
    <Menu onClick={onMenuClicked} style={{ width: 160 }}>
      {menu.map((item, index) => (
        <Menu.Item key={index + 1} icon={item.icon}>
          <a target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          {item.additional && item.additional}
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuLanguages = (
    <Menu onClick={onMenuClicked} style={{ width: 160 }}>
      <Menu.Item key="8" icon={<LeftOutlined />} />
      <Menu.Item key="9">
        <a target="_blank" rel="noopener noreferrer">
          English
        </a>
      </Menu.Item>
      <Menu.Item key="10">
        <a target="_blank" rel="noopener noreferrer">
          中国人
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo label />

        <div className="header__tabs">
          <Tabs defaultActiveKey="1" type="card">
            <Tabs.TabPane tab="Swap" key="1" />
            <Tabs.TabPane tab="Pool" key="2" />
            <Tabs.TabPane tab="Exchange" key="3" disabled />
          </Tabs>
        </div>

        <div className="header__options">
          <NetworkDropdown networks={networks} />
          <ConnectWallet
            isWalletConnected={true}
            numberOfPendingTxs={1}
            balance={123}
            currency="ERG"
            address="9iKWmL5t3y9u59fUESsbFQzG933UPjR1v7LUAjM6XPMAcXNhBzL"
          />
          <Popover
            content={settingsPopup}
            trigger="click"
            placement="bottomRight"
          >
            <Button type="text" size="large" icon={<SettingOutlined />} />
          </Popover>
          <Dropdown
            overlay={isMainMenu ? menuOthers : menuLanguages}
            trigger={['click']}
            visible={isMenuVisible}
            onVisibleChange={onMenuVisibleChange}
          >
            <Button size="large" icon={<DotsIcon />} />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};