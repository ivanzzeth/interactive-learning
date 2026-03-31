# 以太坊核心概念 —— 课程大纲

> 目标受众：零基础小白，不需要编程经验
> 教学理念：用类比解释每个概念，先建立直觉再深入细节
> 参考资料：ethereum.org 官方文档、Mastering Ethereum (Andreas Antonopoulos)、Ethereum Whitepaper、EVM Illustrated

---

## 第一章：区块链是什么

> 在学以太坊之前，先理解区块链这个底层概念

### 1.1 从记账说起
- **核心类比**：区块链 = 一本所有人共同维护的公开账本
- 传统记账（银行）vs 区块链记账（去中心化）
- 为什么需要"所有人共同维护"？—— 信任问题
- **参考**：3Blue1Brown "But how does bitcoin actually work?" (YouTube)

### 1.2 区块与链
- 区块 = 一页账本纸（记录一批交易）
- 链 = 每一页都盖了前一页的指纹（哈希链接）
- 篡改一页 → 后面所有页的指纹都对不上 → 篡改被发现
- **动画图解**：区块链接结构

### 1.3 去中心化网络
- 中心化：所有人连银行，银行说了算
- 去中心化：所有人互相连接，共同验证
- 节点（Node）= 保存完整账本的电脑
- 共识 = 大家怎么达成一致？（先了解概念，后面详细讲 PoS）
- **参考**：ethereum.org/developers/docs/nodes-and-clients

### 1.4 公钥密码学（极简版）
- 私钥 = 你的密码（绝对不能给别人）
- 公钥 = 你的身份证号（可以公开）
- 地址 = 你的银行卡号（从公钥推导出来）
- 数字签名 = 证明"这笔交易确实是我发的"
- **核心要点**：私钥 → 公钥 → 地址（单向推导，不可逆）

---

## 第二章：以太坊基础

### 2.1 以太坊 vs 比特币
- 比特币 = 数字黄金（只能转账）
- 以太坊 = 世界计算机（能转账 + 能运行程序）
- 智能合约 = 运行在区块链上的自动程序
- **类比**：比特币是计算器，以太坊是电脑
- **参考**：Ethereum Whitepaper 第一部分

### 2.2 以太币（ETH）
- ETH = 以太坊的原生货币
- 用途：支付交易手续费（Gas）、质押（Staking）、价值存储
- 最小单位：Wei（1 ETH = 10^18 Wei）
- 常用单位：Gwei（1 Gwei = 10^9 Wei，Gas 价格常用此单位）
- **参考**：ethereum.org/eth

### 2.3 账户
- **EOA（外部拥有账户）**= 人控制的账户，有私钥
- **合约账户** = 代码控制的账户，没有私钥
- 账户的四个字段：nonce, balance, codeHash, storageRoot
- **类比**：EOA = 你的银行卡，合约账户 = 自动售货机
- **参考**：ethereum.org/developers/docs/accounts

### 2.4 交易
- 交易 = "我要做一件事"的签名指令
- 交易字段：from, to, value, data, gas, gasPrice, nonce
- 交易类型：转账 ETH、调用合约、部署合约
- Nonce：每个账户的交易序号（防止重放攻击）
- 交易签名 → 广播到网络 → 矿工/验证者打包 → 执行 → 上链
- **参考**：ethereum.org/developers/docs/transactions

---

## 第三章：Gas 与费用

### 3.1 为什么需要 Gas
- 每个操作都消耗计算资源 → 需要付费
- Gas = 衡量计算量的单位（类比汽车的汽油）
- 防止死循环：代码执行消耗 Gas，Gas 耗尽就强制停止
- **类比**：投币洗衣机——投多少硬币就洗多久

### 3.2 Gas 计算
- Gas Limit = 你愿意最多花多少 Gas
- Gas Price = 每单位 Gas 你愿意付多少 Gwei
- 实际花费 = Gas Used × Gas Price
- 剩余 Gas 会退还
- Gas 不够 → 交易失败（Out of Gas），但已消耗的 Gas 不退

### 3.3 EIP-1559 费用机制
- 旧模式：竞价（出价高的先被打包）
- 新模式（EIP-1559）：Base Fee + Priority Fee（小费）
- Base Fee：网络自动调节，拥挤时涨价，闲时降价
- Base Fee 被销毁（burn）→ ETH 变通缩
- Priority Fee（小费）给验证者 → 激励优先打包你的交易
- Max Fee = 你愿意付的最高总价
- **参考**：ethereum.org/developers/docs/gas、EIP-1559 原文

### 3.4 如何节省 Gas
- 常见操作的 Gas 消耗：转账 21000、存储写入 20000、存储读取 2100
- 实用技巧：避免链上存大数据、合并操作、选择低峰期交易
- Gas 追踪工具：etherscan.io/gastracker

---

## 第四章：智能合约

### 4.1 智能合约是什么
- 智能合约 = 部署在区块链上的程序
- 一旦部署就不可修改（除非用了升级模式）
- 任何人都可以调用、所有执行结果公开透明
- **类比**：自动售货机——投币（调用）→ 按按钮（函数）→ 出货（结果）
- **参考**：ethereum.org/developers/docs/smart-contracts

### 4.2 Solidity 极简介绍
- Solidity = 写以太坊智能合约最常用的语言
- 基本结构：pragma、contract、函数、状态变量
- 不需要会写，只需要看懂大概结构
- **代码示例**：最简单的存取数字合约

### 4.3 合约的生命周期
- 编写 → 编译（得到字节码 + ABI）→ 部署（发交易）→ 交互（调用函数）
- 字节码 = EVM 能执行的指令
- ABI = 合约的"说明书"（告诉外部怎么调用）
- **参考**：ethereum.org/developers/docs/smart-contracts/compiling

### 4.4 合约交互
- 读取（view/pure 函数）= 免费，不需要发交易
- 写入（状态修改函数）= 需要发交易，需要 Gas
- 事件（Event）= 合约发出的"通知"，链下程序可以监听
- **参考**：ethereum.org/developers/docs/smart-contracts/anatomy

---

## 第五章：EVM（以太坊虚拟机）

### 5.1 什么是 EVM
- EVM = 以太坊的"CPU"，执行智能合约的虚拟计算机
- 所有节点都运行同一个 EVM，保证结果一致
- **类比**：Java 虚拟机（JVM）—— 写一次，到处运行
- **参考**：ethereum.org/developers/docs/evm

### 5.2 EVM 的内存模型
- Stack（栈）= 临时计算空间（256位，最深1024）
- Memory（内存）= 函数执行期间的临时存储，执行完就消失
- Storage（存储）= 永久存储，写入区块链，最贵的操作
- Calldata（调用数据）= 函数参数，只读
- **类比**：Stack = 你脑子里的心算，Memory = 草稿纸，Storage = 笔记本

### 5.3 字节码与操作码
- Solidity → 编译 → 字节码（一串十六进制数）
- 字节码由操作码（Opcode）组成：PUSH, POP, ADD, SSTORE, SLOAD...
- 每个操作码有固定的 Gas 消耗
- **了解即可**：不需要会写字节码，但理解"合约最终是字节码在执行"

---

## 第六章：共识机制

### 6.1 为什么需要共识
- 所有节点需要对"哪些交易有效"达成一致
- 防止双花：同一笔钱不能花两次
- 拜占庭将军问题：如何在有坏人的情况下达成一致

### 6.2 PoW vs PoS
- PoW（工作量证明）：解数学题，消耗电力 → 以太坊已弃用
- PoS（权益证明）：质押 ETH 成为验证者 → 以太坊现在使用
- The Merge（2022年9月）：以太坊从 PoW 切换到 PoS
- **类比**：PoW = 谁算得快谁记账，PoS = 谁押的钱多谁记账
- **参考**：ethereum.org/developers/docs/consensus-mechanisms/pos

### 6.3 验证者与质押
- 质押 32 ETH → 成为验证者
- 验证者的职责：提议区块、验证其他人的区块
- 诚实行为 → 获得奖励（ETH）
- 恶意行为 → 罚没（Slashing，扣掉质押的 ETH）
- 流动质押：Lido (stETH), Rocket Pool (rETH)

### 6.4 最终确定性
- Slot（12秒）→ Epoch（32个Slot = 6.4分钟）
- 2个 Epoch 后交易被"最终确定"（Finalized）→ 不可逆转
- **参考**：ethereum.org/developers/docs/consensus-mechanisms/pos/gasper

---

## 第七章：Layer 2 扩容

### 7.1 为什么需要 Layer 2
- 以太坊主网（Layer 1）：安全但慢且贵
- Layer 2：在链下处理交易，把结果提交到 Layer 1
- **类比**：Layer 1 = 法院判决（慢但权威），Layer 2 = 私下协商后法院备案
- **参考**：ethereum.org/layer-2

### 7.2 Rollup
- Rollup = 把大量交易"卷"成一笔提交到 L1
- Optimistic Rollup：假设交易都是对的，有争议再验证（Optimism, Arbitrum, Base）
- ZK Rollup：用数学证明交易是对的（zkSync, StarkNet, Scroll）
- **类比**：Optimistic = 先上车后补票，ZK = 先验票再上车

### 7.3 主要 Layer 2 生态
- Optimism (OP Stack) → Base, opBNB, Mantle
- Arbitrum → Arbitrum One, Arbitrum Nova
- zkSync Era, StarkNet, Scroll, Linea
- 跨链桥：在 L1 和 L2 之间转移资产

### 7.4 Layer 2 对用户的影响
- Gas 费便宜 10-100 倍
- 交易确认更快
- 用户体验几乎和 L1 一样（同样的钱包、同样的地址）
- 但需要注意：跨链桥风险、数据可用性、退出周期

---

## 第八章：DeFi 基础

### 8.1 什么是 DeFi
- DeFi = 去中心化金融（Decentralized Finance）
- 用智能合约替代银行、交易所、保险公司
- 特点：无需许可、透明、可组合（"金融乐高"）
- **参考**：ethereum.org/defi

### 8.2 核心 DeFi 协议类型
- **DEX（去中心化交易所）**：Uniswap, SushiSwap
  - AMM（自动做市商）：用数学公式定价，不需要订单簿
  - x * y = k（恒定乘积公式）
- **借贷**：Aave, Compound
  - 超额抵押：借 100 美元需要抵押 150 美元的 ETH
  - 清算：抵押品价值下跌 → 自动被卖掉还债
- **稳定币**：USDT, USDC（中心化）、DAI（去中心化）
- **流动质押**：Lido, Rocket Pool

### 8.3 DeFi 风险
- 智能合约漏洞（被黑客攻击）
- 无常损失（提供 LP 流动性的风险）
- 清算风险（借贷时抵押品不足）
- 预言机风险（链上合约依赖链下数据）
- **安全优先**：只用经过审计的协议，从小额开始

---

## 第九章：NFT 与数字资产

### 9.1 什么是 NFT
- NFT = 非同质化代币（Non-Fungible Token）
- 同质化（Fungible）：1 ETH = 1 ETH（可互换）
- 非同质化：每个 NFT 都是独一无二的
- **类比**：ETH 像钞票（100块 = 100块），NFT 像画作（蒙娜丽莎 ≠ 星空）

### 9.2 NFT 技术原理
- ERC-721：每个代币有唯一 tokenId
- ERC-1155：一个合约管理多种代币（既有 NFT 又有同质化代币）
- Metadata：NFT 的描述信息（图片、名称、属性）
- 链上 vs 链下存储：图片通常存在 IPFS/Arweave，不在链上

### 9.3 NFT 的应用场景
- 数字艺术、PFP（头像）、游戏道具
- 身份凭证（SBT 灵魂绑定代币）
- 门票、会员资格
- 域名（ENS: .eth 域名）

---

## 第十章：钱包与安全

### 10.1 钱包是什么
- 钱包 ≠ 存钱的地方（资产在链上，不在钱包里）
- 钱包 = 管理你的私钥的工具
- **类比**：钱包是保险箱的钥匙，不是保险箱本身

### 10.2 钱包类型
- 浏览器插件：MetaMask（最常用）
- 手机钱包：Rainbow, Trust Wallet
- 硬件钱包：Ledger, Trezor（最安全）
- 多签钱包：Safe（多人共同管理）

### 10.3 助记词与安全
- 助记词（Seed Phrase）= 12/24 个英文单词 = 你的终极密码
- 助记词 → 私钥 → 公钥 → 地址（HD 钱包推导）
- **绝对不能**：截图、联网保存、告诉任何人
- **应该**：手写在纸上、存多份、放安全的地方
- **参考**：BIP-39, BIP-44 标准

### 10.4 常见骗局与防范
- 钓鱼网站（假的 DApp 网站）
- 恶意授权（Approve 无限额度）
- 假空投/假客服
- 安全习惯：检查 URL、使用硬件钱包签名、定期 revoke 授权（revoke.cash）

---

## 第十一章：以太坊开发者生态

### 11.1 开发工具
- Solidity / Vyper（智能合约语言）
- Foundry / Hardhat（开发框架）
- Ethers.js / Web3.js / Viem（前端库）
- Remix IDE（在线编辑器）

### 11.2 基础设施
- RPC 节点：Infura, Alchemy, QuickNode（连接以太坊网络的接口）
- 区块浏览器：Etherscan（查看链上数据）
- IPFS / Arweave（去中心化存储）
- The Graph（链上数据索引）

### 11.3 测试网络
- Sepolia（主要测试网）
- 测试币水龙头（Faucet）
- 为什么需要测试网：在不花真钱的情况下测试合约

---

## 第十二章：以太坊路线图

### 12.1 以太坊的未来
- The Merge ✅（2022 - PoW → PoS）
- The Surge（扩容 - Danksharding, EIP-4844 Proto-Danksharding ✅）
- The Scourge（抗审查 - PBS, MEV 治理）
- The Verge（验证简化 - Verkle Trees）
- The Purge（精简 - 状态过期、历史过期）
- The Splurge（其他改进 - 账户抽象、EVM 改进）
- **参考**：Vitalik "The Roadmap" (2023), ethereum.org/roadmap

### 12.2 账户抽象（AA）
- 现在的问题：EOA 必须有 ETH 才能发交易、私钥丢了就完了
- 账户抽象的目标：让合约账户像 EOA 一样好用
- ERC-4337：不改协议层实现账户抽象
- EIP-7702：EOA 临时变成智能合约
- **意义**：社交恢复、Gas 代付、批量交易、无 Gas 体验

### 12.3 数据可用性
- EIP-4844（Proto-Danksharding）：L2 的数据存储便宜 10-100 倍
- Blob 交易：专门为 Rollup 设计的低成本数据存储
- 完整 Danksharding：未来进一步扩容

---

## 知识地图

```
                          ┌─ 区块链基础 (Ch1)
                          │
                    ┌─────┤
                    │     └─ 密码学 (Ch1.4)
                    │
  ┌─ 以太坊基础 ───┤─── 账户 & 交易 (Ch2)
  │                │
  │                ├─── Gas & 费用 (Ch3)
  │                │
  │                └─── 共识 PoS (Ch6)
  │
  ├─ 智能合约 ─────┤─── 合约基础 (Ch4)
  │                │
  │                └─── EVM (Ch5)
  │
  ├─ 应用层 ───────┤─── DeFi (Ch8)
  │                │
  │                ├─── NFT (Ch9)
  │                │
  │                └─── 钱包 & 安全 (Ch10)
  │
  ├─ 扩容 ─────────┤─── Layer 2 (Ch7)
  │
  └─ 生态 & 未来 ──┤─── 开发者工具 (Ch11)
                    │
                    └─── 路线图 (Ch12)
```
