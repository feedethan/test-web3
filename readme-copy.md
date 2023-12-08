# 连接钱包

- 使用 wallet connect v2 连接钱包, 并授权连接多条链 比如 bsc + polygon + op

# 签名

- 计算斐波那契数列第【30】位，并使用测试钱包的 signMessage 方法签署该数字，并给出签名

```js
/**
 * 0xa347Cc004b9Db4E0E1d7F1161507a94Be8040C4C
 * @mnemonic build ankle buddy toe adult bachelor used index merry advice foster fossil
 * @path m/44'/60'/0'/0/0
 * @locale en
 */

// TODO:
const signature = "";
console.log(signature);
```

- 还原以下 signature 的 owner,digest

```js
const message = "Hello dappOS!";
const signature =
  "0x21274cf4feb82a73be6100731b48d074f566f166376eee703dc0170353c7224e2a573af2d795deb28eef8d52aaf2621eac58312f07d9179178dd39bd11c61c271b";

// TODO:
console.log({
  digest,
  owner,
});
```

# 合约调用

- vwmanager 合约部署信息，[abi](./vwmanager.json)

  - op 0x4B88f06B6b1B58c675243932D35f674972194Fd7
  - bsc 0x4B88f06B6b1B58c675243932D35f674972194Fd7
  - avax 0x4B88f06B6b1B58c675243932D35f674972194Fd7
  - polygon 0x4B88f06B6b1B58c675243932D35f674972194Fd7
  - manta 0x3f83735B653d049750e5291aB36487d0bB842C65

- [tokenClassList](./token-class.json)

## 读操作 & 计算价值

### 余额获取必须使用 [multicall](https://github.com/cavanmflynn/ethers-multicall)
下列任选一个

1. 计算 virtualwallet 的总价值

   1. 调用 vwmanager.ownerWallet 获取给定的 owner 在 【bsc avax manta】 的虚拟钱包地址（简称 virtualwallet）
   2. 获取虚拟钱包在【bsc avax manta】的 usdt，usdc, 原生代币的余额
   3. 计算在 【bsc avax manta】 的 [tokenClassList](./token-class.json) 总余额价值，并给出计算过程
   4. 计算总价值，以及每个币种分别对应的数量

2. 计算 eoa 账户总价值
   1. 在 【bsc polygon op】 的 [tokenClassList](./token-class.json) 总余额价值，并给出计算过程
   2. 计算总价值，以及每个币种分别对应的数量

```js
const owner = "0x53F3798A4dc4fa4D6D411f3e91e14E7ecCc5Eb8D";
//TODO:

// 给出以下结构
const totalBalanceUSD = "xxx";
const balanceList = [
  {
    id: 1,
    tokenClassName: "USDC",
    price: "0.999700000000000000",
    balance: "xxx",
    balanceUSD: "xxx",
    whitelists: [
      {
        balance: "xxx",
        balanceUSD: "xxx",
        id: 1,
        chainId: 56,
        tokenName: "USDC",
        tokenSymbol: "USDC",
        tokenAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        tokenDecimal: 18,
        tokenClassId: 1,
        flag: 0,
      },
      // ....
    ],
    // ....
  },
];
```

## 写操作

1. 使用自己的钱包调用 vwmanager.createWallet 创建一个虚拟钱包，给出链上 hash。

<!-- # SDK 方面

1. 根据 sdk 导出方法生成一个 code，拼出一个 vwExecuteParam (code, service0, data0)
2. 签署该交易，给出签名
3. 并且调用 manager.execute -->

# UI

- 实现一个菜单选项的浮动弹框
  1. 鼠标悬浮可见
  2. 内容可点击

[demo](https://www.dappos.com/)
![dappos](./imgs/dappos.png)
