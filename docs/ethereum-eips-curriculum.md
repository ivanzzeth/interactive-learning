# 重要 EIP 精讲 —— 课程大纲

> 目标受众：了解以太坊基础概念的人（先学完「以太坊核心概念」）
> 教学理念：每个 EIP 讲清"解决什么问题 → 怎么解决 → 实际影响"
> 参考资料：eips.ethereum.org 原文、OpenZeppelin 实现、各 EIP 作者的解释文章

---

## 前置知识

本书假设你已经了解：
- 以太坊账户（EOA vs 合约）、交易、Gas
- 智能合约的基本概念（函数、事件、状态变量）
- ABI 的概念

如果以上概念不清楚，请先学习「以太坊核心概念」。

---

## 第一章：代币标准

> 代币是以太坊最基础的应用，理解代币标准是理解整个 DeFi 的前提

### 1.1 ERC-20：同质化代币标准
- **解决的问题**：每个人写的代币合约接口都不一样，钱包和交易所无法通用
- **核心接口**：`totalSupply()`, `balanceOf()`, `transfer()`, `approve()`, `transferFrom()`, `allowance()`
- **授权模式**：为什么需要 `approve` + `transferFrom` 两步？
  - 用户不能让合约直接从自己账户扣钱
  - 先授权（approve）→ 合约再代扣（transferFrom）
- **常见陷阱**：
  - approve 的竞争条件（Race Condition）
  - 无限授权的安全风险
  - 不返回布尔值的非标准代币（如 USDT）
- **参考**：EIP-20 原文, OpenZeppelin ERC20 实现
- **实际影响**：USDT, USDC, DAI, LINK, UNI... 几乎所有 DeFi 代币

### 1.2 ERC-721：NFT 标准
- **解决的问题**：需要表示"每个都不一样"的数字资产（艺术品、游戏道具）
- **vs ERC-20**：ERC-20 的每个代币等价，ERC-721 的每个代币有唯一 tokenId
- **核心接口**：`ownerOf()`, `transferFrom()`, `safeTransferFrom()`, `approve()`, `setApprovalForAll()`
- **Metadata 扩展**：`tokenURI()` → 返回 JSON（名称、描述、图片 URL）
- **Enumerable 扩展**：`totalSupply()`, `tokenByIndex()`, `tokenOfOwnerByIndex()`
- **safeTransferFrom vs transferFrom**：safe 版本会检查接收方是否能处理 NFT
- **参考**：EIP-721 原文, OpenZeppelin ERC721 实现
- **实际影响**：CryptoPunks, BAYC, Art Blocks, ENS 域名

### 1.3 ERC-1155：多代币标准
- **解决的问题**：一个合约管理多种代币（FT + NFT 混合）
- **vs ERC-20 + ERC-721**：不需要为每种代币部署单独合约
- **核心优势**：
  - 批量操作：`balanceOfBatch()`, `safeBatchTransferFrom()`
  - Gas 节省：批量转账比逐个转账便宜得多
  - 灵活性：同一合约内既有同质化代币又有 NFT
- **核心接口**：`balanceOf(account, id)`, `safeTransferFrom()`, `safeBatchTransferFrom()`
- **URI 机制**：`uri(id)` 支持 `{id}` 占位符替换
- **参考**：EIP-1155 原文, Enjin 的设计理念文档
- **实际影响**：游戏道具（Enjin）、OpenSea 的共享合约

---

## 第二章：签名与授权

> 用户体验的核心改进：减少交易次数、支持 gasless 操作

### 2.1 EIP-712：类型化结构数据签名
- **解决的问题**：用户签名时看到的是一串乱码十六进制，不知道自己在签什么
- **解决方案**：定义结构化的签名格式，钱包可以展示人类可读的签名内容
- **核心概念**：
  - Domain Separator：标识哪个合约在哪条链上（防止跨链/跨合约重放）
  - Type Hash：描述数据结构
  - 签名内容 = domainSeparator + typeHash + 编码后的数据
- **钱包展示**：用户看到"你正在授权 USDC 100 给 0x123..."而不是"签名: 0xabcdef..."
- **参考**：EIP-712 原文, MetaMask signTypedData_v4 文档
- **实际影响**：几乎所有现代 DApp 的签名请求

### 2.2 EIP-2612：Permit（免 Gas 授权）
- **解决的问题**：ERC-20 的 approve + transferFrom 需要两笔交易
- **解决方案**：用 EIP-712 签名代替链上 approve → 一笔交易完成授权+转账
- **工作流程**：
  1. 用户离线签名一个 permit 消息（包含 spender, value, deadline, nonce）
  2. 任何人（通常是 DApp 后端）把签名提交到链上
  3. 合约验证签名，自动完成 approve
- **核心接口**：`permit(owner, spender, value, deadline, v, r, s)`
- **安全注意**：deadline 必须设置合理，避免签名被长期持有
- **参考**：EIP-2612 原文, Uniswap Permit2 的扩展设计
- **实际影响**：DAI, USDC 等主流代币已支持

### 2.3 EIP-165：接口检测标准
- **解决的问题**：合约 A 想知道合约 B 是否实现了某个接口
- **为什么重要**：发送 NFT 给一个不支持 NFT 的合约 → NFT 被永久锁住
- **核心接口**：`supportsInterface(bytes4 interfaceId) → bool`
- **接口 ID 计算**：所有函数选择器的 XOR
- **使用场景**：
  - safeTransferFrom 检查接收方是否实现了 onERC721Received
  - 市场合约检查 NFT 是否支持 Royalty（ERC-2981）
- **参考**：EIP-165 原文

---

## 第三章：Gas 与交易机制

### 3.1 EIP-1559：费用市场改革
- **解决的问题**：旧的竞价模式导致 Gas 费不可预测，用户经常多付
- **核心改变**：
  - Base Fee：协议自动计算，根据区块利用率动态调整
  - Priority Fee（Tip）：给验证者的小费
  - Max Fee：用户设定的价格上限
  - **Base Fee 被销毁** → ETH 变通缩
- **动态调整规则**：
  - 区块超过 50% 满 → Base Fee 上涨（最多 12.5%）
  - 区块不到 50% 满 → Base Fee 下降
- **交易类型 2**（Type 2 Transaction）：新的交易格式
- **参考**：EIP-1559 原文, Tim Beiko 的讲解
- **实际影响**：2021年8月 London 升级后所有以太坊交易

### 3.2 EIP-4844：Proto-Danksharding（Blob 交易）
- **解决的问题**：Layer 2 把数据提交到 L1 太贵
- **核心创新**：Blob——一种新的数据存储方式，专为 Rollup 设计
- **Blob 特点**：
  - 每个 Blob 约 128 KB
  - 比 calldata 便宜约 10-100 倍
  - 只保留约 18 天（不永久存储）
  - EVM 无法直接读取 Blob 内容（只能验证承诺）
- **Blob Gas 市场**：独立于普通 Gas 的费用市场
- **交易类型 3**（Type 3 Transaction）
- **参考**：EIP-4844 原文, Vitalik "Proto-Danksharding FAQ"
- **实际影响**：2024年3月 Dencun 升级后 L2 费用暴降

---

## 第四章：代理与升级模式

> 智能合约部署后不可修改——但有时候需要修复 bug 或升级功能

### 4.1 为什么需要可升级合约
- 合约部署后代码不可变
- 但现实中需要：修复漏洞、添加功能、适应监管
- 核心思路：把"逻辑"和"数据"分开

### 4.2 EIP-1967：代理存储槽标准
- **解决的问题**：代理合约需要存储"实现合约地址"，但这个存储槽可能和业务数据冲突
- **解决方案**：用固定的、极不可能冲突的存储槽位置
  - `bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)`
  - `bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)`
- **三种代理模式**：
  - Transparent Proxy：管理员调用 → 代理逻辑，普通用户调用 → 转发到实现
  - UUPS：升级逻辑在实现合约中，代理更轻量
  - Beacon Proxy：多个代理共享一个 Beacon，Beacon 指向实现
- **delegatecall**：代理合约的核心——在代理的上下文中执行实现合约的代码
- **参考**：EIP-1967 原文, OpenZeppelin Proxy 文档
- **实际影响**：大多数可升级合约的标准

### 4.3 EIP-2535：Diamond 标准（多面体代理）
- **解决的问题**：单一代理只能指向一个实现合约，合约大小有 24KB 限制
- **解决方案**：一个代理合约可以指向多个实现合约（Facet）
- **核心概念**：
  - Diamond：代理合约
  - Facet：功能模块（每个 Facet 提供一组函数）
  - Loupe：查看 Diamond 有哪些 Facet 和函数
  - diamondCut：添加/替换/删除 Facet
- **适用场景**：大型协议（功能太多，一个合约装不下）
- **参考**：EIP-2535 原文, Nick Mudge 的教程

---

## 第五章：账户抽象

> 以太坊用户体验的最大升级方向

### 5.1 为什么需要账户抽象
- 当前问题：
  - EOA 必须有 ETH 才能发交易（新用户上手难）
  - 私钥丢了就完了（没有恢复机制）
  - 不支持批量操作（每个操作一笔交易）
  - 不支持 Gas 代付
- **目标**：让所有账户都像智能合约一样可编程

### 5.2 ERC-4337：无需协议修改的账户抽象
- **核心思路**：不改以太坊协议，在应用层实现账户抽象
- **新概念**：
  - **UserOperation**：用户的意图描述（替代传统交易）
  - **Bundler**：收集 UserOperation，打包成普通交易提交到链上
  - **EntryPoint**：全局合约，验证和执行 UserOperation
  - **Smart Account**：用户的智能合约账户（替代 EOA）
  - **Paymaster**：代付 Gas 的合约（用户可以用 USDC 付 Gas，甚至免 Gas）
- **用户体验改进**：
  - 社交恢复（丢了私钥可以通过朋友找回）
  - Gas 代付（新用户无需持有 ETH）
  - 批量操作（一笔交易做多件事）
  - 自定义签名验证（支持 passkey、面部识别等）
- **参考**：EIP-4337 原文, Alchemy AA 文档, Infinitism 参考实现

### 5.3 EIP-7702：EOA 临时获得合约能力
- **解决的问题**：ERC-4337 需要用户迁移到新的智能合约账户，现有 EOA 无法享受
- **核心创新**：EOA 可以在一笔交易中临时设置代码
  - 交易执行期间，EOA 表现得像合约
  - 交易结束后，恢复原样
- **新交易类型**：Type 4 Transaction，包含 `authorization_list`
- **vs ERC-4337**：互补而非替代
  - 7702 让现有 EOA 立即获得批量操作、Gas 代付等能力
  - 4337 提供更完整的基础设施（Bundler、Paymaster 网络）
- **参考**：EIP-7702 原文, Vitalik 的设计理念
- **实际影响**：Pectra 升级（2025年）纳入

---

## 第六章：DeFi 相关 EIP

### 6.1 ERC-4626：代币化金库标准
- **解决的问题**：每个 DeFi 协议的"存款→份额"机制都不一样（Aave 的 aToken, Compound 的 cToken, Yearn 的 yToken...）
- **解决方案**：统一的金库接口标准
- **核心概念**：
  - 存入资产（asset）→ 获得份额（share）
  - 份额代表你在金库中的占比
  - 金库盈利 → 每份额对应更多资产
- **核心接口**：`deposit()`, `withdraw()`, `mint()`, `redeem()`, `convertToShares()`, `convertToAssets()`
- **参考**：EIP-4626 原文, Yearn V3 的实现
- **实际影响**：几乎所有新的 DeFi 金库协议

### 6.2 ERC-3156：闪电贷标准
- **解决的问题**：闪电贷（Flash Loan）各协议接口不统一
- **什么是闪电贷**：
  - 在一笔交易内借款 → 使用 → 还款（包括手续费）
  - 如果还不上 → 整笔交易回滚，就像从没借过
  - 不需要抵押品（原子性保证）
- **核心接口**：
  - Lender：`flashLoan(receiver, token, amount, data)`
  - Borrower：`onFlashLoan(initiator, token, amount, fee, data) → bytes32`
- **使用场景**：套利、清算、抵押品置换、自清算
- **参考**：EIP-3156 原文, Aave V3 Flash Loan 文档

### 6.3 ERC-2981：NFT 版税标准
- **解决的问题**：创作者希望在 NFT 二次销售时获得版税，但没有标准接口
- **核心接口**：`royaltyInfo(tokenId, salePrice) → (receiver, royaltyAmount)`
- **注意**：这只是信息标准，不能强制执行（市场可以选择不付版税）
- **参考**：EIP-2981 原文
- **实际影响**：OpenSea, Blur 等市场的版税政策讨论

---

## 第七章：安全相关 EIP

### 7.1 EIP-4758：停用 SELFDESTRUCT
- **背景**：`selfdestruct` 可以销毁合约并转走所有 ETH
- **问题**：破坏状态不可变性假设，给 Verkle Trees 升级造成困难
- **变化**：Dencun 升级后 `selfdestruct` 只转移 ETH，不再删除合约代码和存储
- **影响**：依赖 `selfdestruct` 删除合约的模式不再可用

### 7.2 EIP-150：Gas 成本调整（Tangerine Whistle）
- **背景**：2016 年 DoS 攻击利用了过低的 IO 操作 Gas 成本
- **变化**：提高 `SLOAD`, `BALANCE`, `EXTCODESIZE` 等操作的 Gas 成本
- **教训**：Gas 定价必须反映真实计算成本

### 7.3 ERC-7201：命名空间存储布局
- **解决的问题**：可升级合约中，不同版本的存储变量可能冲突
- **解决方案**：用命名空间哈希确定存储位置
  - `keccak256(abi.encode(uint256(keccak256("namespace.id")) - 1)) & ~bytes32(uint256(0xff))`
- **vs EIP-1967**：1967 解决代理合约的存储槽，7201 解决实现合约的存储布局
- **参考**：ERC-7201 原文, OpenZeppelin 5.0 的实现

---

## 第八章：EVM 改进

### 8.1 EIP-1153：瞬态存储（Transient Storage）
- **解决的问题**：有些数据只在当前交易内需要，但 `SSTORE` 永久存储太贵
- **新操作码**：`TSTORE` / `TLOAD`（写入/读取瞬态存储）
- **特点**：
  - 交易结束后自动清除
  - 比 `SSTORE` 便宜得多（100 Gas vs 20000 Gas）
  - 跨合约调用可见（同一交易内）
- **使用场景**：重入锁、回调上下文传递、临时中间状态
- **参考**：EIP-1153 原文
- **实际影响**：Dencun 升级后可用，Uniswap V4 大量使用

### 8.2 EIP-3855：PUSH0 指令
- **解决的问题**：把 0 推入栈需要 `PUSH1 0x00`（2 字节），很浪费
- **新操作码**：`PUSH0`（1 字节，2 Gas）
- **影响**：减少合约大小，节省部署 Gas
- **参考**：EIP-3855 原文

### 8.3 EIP-6780：限制 SELFDESTRUCT
- 与 EIP-4758 相关，是具体的实现规范
- 只有在合约创建的同一交易中调用 `selfdestruct` 才会删除合约

---

## 第九章：跨链与互操作性

### 9.1 EIP-3668：CCIP Read（链下数据查询）
- **解决的问题**：链上数据存储昂贵，但需要可验证地读取链下数据
- **核心机制**：
  1. 合约 revert 一个特殊错误 `OffchainLookup(...)`
  2. 客户端根据错误中的 URL 去链下服务获取数据
  3. 客户端带着链下响应再次调用合约验证
- **使用场景**：ENS 的 L2 域名解析、链下数据验证
- **参考**：EIP-3668 原文, ENS Offchain Resolver 文档

### 9.2 ERC-5564 + EIP-6538：隐身地址
- **解决的问题**：链上交易完全透明，没有隐私
- **隐身地址**：每次收款生成新地址，外人无法关联到你
- **核心流程**：
  1. 接收方发布一个"元地址"（Stealth Meta-Address）
  2. 发送方用元地址 + 随机数生成一个一次性隐身地址
  3. 只有接收方能推导出对应私钥
- **参考**：Vitalik "An incomplete guide to stealth addresses" (2023)

---

## 第十章：模块化账户

### 10.1 ERC-6900：模块化智能账户
- **解决的问题**：ERC-4337 的智能账户缺乏模块化标准，每家实现不兼容
- **核心概念**：
  - 账户 = 核心 + 可插拔模块
  - 验证模块（Validation）：谁可以操作这个账户
  - 执行模块（Execution）：账户能做什么操作
  - Hook 模块：操作前后的检查/处理
- **意义**：用户可以像安装 App 一样给钱包添加功能
- **参考**：ERC-6900 原文, Alchemy Modular Account

### 10.2 ERC-7579：最小模块化智能账户
- **vs ERC-6900**：更轻量、更灵活的模块化标准
- **核心区别**：
  - 6900 定义了严格的模块类型和接口
  - 7579 定义了最小接口，给实现方更多自由
- **模块类型**：Validator, Executor, Fallback Handler, Hook
- **参考**：ERC-7579 原文, Rhinestone 的实现

---

## 知识地图

```
代币标准
├── ERC-20 (同质化) ← 基础
├── ERC-721 (NFT) ← 基础
├── ERC-1155 (多代币) ← 进阶
└── ERC-2981 (版税)

签名与授权
├── EIP-712 (类型化签名) ← 核心
├── EIP-2612 (Permit) ← 依赖 712
└── EIP-165 (接口检测) ← 基础

Gas 与交易
├── EIP-1559 (费用市场) ← 核心
└── EIP-4844 (Blob) ← L2 相关

代理升级
├── EIP-1967 (代理存储槽) ← 核心
├── EIP-2535 (Diamond) ← 进阶
└── ERC-7201 (命名空间存储) ← 进阶

账户抽象
├── ERC-4337 (AA 基础设施) ← 核心
├── EIP-7702 (EOA 升级) ← 最新
├── ERC-6900 (模块化) ← 进阶
└── ERC-7579 (最小模块化) ← 进阶

DeFi 相关
├── ERC-4626 (金库标准) ← 核心
└── ERC-3156 (闪电贷)

EVM 改进
├── EIP-1153 (瞬态存储) ← 重要
├── EIP-3855 (PUSH0)
└── EIP-6780 (限制 SELFDESTRUCT)

跨链与隐私
├── EIP-3668 (CCIP Read)
└── ERC-5564 (隐身地址)
```

### EIP 依赖关系

```
EIP-712 ──→ EIP-2612 (Permit 基于 712 签名)
EIP-165 ──→ ERC-721 (NFT 需要接口检测)
         ──→ ERC-1155 (同上)
EIP-1967 ──→ UUPS / Transparent Proxy (代理模式基础)
ERC-4337 ──→ ERC-6900 / ERC-7579 (模块化基于 AA)
EIP-7702 ──→ 与 ERC-4337 互补
EIP-1559 ──→ EIP-4844 (Blob 有独立费用市场，借鉴 1559 设计)
```
