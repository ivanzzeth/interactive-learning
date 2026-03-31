import type { Book } from '../types'

export const ethereumEipsBook: Book = {
  id: 'ethereum-eips',
  title: '重要 EIP 精讲',
  icon: '📜',
  color: '#8B5CF6',
  description: '深入理解塑造以太坊的关键提案——代币标准、账户抽象、Gas机制',
  chapters: [
    // =============================================
    // 第一章：代币标准
    // =============================================
    {
      id: 'ch1-token-standards',
      title: '第一章：代币标准',
      lessons: [
        // --- 1.1 ERC-20：同质化代币标准（深入版）---
        {
          id: 'erc20-fungible-token',
          title: 'ERC-20：同质化代币标准',
          cards: [
            {
              type: 'explain',
              title: 'ERC-20 解决了什么问题？',
              content:
                '在 ERC-20 之前，每个开发者写的代币合约接口都不一样。钱包要支持一种新代币，就得专门写适配代码；交易所也是一样。\n\nERC-20 统一了"同质化代币"的接口标准——所有代币都实现相同的函数，钱包和交易所只需适配一次。\n\n"同质化"的意思是：每一个代币都一模一样，就像每张 100 元纸币都等价。\n\n**参考**：[EIP-20 原文](https://eips.ethereum.org/EIPS/eip-20)',
              analogy: '就像 USB 接口统一了各种设备的连接方式——不管是键盘、鼠标还是U盘，只要是 USB 接口就能插上去用。',
            },
            {
              type: 'explain',
              title: '完整 Solidity 接口详解',
              content:
                '下面是 ERC-20 的完整接口定义，每个函数都有明确的语义：\n\n```solidity\ninterface IERC20 {\n    // ========= 查询函数（view，不消耗 Gas）=========\n    \n    // 返回代币总供应量（所有地址余额之和）\n    function totalSupply() external view returns (uint256);\n    \n    // 返回 account 持有的代币数量\n    function balanceOf(address account) external view returns (uint256);\n    \n    // 返回 owner 授权给 spender 的剩余额度\n    function allowance(address owner, address spender) external view returns (uint256);\n    \n    // ========= 状态修改函数 =========\n    \n    // 从 msg.sender 转 amount 给 to，返回是否成功\n    function transfer(address to, uint256 amount) external returns (bool);\n    \n    // msg.sender 授权 spender 最多可花 amount\n    function approve(address spender, uint256 amount) external returns (bool);\n    \n    // 从 from 转 amount 给 to（前提：from 已授权 msg.sender）\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n    \n    // ========= 事件 =========\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n```\n\n**关键细节**：\n- `transfer` 和 `transferFrom` 返回 `bool`（但很多合约忽略返回值——后面会讲这个坑）\n- `indexed` 参数会被存入 EVM 日志的 topics 中，可以高效过滤查询\n- `Transfer(address(0), to, amount)` 表示铸造（mint），`Transfer(from, address(0), amount)` 表示销毁（burn）',
            },
            {
              type: 'explain',
              title: 'EVM 存储布局：余额和授权在链上如何存储',
              content:
                'ERC-20 合约的核心状态只有两个 mapping：\n\n```solidity\n// slot 0: 余额映射\nmapping(address => uint256) private _balances;\n\n// slot 1: 授权映射（二维）\nmapping(address => mapping(address => uint256)) private _allowances;\n\n// slot 2: 总供应量\nuint256 private _totalSupply;\n```\n\n**EVM 存储计算原理**：\n\nSolidity 的 `mapping` 不像数组那样连续存储。它用 `keccak256` 哈希来定位每个 key 对应的存储槽：\n\n```\n// _balances[addr] 的存储位置：\nslot = keccak256(abi.encode(addr, 0))  // 0 是 _balances 的声明槽位\n\n// _allowances[owner][spender] 的存储位置（两层哈希）：\nintermediate = keccak256(abi.encode(owner, 1))  // 1 是 _allowances 的声明槽位\nslot = keccak256(abi.encode(spender, intermediate))\n```\n\n**为什么这很重要？**\n- 每次读写一个 storage slot 消耗 2100 Gas（冷读取）或 100 Gas（热读取）\n- `transfer()` 需要修改两个余额 slot = 至少 2 次 SSTORE（每次 5000-20000 Gas）\n- 这就是为什么 ERC-20 转账大约消耗 ~65,000 Gas',
            },
            {
              type: 'explain',
              title: 'approve + transferFrom 深入剖析：为什么必须两步？',
              content:
                '**核心问题**：在 EVM 中，`msg.sender` 永远是直接调用合约的那个地址。\n\n当用户与 DEX 交互时，调用链是这样的：\n\n```\n用户 EOA → DEX 合约.swap() → 代币合约.transferFrom()\n```\n\n在 `transferFrom` 执行时，`msg.sender` 是 **DEX 合约**，不是用户。所以代币合约不能用 `msg.sender` 来确认"用户同意了这笔转账"。\n\n**完整流程**：\n\n```\n第一步：用户直接调用代币合约\n用户 EOA → Token.approve(DEX地址, 100)\n  → msg.sender = 用户 ✓\n  → _allowances[用户][DEX] = 100\n  → 触发 Approval 事件\n\n第二步：DEX 代扣\n用户 EOA → DEX.swap(tokenA, tokenB, 100)\n  → DEX 内部调用 TokenA.transferFrom(用户, DEX, 100)\n    → msg.sender = DEX ✓\n    → 检查 _allowances[用户][DEX] >= 100 ✓\n    → _balances[用户] -= 100\n    → _balances[DEX] += 100\n    → _allowances[用户][DEX] -= 100\n    → 触发 Transfer 事件\n```\n\n**本质原因**：Solidity 没有"委托调用者"的概念（不像有些语言有 `tx.origin` 可追溯——但用 `tx.origin` 做鉴权是严重安全漏洞）。所以必须用"预授权 + 检查"模式。',
            },
            {
              type: 'explain',
              title: 'approve 竞争条件（Race Condition）详解',
              content:
                '这是 ERC-20 最经典的安全问题。场景如下：\n\n**初始状态**：Alice 已经 `approve(Bob, 100)`\n\n**Alice 想把授权改为 50**：\n\n```\n时间线：\n1. Alice 提交 tx: approve(Bob, 50)  [在 mempool 中等待]\n2. Bob 看到了 Alice 的 pending tx（前端监听或 MEV）\n3. Bob 抢先提交 tx: transferFrom(Alice, Bob, 100)  [更高 Gas]\n4. Bob 的 tx 先被打包 → 花掉 100\n5. Alice 的 approve(Bob, 50) 被打包 → 授权变为 50\n6. Bob 再提交 transferFrom(Alice, Bob, 50) → 又花掉 50\n\n总计：Bob 花了 150，而 Alice 本意是最多让他花 50\n```\n\n**解决方案**：\n\n1. **先归零再设值**：`approve(Bob, 0)` → 等确认 → `approve(Bob, 50)`。但需要两笔交易。\n\n2. **使用 increaseAllowance/decreaseAllowance**（OpenZeppelin 扩展）：\n```solidity\nfunction increaseAllowance(address spender, uint256 addedValue) public returns (bool) {\n    _approve(msg.sender, spender, _allowances[msg.sender][spender] + addedValue);\n    return true;\n}\n```\n这两个函数是原子操作，基于当前值增减，不会被前面描述的方式利用。\n\n3. **使用 EIP-2612 Permit**（后面章节详述）：用签名替代链上 approve，从根本上消除竞争条件。',
            },
            {
              type: 'explain',
              title: '非标准代币与 SafeERC20',
              content:
                '现实世界的 ERC-20 远比标准复杂。以下是你必须知道的"坑"：\n\n**1. USDT 不返回 bool**\n\nERC-20 标准要求 `transfer()` 和 `approve()` 返回 `bool`。但 USDT 的实现是：\n```solidity\n// USDT 的 transfer（不返回值！）\nfunction transfer(address _to, uint _value) public {\n    // ... 转账逻辑\n    // 没有 return true;\n}\n```\n\n如果你的合约这样写就会 revert：\n```solidity\nbool success = IERC20(usdt).transfer(to, amount); // 💥 revert！\n```\n因为 ABI 解码期望一个 bool 返回值，但 USDT 什么都没返回。\n\n**解决方案**：OpenZeppelin 的 `SafeERC20`：\n```solidity\nusing SafeERC20 for IERC20;\nIERC20(usdt).safeTransfer(to, amount); // ✓ 内部用 low-level call + 检查返回数据长度\n```\n\n**2. Fee-on-Transfer 代币**\n\nUSDT 有一个可开启的转账手续费。假设你转 100 USDT，接收方可能只收到 99。DeFi 协议必须检查转账前后的 `balanceOf` 差值，而不是信任传入的 `amount`。\n\n**3. Rebasing 代币（如 stETH）**\n\nstETH 的余额会随 Lido 质押收益自动增长——不触发任何 Transfer 事件。这会导致：\n- AMM 的储备量和实际余额不一致\n- 依赖 Transfer 事件的索引器漏掉余额变化\n- **解决方案**：用 wstETH（wrapped）代替，它的余额不变，收益体现在赎回比例中。',
            },
            {
              type: 'code',
              title: '最小化 ERC-20 实现',
              description: '一个包含所有核心功能的精简 ERC-20 实现。注意 _transfer 和 _approve 内部函数的模式——这是 OpenZeppelin 的标准架构。',
              code: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MinimalERC20 {\n    string public name;\n    string public symbol;\n    uint8 public constant decimals = 18;\n    uint256 public totalSupply;\n\n    mapping(address => uint256) private _balances;\n    mapping(address => mapping(address => uint256)) private _allowances;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {\n        name = _name;\n        symbol = _symbol;\n        _mint(msg.sender, _initialSupply * 10 ** decimals);\n    }\n\n    function balanceOf(address account) public view returns (uint256) {\n        return _balances[account];\n    }\n\n    function allowance(address owner, address spender) public view returns (uint256) {\n        return _allowances[owner][spender];\n    }\n\n    function transfer(address to, uint256 amount) public returns (bool) {\n        _transfer(msg.sender, to, amount);\n        return true;\n    }\n\n    function approve(address spender, uint256 amount) public returns (bool) {\n        _approve(msg.sender, spender, amount);\n        return true;\n    }\n\n    function transferFrom(address from, address to, uint256 amount) public returns (bool) {\n        uint256 currentAllowance = _allowances[from][msg.sender];\n        require(currentAllowance >= amount, "ERC20: insufficient allowance");\n        unchecked {\n            _approve(from, msg.sender, currentAllowance - amount);\n        }\n        _transfer(from, to, amount);\n        return true;\n    }\n\n    function _transfer(address from, address to, uint256 amount) internal {\n        require(from != address(0), "ERC20: transfer from zero address");\n        require(to != address(0), "ERC20: transfer to zero address");\n        uint256 fromBalance = _balances[from];\n        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");\n        unchecked {\n            _balances[from] = fromBalance - amount;\n            _balances[to] += amount; // 不会溢出：totalSupply 有上限\n        }\n        emit Transfer(from, to, amount);\n    }\n\n    function _approve(address owner, address spender, uint256 amount) internal {\n        _allowances[owner][spender] = amount;\n        emit Approval(owner, spender, amount);\n    }\n\n    function _mint(address account, uint256 amount) internal {\n        totalSupply += amount;\n        _balances[account] += amount;\n        emit Transfer(address(0), account, amount); // from=0 表示铸造\n    }\n}',
              language: 'solidity',
              runnable: false,
            },
            {
              type: 'quiz',
              question: '在 EVM 中，mapping(address => uint256) _balances 声明在 slot 0。_balances[0xAbCd...] 的实际存储位置如何计算？',
              options: [
                'slot = 0 + uint256(0xAbCd...)',
                'slot = keccak256(abi.encode(0xAbCd..., 0))',
                'slot = keccak256(abi.encode(0, 0xAbCd...))',
                'slot = sha256(0xAbCd...)',
              ],
              correctIndex: 1,
              explanation:
                'Solidity mapping 的存储位置 = keccak256(abi.encode(key, slotNumber))。key 在前，slot 声明位置在后。所以 _balances[addr] 的存储位置是 keccak256(abi.encode(addr, 0))。这个规则定义在 Solidity 文档的 "Layout of State Variables in Storage" 中。二维 mapping 则需要两层哈希。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你审计 ERC-20 合约安全漏洞',
              scenario: '你已经理解了 ERC-20 的存储布局和常见陷阱，现在把知识用于实战——合约安全审计。',
              prompt: '帮我分析这个 ERC-20 合约有没有安全漏洞：\n\n1. 检查是否存在 approve 竞争条件\n2. 检查 transfer/transferFrom 的返回值处理\n3. 检查是否有整数溢出风险\n4. 检查是否兼容非标准代币（USDT、fee-on-transfer）\n5. 检查铸造/销毁逻辑是否有权限控制\n\n请给出具体的代码行号和修复建议。',
              explanation: '这个 prompt 给出了明确的审计维度（5个方向），让 AI 不会遗漏关键检查点。实际工作中，你可以把自己的合约代码贴进去让 AI 逐行分析。',
            },
          ],
        },

        // --- 1.2 ERC-721：NFT 标准（深入版）---
        {
          id: 'erc721-nft',
          title: 'ERC-721：NFT 标准',
          cards: [
            {
              type: 'explain',
              title: 'ERC-721 解决了什么问题？与 ERC-20 的本质区别',
              content:
                'ERC-20 的每个代币完全等价——1 USDC 和另一个 1 USDC 没有区别。`balanceOf` 返回的是**数量**。\n\nERC-721 的每个代币都有唯一的 `tokenId`，不可互换。`balanceOf` 返回的是**你拥有几个 NFT**，但不能告诉你拥有哪些。\n\n**本质区别在数据结构**：\n- ERC-20: `mapping(address => uint256)` — 地址 → 余额数量\n- ERC-721: `mapping(uint256 => address)` — tokenId → 所有者\n\n这个反转的 mapping 方向决定了所有后续设计差异：ERC-20 关心"你有多少"，ERC-721 关心"这个 token 属于谁"。\n\n**参考**：[EIP-721 原文](https://eips.ethereum.org/EIPS/eip-721)',
              analogy: 'ERC-20 像银行账户余额（只有一个数字），ERC-721 像房产登记册（每套房有唯一编号，记录在谁名下）。',
            },
            {
              type: 'explain',
              title: 'ERC-721 存储布局：四个核心 mapping',
              content:
                'ERC-721 需要比 ERC-20 复杂得多的存储结构：\n\n```solidity\n// 核心存储（4 个 mapping）\n\n// 1. tokenId → 所有者地址\nmapping(uint256 => address) private _owners;\n\n// 2. 地址 → 拥有的 NFT 数量（用于 balanceOf 查询）\nmapping(address => uint256) private _balances;\n\n// 3. tokenId → 被授权的地址（单个 NFT 的授权）\nmapping(uint256 => address) private _tokenApprovals;\n\n// 4. 所有者 → 操作者 → 是否授权全部\nmapping(address => mapping(address => bool)) private _operatorApprovals;\n```\n\n**为什么需要 _balances？**\n\n`_owners` 只能从 tokenId 查到 owner。但 `balanceOf(address)` 需要知道一个地址有多少 NFT。如果没有 `_balances`，就得遍历所有 tokenId——Gas 炸裂。所以用一个冗余的计数器来维护。\n\n**两层授权设计**：\n- `_tokenApprovals`：精确授权——"Bob 可以转移我的 #42 号 NFT"\n- `_operatorApprovals`：全局授权——"OpenSea 可以代管我的所有 NFT"（`setApprovalForAll`）\n\n这比 ERC-20 的单层 `allowance` 更灵活，但也意味着更多的 storage 读写开销。',
            },
            {
              type: 'explain',
              title: 'safeTransferFrom 原理：为什么要检查接收方？',
              content:
                '**灾难场景**：你把一个价值 10 ETH 的 NFT 转给一个合约地址，但这个合约没有任何处理 NFT 的函数。NFT 到了那个合约里，永远拿不出来——**等于销毁了**。\n\n这在 ETH 和 ERC-20 中也存在（转给合约找不回来），但 ERC-721 通过 `safeTransferFrom` 解决了这个问题：\n\n```solidity\nfunction safeTransferFrom(address from, address to, uint256 tokenId) public {\n    // 1. 执行普通转账\n    transferFrom(from, to, tokenId);\n    \n    // 2. 如果接收方是合约，检查它是否实现了接收接口\n    if (to.code.length > 0) {\n        // 调用接收方的 onERC721Received\n        bytes4 retval = IERC721Receiver(to).onERC721Received(\n            msg.sender,  // operator（谁发起的转账）\n            from,        // 原所有者\n            tokenId,     // 哪个 NFT\n            ""           // 附加数据\n        );\n        // 检查返回值必须是函数选择器本身\n        require(\n            retval == IERC721Receiver.onERC721Received.selector,\n            // selector = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))\n            // = 0x150b7a02\n            "ERC721: transfer to non ERC721Receiver"\n        );\n    }\n}\n```\n\n**为什么返回 selector 而不是 true？**\n返回特定的 `bytes4` 值（`0x150b7a02`）比 `bool` 更安全——避免了某些合约意外返回 `true` 导致的误判。这个模式叫 "magic value check"，后来被 ERC-1155 等标准沿用。',
            },
            {
              type: 'explain',
              title: 'tokenURI 与元数据标准',
              content:
                'NFT 的价值很大程度在于它的"内容"——图片、属性等。但链上存储非常昂贵（每 32 字节 = 一个 slot = ~20,000 Gas）。所以 ERC-721 用 `tokenURI` 返回一个链接，指向链下的 JSON 元数据：\n\n```solidity\nfunction tokenURI(uint256 tokenId) public view returns (string memory) {\n    return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));\n}\n```\n\n**JSON 元数据标准格式**：\n```json\n{\n  "name": "Bored Ape #1234",\n  "description": "A unique ape from the BAYC collection",\n  "image": "ipfs://QmXxx.../1234.png",\n  "attributes": [\n    { "trait_type": "Background", "value": "Orange" },\n    { "trait_type": "Fur", "value": "Golden" },\n    { "trait_type": "Eyes", "value": "Laser" }\n  ]\n}\n```\n\n**存储方式对比**：\n\n| 方式 | 优点 | 缺点 |\n|------|------|------|\n| 中心化服务器 | 快、便宜 | 服务器挂了 NFT 就没图了 |\n| IPFS | 内容寻址、去中心化 | 需要 pin 服务保持数据可用 |\n| Arweave | 永久存储、一次付费 | 成本较高 |\n| 完全链上 | 永不消失 | 极贵，只适合小文件（SVG/ASCII） |\n\n**真实案例**：很多早期 NFT 项目用中心化服务器存图片，服务器关了 NFT 就变成了"链上有记录但看不到图"的空壳。这就是为什么社区推崇 IPFS/Arweave 存储。',
            },
            {
              type: 'explain',
              title: 'Enumerable 扩展：额外的代价',
              content:
                '标准 ERC-721 有一个大问题：**没有办法列出一个地址拥有的所有 NFT**。你只能查 `balanceOf` 知道数量，但不知道具体是哪些 tokenId。\n\nERC721Enumerable 扩展解决了这个问题，但代价是额外的存储：\n\n```solidity\n// ERC721Enumerable 新增的存储\n\n// 全局 token 列表\nuint256[] private _allTokens;\nmapping(uint256 => uint256) private _allTokensIndex; // tokenId → 在 _allTokens 中的索引\n\n// 每个所有者的 token 列表\nmapping(address => uint256[]) private _ownedTokens;\nmapping(uint256 => uint256) private _ownedTokensIndex; // tokenId → 在 _ownedTokens[owner] 中的索引\n```\n\n**新增函数**：\n- `totalSupply()` → `_allTokens.length`\n- `tokenByIndex(index)` → `_allTokens[index]`（全局第 N 个 NFT）\n- `tokenOfOwnerByIndex(owner, index)` → `_ownedTokens[owner][index]`（某人的第 N 个 NFT）\n\n**Gas 代价**：\n每次 `_mint` / `_transfer` / `_burn` 都要额外更新 4 个 mapping + 数组操作。一次转账的 Gas 从 ~80,000 增加到 ~120,000+。\n\n**实际决策**：如果你的 NFT 不需要链上枚举（比如前端通过 subgraph 查询就够了），**不要**用 Enumerable——纯粹浪费 Gas。很多新项目（如 Azuki 的 ERC-721A）选择去掉 Enumerable 以大幅降低 mint Gas。',
            },
            {
              type: 'code',
              title: '最小化 ERC-721 实现（含 safeMint）',
              description: '核心实现包含 safeMint、转账、授权逻辑。注意 _checkOnERC721Received 的 magic value 检查模式。',
              code: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";\n\ncontract MinimalERC721 {\n    string public name;\n    string public symbol;\n    string private _baseURI;\n    uint256 private _nextTokenId;\n\n    mapping(uint256 => address) private _owners;\n    mapping(address => uint256) private _balances;\n    mapping(uint256 => address) private _tokenApprovals;\n    mapping(address => mapping(address => bool)) private _operatorApprovals;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);\n    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);\n\n    constructor(string memory _name, string memory _symbol, string memory baseURI_) {\n        name = _name;\n        symbol = _symbol;\n        _baseURI = baseURI_;\n    }\n\n    function balanceOf(address owner) public view returns (uint256) {\n        require(owner != address(0), "ERC721: zero address");\n        return _balances[owner];\n    }\n\n    function ownerOf(uint256 tokenId) public view returns (address) {\n        address owner = _owners[tokenId];\n        require(owner != address(0), "ERC721: nonexistent token");\n        return owner;\n    }\n\n    function approve(address to, uint256 tokenId) public {\n        address owner = ownerOf(tokenId);\n        require(msg.sender == owner || _operatorApprovals[owner][msg.sender],\n            "ERC721: not authorized");\n        _tokenApprovals[tokenId] = to;\n        emit Approval(owner, to, tokenId);\n    }\n\n    function setApprovalForAll(address operator, bool approved) public {\n        _operatorApprovals[msg.sender][operator] = approved;\n        emit ApprovalForAll(msg.sender, operator, approved);\n    }\n\n    function transferFrom(address from, address to, uint256 tokenId) public {\n        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: not authorized");\n        _transfer(from, to, tokenId);\n    }\n\n    function safeTransferFrom(address from, address to, uint256 tokenId) public {\n        transferFrom(from, to, tokenId);\n        require(_checkOnERC721Received(from, to, tokenId, ""),\n            "ERC721: transfer to non ERC721Receiver");\n    }\n\n    // safeMint：铸造 + 检查接收方\n    function safeMint(address to) public returns (uint256) {\n        uint256 tokenId = _nextTokenId++;\n        _balances[to] += 1;\n        _owners[tokenId] = to;\n        emit Transfer(address(0), to, tokenId);\n\n        require(_checkOnERC721Received(address(0), to, tokenId, ""),\n            "ERC721: transfer to non ERC721Receiver");\n        return tokenId;\n    }\n\n    function _transfer(address from, address to, uint256 tokenId) internal {\n        require(ownerOf(tokenId) == from, "ERC721: wrong owner");\n        require(to != address(0), "ERC721: transfer to zero address");\n        delete _tokenApprovals[tokenId]; // 转账后清除授权\n        _balances[from] -= 1;\n        _balances[to] += 1;\n        _owners[tokenId] = to;\n        emit Transfer(from, to, tokenId);\n    }\n\n    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {\n        address owner = ownerOf(tokenId);\n        return (spender == owner\n            || _tokenApprovals[tokenId] == spender\n            || _operatorApprovals[owner][spender]);\n    }\n\n    function _checkOnERC721Received(\n        address from, address to, uint256 tokenId, bytes memory data\n    ) private returns (bool) {\n        if (to.code.length == 0) return true; // EOA 直接通过\n        bytes4 retval = IERC721Receiver(to).onERC721Received(\n            msg.sender, from, tokenId, data\n        );\n        return retval == IERC721Receiver.onERC721Received.selector; // 0x150b7a02\n    }\n}',
              language: 'solidity',
              runnable: false,
            },
            {
              type: 'quiz',
              question: '为什么 ERC-721 需要 safeTransferFrom 而不是只用 transferFrom？',
              options: [
                '为了让转账速度更快',
                '因为 transferFrom 不触发 Transfer 事件',
                '为了防止 NFT 被转入无法处理 NFT 的合约中永久锁死',
                '因为 transferFrom 不检查余额',
              ],
              correctIndex: 2,
              explanation:
                '如果接收方是一个没有实现 onERC721Received 的合约，NFT 转进去后就再也拿不出来了——等于永久销毁。safeTransferFrom 在转账后检查接收方合约是否返回了 magic value 0x150b7a02，如果没有就 revert 整个交易。transferFrom 不做这个检查，所以在转给合约地址时有资产丢失风险。',
            },
            {
              type: 'quiz',
              question: '关于 ERC721Enumerable 扩展，以下哪个说法是正确的？',
              options: [
                '所有 ERC-721 合约都必须实现 Enumerable',
                'Enumerable 不增加任何 Gas 消耗',
                'Enumerable 通过额外的存储结构实现链上枚举，会显著增加 mint/transfer 的 Gas',
                'Enumerable 只增加查询函数，不影响写入操作',
              ],
              correctIndex: 2,
              explanation:
                'ERC721Enumerable 是可选扩展，不是必须。它通过维护额外的数组和 mapping（_allTokens、_ownedTokens 等）来支持 tokenByIndex 和 tokenOfOwnerByIndex。每次 mint/transfer/burn 都要更新这些额外结构，Gas 显著增加。如果不需要链上枚举（大多数场景可以用 subgraph 或 indexer），应避免使用。',
            },
          ],
        },

        // --- 1.3 ERC-1155：多代币标准（深入版）---
        {
          id: 'erc1155-multi-token',
          title: 'ERC-1155：多代币标准',
          cards: [
            {
              type: 'explain',
              title: 'ERC-1155 解决了什么问题？Gas 节省的真实数据',
              content:
                '想象一个链游需要：金币（同质化）、钻石（同质化）、传奇之剑（NFT）、史诗盾牌（NFT）。\n\n**传统方式的代价**：\n- 4 种代币 = 4 个合约 = 4 次 `CREATE` 操作\n- 每个 ERC-20 部署 ~1,200,000 Gas，每个 ERC-721 部署 ~2,000,000 Gas\n- 100 种道具 = 部署费可能超过 1 ETH\n\n**ERC-1155 的方案**：\n- 1 个合约管理所有代币类型\n- 部署一次 ~2,500,000 Gas（比两个 ERC-721 还便宜）\n- 每种代币用 `uint256 id` 区分：id=1 是金币，id=2 是钻石，id=1000 是传奇之剑\n- 同质化 vs 非同质化？看 supply：supply > 1 就是同质化（金币），supply = 1 就是 NFT\n\n**批量操作的 Gas 节省**：\n- 逐个转 10 种代币：10 次 `safeTransferFrom` = ~650,000 Gas\n- 一次 `safeBatchTransferFrom`：~150,000 Gas（节省约 77%）\n- 原因：共享一个交易的基础开销（21,000 Gas）+ 批量 SSTORE 优化\n\n**参考**：[EIP-1155 原文](https://eips.ethereum.org/EIPS/eip-1155)',
            },
            {
              type: 'explain',
              title: 'ERC-1155 存储布局：一个 mapping 统一所有代币',
              content:
                'ERC-1155 的核心存储比你想象的简洁：\n\n```solidity\n// 二维 mapping: tokenId → 地址 → 余额\n// 一个 mapping 管理所有代币类型的所有余额！\nmapping(uint256 => mapping(address => uint256)) private _balances;\n\n// 操作者授权（和 ERC-721 类似，但没有单 token 授权）\nmapping(address => mapping(address => bool)) private _operatorApprovals;\n\n// URI 模板\nstring private _uri;\n```\n\n**对比三种标准的存储**：\n\n| 标准 | 核心 mapping | 维度 |\n|------|-------------|------|\n| ERC-20 | `address → uint256` | 1D（一种代币的余额）|\n| ERC-721 | `uint256 → address` | 1D（一个 NFT 的所有者）|\n| ERC-1155 | `uint256 → address → uint256` | 2D（任意代币 × 任意地址 → 余额）|\n\n**ERC-1155 的存储槽计算**：\n```\n// _balances[tokenId][account] 的存储位置：\nintermediate = keccak256(abi.encode(tokenId, slot_of_balances))\nfinal_slot = keccak256(abi.encode(account, intermediate))\n```\n\n注意 ERC-1155 **没有**单 token 授权（不像 ERC-721 的 `_tokenApprovals`），只有 `setApprovalForAll`。这是故意简化的设计——减少存储操作，降低 Gas。',
            },
            {
              type: 'explain',
              title: '批量操作深入：calldata 编码与 Gas 分析',
              content:
                '`safeBatchTransferFrom` 为什么这么省 Gas？从 EVM 底层分析：\n\n```solidity\nfunction safeBatchTransferFrom(\n    address from,\n    address to,\n    uint256[] calldata ids,      // 代币 ID 数组\n    uint256[] calldata amounts,  // 对应数量数组\n    bytes calldata data\n) external;\n```\n\n**Gas 节省来源**：\n\n1. **交易基础开销只付一次**：每笔交易固定 21,000 Gas。10 次单独转账 = 210,000 Gas 基础开销；1 次批量 = 21,000 Gas。\n\n2. **Calldata 更紧凑**：10 次单独调用，每次都要编码 `from`, `to`, `id`, `amount`（重复的 from/to）。批量操作中 from/to 只编码一次。\n\n3. **Storage 访问优化**：EVM 中同一交易内二次访问同一 slot 只需 100 Gas（warm access），首次需要 2100 Gas（cold access）。批量操作中，`_operatorApprovals[from][msg.sender]` 只做一次 cold read。\n\n4. **循环内 SSTORE 合并**：\n```solidity\n// 批量转账的内部实现\nfor (uint256 i = 0; i < ids.length; ++i) {\n    uint256 id = ids[i];\n    uint256 amount = amounts[i];\n    _balances[id][from] -= amount;  // SSTORE\n    _balances[id][to] += amount;    // SSTORE\n}\n// 只触发一次 TransferBatch 事件（而不是 N 次 TransferSingle）\nemit TransferBatch(msg.sender, from, to, ids, amounts);\n```\n\n**实际数据**（来自 OpenSea 链上统计）：\n- 单次 `safeTransferFrom`：~52,000 Gas\n- 10 次单独调用：~520,000 Gas\n- 1 次 `safeBatchTransferFrom`（10种）：~130,000 Gas\n- **节省率：~75%**',
            },
            {
              type: 'explain',
              title: 'URI 方案：{id} 占位符与元数据服务器',
              content:
                'ERC-721 的 `tokenURI(uint256)` 为每个 token 返回不同的 URI。但 ERC-1155 可能有数百万种代币，不可能为每个都存一个 URI 字符串。\n\n**ERC-1155 的方案**：一个 URI 模板 + `{id}` 占位符：\n\n```solidity\n// 合约存储的 URI 模板\nstring private _uri = "https://game.example/api/item/{id}.json";\n\n// 所有 token 返回同一个模板\nfunction uri(uint256 /* id */) public view returns (string memory) {\n    return _uri;\n}\n```\n\n**客户端替换规则**（EIP-1155 规范定义）：\n\n`{id}` 必须替换为 **64 位十六进制小写字符串**（不带 0x 前缀，左侧补零）：\n\n```\ntoken id = 1\n→ 替换后 URI: https://game.example/api/item/0000000000000000000000000000000000000000000000000000000000000001.json\n\ntoken id = 314592 (0x4CCE0)\n→ 替换后 URI: https://game.example/api/item/000000000000000000000000000000000000000000000000000000000004cce0.json\n```\n\n**为什么这样设计？**\n- 一个元数据服务器服务所有 token 类型\n- 服务器从 URL 解析出 token id，动态返回对应的 JSON\n- 合约只存一个字符串，极度节省 storage\n\n**对比**：ERC-721 存一个 baseURI + 每次拼接 tokenId，需要链上字符串操作。ERC-1155 把拼接交给客户端，Gas 为零。',
            },
            {
              type: 'explain',
              title: 'ERC-1155 vs 部署多个 ERC-20/721：完整对比',
              content:
                '**什么时候用 ERC-1155，什么时候不用？**\n\n| 维度 | 多个 ERC-20/721 | 单个 ERC-1155 |\n|------|-----------------|---------------|\n| 部署成本 | N 个合约 × 1-2M Gas | 1 个合约 × ~2.5M Gas |\n| 每次转账 Gas | ~65K (ERC-20) | ~52K (单个) |\n| 批量转账 | N 次单独调用 | 1 次 batch 调用，省 ~75% |\n| 生态兼容性 | 所有 DeFi 原生支持 | 需要适配（Uniswap 不原生支持） |\n| 授权粒度 | ERC-20: 精确金额; ERC-721: 单个/全部 | 只有 setApprovalForAll |\n| DeFi 组合性 | 每个代币有独立地址，可直接用于 AMM/借贷 | 需要 wrapper 合约转换 |\n| 适用场景 | 独立的金融资产 | 游戏道具、NFT 合集、SFT |\n\n**关键决策点**：\n\n1. **如果你的代币需要上 DEX/借贷协议** → 用 ERC-20。DeFi 协议几乎都只支持 ERC-20。\n2. **如果你做 NFT PFP 项目** → 用 ERC-721。OpenSea 等市场对 721 的支持最完善。\n3. **如果你做链游/大量道具** → 用 ERC-1155。省 Gas、批量操作、一个合约管理一切。\n4. **如果你做 SFT（半同质化代币）** → ERC-1155 天然支持。比如演唱会门票：同一场次的票是同质化的，不同场次是不同 id。\n\n**实际案例**：Enjin（链游平台）是 ERC-1155 的提出者，他们的整个生态（数百种游戏道具）只用一个合约管理。',
            },
            {
              type: 'quiz',
              question: '关于 ERC-1155 的存储布局，以下哪个描述是正确的？',
              options: [
                '和 ERC-20 一样，每种代币用单独的 mapping(address => uint256) 存储',
                '和 ERC-721 一样，用 mapping(uint256 => address) 存储所有者',
                '用 mapping(uint256 => mapping(address => uint256)) 一个二维 mapping 存储所有代币类型的余额',
                '用数组存储所有代币余额',
              ],
              correctIndex: 2,
              explanation:
                'ERC-1155 的核心创新就是这个二维 mapping：第一维是 tokenId（代币类型），第二维是地址，值是余额。一个 mapping 统一管理所有代币类型——无论是同质化（金币，supply=1000000）还是非同质化（NFT，supply=1）。这比为每种代币部署独立合约高效得多。',
            },
            {
              type: 'quiz',
              question: 'ERC-1155 的 safeBatchTransferFrom 比逐个调用 safeTransferFrom 省 Gas 的最主要原因是什么？',
              options: [
                '批量操作使用了更高效的加密算法',
                '批量操作跳过了安全检查',
                '交易基础开销只付一次 + storage warm access 优化 + 单次事件触发',
                '批量操作不写入 storage',
              ],
              correctIndex: 2,
              explanation:
                'Gas 节省来自多个层面：(1) 21,000 Gas 的交易基础开销只付一次而不是 N 次；(2) EVM 中同一交易内的 storage warm access 只需 100 Gas vs cold access 的 2100 Gas——比如授权检查只做一次 cold read；(3) 只触发一次 TransferBatch 事件而不是 N 次 TransferSingle 事件（日志写入也消耗 Gas）。批量操作并不跳过安全检查——仍然会调用 onERC1155BatchReceived。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第二章：签名与授权
    // =============================================
    {
      id: 'ch2-signature-authorization',
      title: '第二章：签名与授权',
      lessons: [
        // --- 2.1 EIP-712：类型化结构数据签名 ---
        {
          id: 'eip712-typed-data',
          title: 'EIP-712：类型化结构数据签名',
          cards: [
            {
              type: 'explain',
              title: '问题：签名原始十六进制数据是危险的',
              content:
                '在 EIP-712 之前，DApp 使用 `eth_sign` 或 `personal_sign` 请求用户签名。MetaMask 弹窗显示的是一串十六进制乱码：\n\n`签名请求: 0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8`\n\n用户根本无法判断这串数据的含义——它可能是"同意发表评论"，也可能是一笔将所有资产转给攻击者的交易哈希。\n\n**`eth_sign` 的致命缺陷**：它直接对任意 32 字节数据签名。攻击者可以构造一个合法的以太坊交易哈希让你签名，然后广播这笔交易。这不是假设——2022 年多起钓鱼攻击就利用了这个漏洞。MetaMask 后来默认禁用了 `eth_sign`。\n\nEIP-712 从根本上解决这个问题：定义一种**结构化的、人类可读的**签名格式。\n\n**参考**：[EIP-712 原文](https://eips.ethereum.org/EIPS/eip-712)',
              analogy: '就像银行转账时，以前只给你看一串二进制让你确认；EIP-712 之后，会明确显示"你正在转 100 USDC 给 0xABC...，有效期到 2024-12-31"。',
            },
            {
              type: 'explain',
              title: '编码方案：签名摘要的完整公式',
              content:
                'EIP-712 定义了签名摘要（digest）的精确计算公式：\n\n```\ndigest = keccak256("\\x19\\x01" || domainSeparator || hashStruct(message))\n```\n\n三个部分：\n\n**1. 前缀 `\\x19\\x01`（2 字节）**\n`\\x19` 是 EIP-191 规定的签名数据前缀，确保签名数据不会被误解为合法的 RLP 编码交易（RLP 编码的交易字节 `[0xc0, 0xfe]` 不会以 `\\x19` 开头）。`\\x01` 表示"EIP-712 结构化数据"版本号。\n\n**2. `domainSeparator`（32 字节）**\n标识签名的上下文——哪条链、哪个合约。\n\n**3. `hashStruct(message)`（32 字节）**\n消息内容的结构化哈希。\n\n最终 digest 是 66 字节输入的 keccak256 哈希，产生 32 字节输出。用户用私钥对这个 digest 签名，生成 `(v, r, s)`。',
            },
            {
              type: 'explain',
              title: 'Domain Separator 的构造',
              content:
                'Domain Separator 将签名绑定到特定的应用上下文，防止跨链和跨合约重放：\n\n```solidity\nbytes32 DOMAIN_SEPARATOR = keccak256(abi.encode(\n    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),\n    keccak256(bytes("Uniswap V3")),   // name\n    keccak256(bytes("1")),             // version\n    1,                                  // chainId (以太坊主网)\n    0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45  // verifyingContract\n));\n```\n\n**每个字段的防御作用**：\n- `name` + `version`：防止同一合约不同版本之间的签名混用\n- `chainId`：防止以太坊主网的签名在 Polygon / Arbitrum 等链上被重放\n- `verifyingContract`：防止签名在不同合约之间被重放\n\n**关键细节**：Domain Separator 通常在合约部署时计算一次并缓存（`immutable`），但如果发生链分叉（chainId 改变），需要重新计算。OpenZeppelin 的实现在 `_domainSeparatorV4()` 中处理了这个边界情况。',
            },
            {
              type: 'explain',
              title: 'Type Hash：类型的确定性编码',
              content:
                '类型哈希将数据结构的"模式"（schema）编码为一个确定性的 32 字节标识符：\n\n```solidity\nbytes32 PERMIT_TYPEHASH = keccak256(\n    "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"\n);\n```\n\n**编码规则**：\n1. 类型名紧接左括号，字段之间用逗号分隔，**没有空格**\n2. 字段格式：`类型 名称`\n3. 如果字段本身是结构体，递归展开（先主类型，然后按字母序列出引用的子类型）\n\n**嵌套结构体示例**：\n```\nMail(Person from,Person to,string contents)\nPerson(string name,address wallet)\n```\n编码为：`"Mail(Person from,Person to,string contents)Person(string name,address wallet)"`\n\n注意 `Person` 的定义附在后面，因为它按字母序排列。\n\n**为什么需要 typeHash？** 它确保不同结构的数据不会产生相同的哈希——即使它们的字段值碰巧相同。',
            },
            {
              type: 'explain',
              title: 'hashStruct：字段值的编码',
              content:
                '`hashStruct` 将具体的值编码为哈希：\n\n```\nhashStruct(s) = keccak256(typeHash || encodeData(s))\n```\n\n`encodeData` 的规则（每个字段编码为 32 字节后拼接）：\n\n| 字段类型 | 编码方式 |\n|---------|--------|\n| `address` | 左补零到 32 字节（与 `abi.encode` 相同）|\n| `uint256` | 直接 32 字节 |\n| `bool` | 0 或 1，32 字节 |\n| `bytes32` | 直接 32 字节 |\n| `string` | `keccak256(bytes(value))` |\n| `bytes` | `keccak256(value)` |\n| 结构体 | 递归 `hashStruct(value)` |\n| 数组 `T[]` | `keccak256(encodeData(item1) || encodeData(item2) || ...)` |\n\n**Permit 的具体示例**：\n```solidity\nbytes32 structHash = keccak256(abi.encode(\n    PERMIT_TYPEHASH,\n    owner,      // address -> 32 bytes\n    spender,    // address -> 32 bytes\n    value,      // uint256 -> 32 bytes\n    nonce,      // uint256 -> 32 bytes\n    deadline    // uint256 -> 32 bytes\n));\n```\n\n总输入 = 32 (typeHash) + 5 * 32 (字段) = 192 字节。',
            },
            {
              type: 'code',
              title: '完整签名验证流程：Solidity 实现',
              description: '展示合约端如何用 EIP-712 + ecrecover 验证签名者身份。这是 permit() 函数内部的核心逻辑。',
              language: 'solidity',
              code: '// SPDX-License-Identifier: MIT\n// 简化的 EIP-712 验证流程\n\nbytes32 constant PERMIT_TYPEHASH = keccak256(\n    "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"\n);\n\n// 第一步：计算 structHash\nbytes32 structHash = keccak256(abi.encode(\n    PERMIT_TYPEHASH,\n    owner,\n    spender,\n    value,\n    _nonces[owner]++,  // 使用后自增，防重放\n    deadline\n));\n\n// 第二步：计算最终 digest\nbytes32 digest = keccak256(abi.encodePacked(\n    "\\x19\\x01",\n    DOMAIN_SEPARATOR,\n    structHash\n));\n\n// 第三步：ecrecover 恢复签名者地址\naddress recoveredAddress = ecrecover(digest, v, r, s);\n\n// 第四步：验证\nrequire(recoveredAddress != address(0), "Invalid signature");\nrequire(recoveredAddress == owner, "Signer is not owner");\nrequire(block.timestamp <= deadline, "Permit expired");\n\n// 验证通过，执行授权\n_allowances[owner][spender] = value;',
            },
            {
              type: 'explain',
              title: 'MetaMask 集成：用户实际看到什么',
              content:
                '当 DApp 调用 `eth_signTypedData_v4` 时，MetaMask 会解析 EIP-712 结构并展示可读内容。\n\n**用户看到的（MetaMask 弹窗）**：\n```\n签名请求\n\nUniswap V3 请求你签署以下内容：\n\nPermit\n  Owner:   0xYourAddress...\n  Spender: 0xUniswapRouter...\n  Value:   1000000 (100 USDC)\n  Nonce:   0\n  Deadline: 1735689600 (2025-01-01)\n```\n\n**对比：没有 EIP-712 时用户看到的**：\n```\n签名请求: 0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385\n```\n\n巨大的差异！用户现在可以清楚地看到：\n1. 是哪个应用在请求（Uniswap V3）\n2. 在做什么操作（Permit 授权）\n3. 授权给谁（0xUniswapRouter）\n4. 授权多少（100 USDC）\n5. 有效期到什么时候\n\n**注意**：`eth_signTypedData_v4` 中的 `v4` 是 MetaMask 的版本号，不是 EIP 版本。V1-V3 有各种兼容性问题，V4 是目前的标准实现。',
            },
            {
              type: 'quiz',
              question: '什么机制防止同一个 EIP-712 签名在不同链上被重放？',
              options: [
                'typeHash 包含了链信息',
                'Domain Separator 中的 chainId 字段',
                'ecrecover 函数自动检查链 ID',
                '\\x19\\x01 前缀中编码了链 ID',
              ],
              correctIndex: 1,
              explanation:
                'Domain Separator 在计算时包含了 chainId。当攻击者试图在另一条链（不同 chainId）上重放签名时，该链上合约计算出的 Domain Separator 会不同，导致 ecrecover 恢复出错误的地址，验证失败。这就是 EIP-712 的跨链重放防护。',
            },
            {
              type: 'think-first',
              question: '如果 domainSeparator 不包含 chainId，会发生什么？',
              hints: '以太坊主网和 Polygon 上可能部署着相同地址的合约……',
              reveal: '如果不包含 chainId，攻击者可以进行跨链重放攻击。具体场景：Uniswap 在以太坊主网和 Polygon 上都部署了合约，甚至可能是相同的地址（CREATE2 部署）。你在以太坊主网签了一个 Permit 授权 100 USDC。如果 domainSeparator 不含 chainId，攻击者可以把这个签名拿到 Polygon 上的同一个合约地址提交——签名验证会通过，你在 Polygon 上的 USDC 也被授权了。chainId 确保签名只在特定链上有效。这在 2016 年 ETH/ETC 分叉后尤为重要。',
            },
          ],
        },

        // --- 2.2 EIP-2612：Permit（免 Gas 授权）---
        {
          id: 'eip2612-permit',
          title: 'EIP-2612：Permit（免 Gas 授权）',
          cards: [
            {
              type: 'explain',
              title: '问题：approve 需要一笔独立交易',
              content:
                'ERC-20 的授权流程要求用户发送一笔链上 `approve` 交易。这带来三个问题：\n\n**1. Gas 开销**\napprove 交易消耗约 46,000 gas。在 Gas 价格 30 Gwei 时约 $2-5，高峰期可达 $20+。\n\n**2. 用户体验断裂**\n用户想在 Uniswap 兑换代币，却被告知"请先发送一笔授权交易，等待确认后再回来操作"。两步流程让新用户困惑，流失率极高。\n\n**3. 无法实现 Gasless 体验**\n新用户没有 ETH 付 Gas，连 approve 都发不了。形成死锁：想用代币 -> 需要 approve -> 需要 ETH 付 Gas -> 没有 ETH。\n\nEIP-2612 的核心洞察：**授权是一种"意愿表达"，不一定非要用链上交易来表达。用户可以用离线签名表达授权意愿，让别人代为提交到链上。**\n\n**参考**：[EIP-2612 原文](https://eips.ethereum.org/EIPS/eip-2612)',
            },
            {
              type: 'explain',
              title: 'Permit 的内部机制：从签名到授权',
              content:
                'permit 函数的核心逻辑分四步：\n\n```solidity\nfunction permit(\n    address owner,\n    address spender,\n    uint256 value,\n    uint256 deadline,\n    uint8 v, bytes32 r, bytes32 s\n) external {\n    // 1. 检查有效期\n    require(block.timestamp <= deadline, "ERC2612: expired deadline");\n    \n    // 2. 构造 EIP-712 digest\n    bytes32 structHash = keccak256(abi.encode(\n        PERMIT_TYPEHASH,\n        owner, spender, value,\n        _nonces[owner]++,   // 使用并自增\n        deadline\n    ));\n    bytes32 digest = keccak256(abi.encodePacked(\n        "\\x19\\x01", DOMAIN_SEPARATOR, structHash\n    ));\n    \n    // 3. 恢复签名者\n    address recoveredAddress = ecrecover(digest, v, r, s);\n    require(recoveredAddress != address(0) \n            && recoveredAddress == owner, "Invalid signature");\n    \n    // 4. 执行授权 -- 和普通 approve 效果完全一样\n    _allowances[owner][spender] = value;\n    emit Approval(owner, spender, value);\n}\n```\n\n**关键点**：permit 函数可以被**任何人**调用，不仅是 owner。这意味着 DApp 后端或中继器可以代替用户提交这笔交易。',
            },
            {
              type: 'explain',
              title: 'Nonce 管理：防止签名重放',
              content:
                '每个 owner 地址维护一个单调递增的 nonce：\n\n```solidity\nmapping(address => uint256) public nonces;\n```\n\n**工作流程**：\n1. 用户查询当前 nonce（假设为 5）\n2. 用户签名时包含 nonce=5\n3. 合约验证签名时使用 `_nonces[owner]++`（读取 5 并自增为 6）\n4. 如果攻击者试图重放相同签名，nonce 不匹配（合约期望 6，签名中是 5），验证失败\n\n**与交易 nonce 的区别**：\n- 交易 nonce：由协议层管理，每发一笔交易自增\n- Permit nonce：由 ERC-20 合约自身管理，每次 permit 调用自增\n- 两者是完全独立的计数器\n\n**设计权衡**：EIP-2612 使用顺序 nonce（必须按序使用），这意味着如果你签了 nonce=5 的签名但没提交，nonce=6 的签名也无法使用——必须先提交或放弃 nonce=5。Permit2 后来改用了基于位图的非顺序 nonce 来解决这个限制。',
            },
            {
              type: 'explain',
              title: 'Deadline：签名的有效窗口',
              content:
                '`deadline` 是 Unix 时间戳，签名仅在 `block.timestamp <= deadline` 时有效。\n\n**为什么必须有 deadline？**\n\n假设没有 deadline：你在 2024 年 1 月签了一个"授权 Uniswap 使用 1000 USDC"的 permit。三个月后你已经忘了这件事。但这个签名仍然有效——任何持有这个签名的人（可能通过网络截获、日志泄露等）都可以在任意时刻提交它。\n\n**最佳实践**：\n- 即时操作：设置 deadline 为当前时间 + 30 分钟\n- Uniswap 前端默认：当前时间 + 30 分钟\n- 永远不要设置 `type(uint256).max` 作为 deadline（某些教程这样写，很危险）\n\n**注意**：deadline 只防止过期使用，不防止提前使用。签名一旦生成就可以立即被任何人提交。所以签名的保密性也很重要——不要把签名发到公共通道。',
            },
            {
              type: 'explain',
              title: 'Uniswap Permit2：通用 Permit 方案',
              content:
                'EIP-2612 的局限：只有在合约代码中实现了 `permit()` 的 ERC-20 代币才能使用。USDT、WBTC 等大量已部署的代币没有这个函数。\n\n**Permit2 的架构**：\n```\n用户 -> approve(Permit2, MAX) -> ERC-20 代币合约\n                                     |\n用户 -> 签名授权 -> Permit2 合约 -> transferFrom -> ERC-20 代币合约\n                    |\n               DApp 合约\n```\n\n**核心思路**：\n1. 用户对 Permit2 合约做一次普通 approve（传统方式，只需一次）\n2. 之后所有 DApp 的授权都通过对 Permit2 签名完成\n3. Permit2 合约代替用户调用 ERC-20 的 transferFrom\n\n**Permit2 的改进**：\n- 支持**任何** ERC-20（不需要代币本身实现 permit）\n- **SignatureTransfer**：一次性签名转账\n- **AllowanceTransfer**：可复用的签名授权（带额度和过期时间）\n- **批量操作**：一个签名授权多种代币\n- **非顺序 nonce**：使用位图，允许签名乱序使用\n\n**参考**：[Permit2 文档](https://docs.uniswap.org/contracts/permit2/overview)',
            },
            {
              type: 'code',
              title: 'permit() 实现骨架',
              description: '一个完整的 EIP-2612 permit 实现，展示所有关键组件如何协作。',
              language: 'solidity',
              code: '// SPDX-License-Identifier: MIT\nabstract contract ERC20Permit is ERC20 {\n    bytes32 public constant PERMIT_TYPEHASH = keccak256(\n        "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"\n    );\n    bytes32 public immutable DOMAIN_SEPARATOR;\n    mapping(address => uint256) public nonces;\n\n    constructor(string memory name) {\n        DOMAIN_SEPARATOR = keccak256(abi.encode(\n            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),\n            keccak256(bytes(name)),\n            keccak256(bytes("1")),\n            block.chainid,\n            address(this)\n        ));\n    }\n\n    function permit(\n        address owner, address spender, uint256 value,\n        uint256 deadline, uint8 v, bytes32 r, bytes32 s\n    ) external {\n        require(block.timestamp <= deadline, "Permit: expired");\n        bytes32 digest = keccak256(abi.encodePacked(\n            "\\x19\\x01",\n            DOMAIN_SEPARATOR,\n            keccak256(abi.encode(\n                PERMIT_TYPEHASH, owner, spender, value,\n                nonces[owner]++, deadline\n            ))\n        ));\n        address signer = ecrecover(digest, v, r, s);\n        require(signer != address(0) && signer == owner, "Permit: invalid");\n        _approve(owner, spender, value);\n    }\n}',
            },
            {
              type: 'quiz',
              question: '什么机制防止一个 permit 签名被使用两次？',
              options: [
                'deadline 过期后签名自动失效',
                'ecrecover 会拒绝已使用过的签名',
                '合约维护的 nonce 在每次 permit 调用后自增，使旧签名的 nonce 不再匹配',
                'Domain Separator 在每次调用后会改变',
              ],
              correctIndex: 2,
              explanation:
                '每次 permit() 被调用时，合约读取当前 nonce 并将其自增（`nonces[owner]++`）。如果攻击者重放相同的签名，合约期望的 nonce 已经变了（比如从 5 变成 6），而签名中的 nonce 仍然是 5，digest 不同，ecrecover 恢复出错误的地址，验证失败。',
            },
            {
              type: 'fill-blank',
              title: 'permit 函数签名填空',
              description: '补全 EIP-2612 permit 函数的关键参数。',
              template: 'function permit(\n    address ___BLANK___,   // 代币拥有者\n    address ___BLANK___,   // 被授权方\n    uint256 value,\n    uint256 ___BLANK___,   // 签名过期时间\n    uint8 v, bytes32 r, bytes32 s  // ECDSA 签名\n) external;',
              blanks: ['owner', 'spender', 'deadline'],
              language: 'solidity',
              hints: ['代币的所有者', '可以使用代币的地址', '签名的有效期限'],
            },
          ],
        },

        // --- 2.3 EIP-165：接口检测标准 ---
        {
          id: 'eip165-interface-detection',
          title: 'EIP-165：接口检测标准',
          cards: [
            {
              type: 'explain',
              title: '问题：合约无法知道另一个合约支持哪些接口',
              content:
                '以太坊上的合约只是字节码——没有"类型系统"可以查询。合约 A 调用合约 B 的某个函数，如果 B 没有这个函数，调用会 revert。但在 revert 之前你已经花了 Gas。\n\n**更严重的问题是资产丢失：**\n\n你把一个 ERC-721 NFT 通过 `transferFrom`（不是 safe 版本）转给一个合约地址。这个合约可能是一个多签钱包、一个 ERC-20 金库、甚至一个自毁的合约。它没有任何处理 NFT 的函数——**NFT 被永久锁死，无法取回。**\n\n据统计，仅因误转到不兼容合约而锁死的 NFT 价值数百万美元。\n\nEIP-165 提供了一种标准化的"能力协商"机制：在交互之前，先问对方"你支持这个接口吗？"\n\n**参考**：[EIP-165 原文](https://eips.ethereum.org/EIPS/eip-165)',
              analogy: '就像 USB 设备连接时的"握手"协议——设备先告诉电脑"我是键盘/打印机/存储设备"，电脑再加载对应的驱动。不会把打印数据发给键盘。',
            },
            {
              type: 'explain',
              title: 'Interface ID 的计算方式',
              content:
                '接口 ID 是接口中所有函数选择器的 XOR 值。函数选择器 = 函数签名的 keccak256 哈希的前 4 字节。\n\n**ERC-721 的具体计算**：\n```solidity\nbytes4 constant ERC721_INTERFACE_ID = \n    bytes4(keccak256("balanceOf(address)"))        // 0x70a08231\n  ^ bytes4(keccak256("ownerOf(uint256)"))          // 0x6352211e\n  ^ bytes4(keccak256("safeTransferFrom(address,address,uint256,bytes)"))  // 0xb88d4fde\n  ^ bytes4(keccak256("safeTransferFrom(address,address,uint256)"))        // 0x42842e0e\n  ^ bytes4(keccak256("transferFrom(address,address,uint256)"))            // 0x23b872dd\n  ^ bytes4(keccak256("approve(address,uint256)"))  // 0x095ea7b3\n  ^ bytes4(keccak256("setApprovalForAll(address,bool)"))  // 0xa22cb465\n  ^ bytes4(keccak256("getApproved(uint256)"))      // 0x081812fc\n  ^ bytes4(keccak256("isApprovedForAll(address,address)"))  // 0xe985e9c5\n  = 0x80ac58cd  // 最终的 ERC-721 接口 ID\n```\n\n**为什么用 XOR？**\n- XOR 是最简单的"混合"操作，满足交换律和结合律\n- 计算成本极低（单个 EVM opcode）\n- 碰撞概率低（4 字节 = 2^32 种可能，约 43 亿）\n\n**EIP-165 自身的接口 ID**：\n`bytes4(keccak256("supportsInterface(bytes4)"))` = `0x01ffc9a7`',
            },
            {
              type: 'explain',
              title: '实现方式与 Gas 约束',
              content:
                'EIP-165 要求 `supportsInterface` 调用必须使用**不超过 30,000 gas**。这个限制很重要——它防止恶意合约在查询时执行昂贵的计算来浪费调用者的 Gas。\n\n**典型实现方式**：\n\n```solidity\n// 方式一：硬编码检查（最省 Gas，约 500 gas）\nfunction supportsInterface(bytes4 interfaceId) public pure returns (bool) {\n    return interfaceId == 0x80ac58cd  // ERC-721\n        || interfaceId == 0x5b5e139f  // ERC-721 Metadata\n        || interfaceId == 0x01ffc9a7; // ERC-165 itself\n}\n\n// 方式二：映射查询（更灵活，约 2,600 gas）\nmapping(bytes4 => bool) private _supportedInterfaces;\nfunction supportsInterface(bytes4 interfaceId) public view returns (bool) {\n    return _supportedInterfaces[interfaceId];\n}\n```\n\n**EIP-165 的两个特殊规定**：\n1. `supportsInterface(0x01ffc9a7)` **必须返回 true**（声明自己支持 EIP-165）\n2. `supportsInterface(0xffffffff)` **必须返回 false**（用于检测合约是否正确实现了 EIP-165，而不是对所有输入都返回 true）',
            },
            {
              type: 'explain',
              title: '在 safeTransferFrom 中的实际应用',
              content:
                'ERC-721 的 `safeTransferFrom` 在转账后检查接收方：\n\n```solidity\nfunction _checkOnERC721Received(\n    address from, address to, uint256 tokenId, bytes memory data\n) private returns (bool) {\n    if (to.code.length > 0) {  // 只检查合约地址，不检查 EOA\n        try IERC721Receiver(to).onERC721Received(\n            msg.sender, from, tokenId, data\n        ) returns (bytes4 retval) {\n            return retval == IERC721Receiver.onERC721Received.selector;\n            // 返回值必须是 0x150b7a02\n        } catch {\n            return false;  // 调用失败或返回值不对\n        }\n    }\n    return true;  // EOA 直接通过\n}\n```\n\n**注意**：实际上 `safeTransferFrom` 检查的是 `onERC721Received` 的返回值，而不是直接调用 `supportsInterface`。但 EIP-165 的思想贯穿其中——通过返回特定的 4 字节选择器来证明"我知道如何处理这种数据"。\n\n**其他使用 EIP-165 的场景**：\n- ERC-2981（NFT 版税）：市场合约检查 NFT 是否支持版税接口\n- ERC-1155：`safeBatchTransferFrom` 检查接收方\n- Diamond Standard（EIP-2535）：查询代理合约支持的接口',
            },
            {
              type: 'quiz',
              question: 'ERC-721 的接口 ID `0x80ac58cd` 是如何计算的？',
              options: [
                '由 EIP 作者手动指定的固定值',
                '接口中所有函数选择器（keccak256 前 4 字节）的 XOR',
                '接口名称 "IERC721" 的 keccak256 哈希前 4 字节',
                '合约部署地址的前 4 字节',
              ],
              correctIndex: 1,
              explanation:
                '接口 ID = 所有函数选择器的 XOR。每个函数选择器是函数签名（如 "balanceOf(address)"）的 keccak256 哈希的前 4 字节。将 ERC-721 的 9 个核心函数的选择器 XOR 在一起，得到 0x80ac58cd。这种计算方式是确定性的——任何人都可以独立计算并验证。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第三章：Gas 与交易机制
    // =============================================
    {
      id: 'ch3-gas-transaction',
      title: '第三章：Gas 与交易机制',
      lessons: [
        // --- 3.1 EIP-1559：费用市场改革 ---
        {
          id: 'eip1559-fee-market',
          title: 'EIP-1559：费用市场改革',
          cards: [
            {
              type: 'explain',
              title: '问题：第一价格拍卖不可预测',
              content:
                '**旧模式（First-Price Auction）的三大问题：**\n\n**1. 出价困难**\n用户必须猜测"其他人会出多少"。没有参考价格，只能看 pending 交易池。出低了交易卡在 mempool，出高了白花钱。\n\n**2. 矿工可提取价值（MEV）**\n矿工可以看到所有待处理交易的出价，选择性地排列交易顺序来最大化自己的收益。\n\n**3. Gas 价格剧烈波动**\n2021 年 NFT 热潮期间，Gas 从 30 Gwei 飙到 1000+ Gwei 只需一个区块。很多用户设了 300 Gwei 的 Gas 价格，但等交易被打包时已经不够了——交易失败但 Gas 照付。\n\n**数据**：在旧模式下，约 5% 的交易因 Gas 价格波动而失败但仍被收取费用。\n\nEIP-1559 由 Vitalik Buterin 于 2019 年提出，2021 年 8 月在 London 升级中激活（区块 12,965,000）。\n\n**参考**：[EIP-1559 原文](https://eips.ethereum.org/EIPS/eip-1559)',
              analogy: '旧模式像暗标拍卖——你不知道别人出多少，只能猜。EIP-1559 像打表的出租车——计价器给你一个明确价格，你可以额外加小费让司机快一点。',
            },
            {
              type: 'explain',
              title: 'Base Fee 调整算法',
              content:
                'Base Fee 的调整公式：\n\n```\nnew_base_fee = old_base_fee * (1 + 1/8 * (gas_used - gas_target) / gas_target)\n```\n\n其中 `gas_target = gas_limit / 2`。当前以太坊 gas_limit = 30,000,000，所以 gas_target = 15,000,000。\n\n**具体数值分析**：\n\n| 区块 Gas 使用 | 相对目标 | Base Fee 变化 |\n|-------------|---------|-------------|\n| 0 (空块) | -100% | -12.5% |\n| 7.5M | -50% | -6.25% |\n| 15M (恰好半满) | 0% | 不变 |\n| 22.5M | +50% | +6.25% |\n| 30M (完全满) | +100% | +12.5% |\n\n**12.5% 的上限为什么重要？**\n\n连续满块场景：假设 base_fee 起始为 10 Gwei\n- 区块 N: 10 * 1.125 = 11.25 Gwei\n- 区块 N+1: 11.25 * 1.125 = 12.66 Gwei\n- 区块 N+10: 10 * 1.125^10 = 32.5 Gwei\n- 区块 N+20: 10 * 1.125^20 = 105.6 Gwei\n\n约 20 个连续满块（~4 分钟）就能让 base fee 涨 10 倍。这种指数增长能有效抑制持续的高需求。',
            },
            {
              type: 'explain',
              title: '交易费用字段与实际计算',
              content:
                'Type 2 交易（EIP-1559）引入两个新字段：\n\n- `maxFeePerGas`：用户愿意支付的每单位 Gas 最高价格（上限）\n- `maxPriorityFeePerGas`：用户愿意给验证者的每单位 Gas 小费（tip）\n\n**实际费用计算**：\n```\neffective_gas_price = min(maxFeePerGas, baseFee + maxPriorityFeePerGas)\npriority_fee = effective_gas_price - baseFee\ntotal_cost = effective_gas_price * gas_used\nrefund = (maxFeePerGas - effective_gas_price) * gas_used\n```\n\n**具体例子**：\n假设 baseFee = 20 Gwei，你设置 maxFee = 50 Gwei，maxPriority = 2 Gwei\n- effective_gas_price = min(50, 20+2) = 22 Gwei\n- 验证者得到 priority = 22 - 20 = 2 Gwei\n- 协议销毁 baseFee = 20 Gwei\n- 退还给你 50 - 22 = 28 Gwei per gas\n\n**如果 baseFee 突然涨到 48 Gwei**：\n- effective_gas_price = min(50, 48+2) = 50 Gwei\n- 验证者得到 priority = 50 - 48 = 2 Gwei\n- 协议销毁 baseFee = 48 Gwei\n- 退还 = 0\n\n**如果 baseFee 涨到 55 Gwei**：交易无法被打包（maxFee 不够），等待 baseFee 下降。',
            },
            {
              type: 'explain',
              title: 'ETH 销毁机制与经济影响',
              content:
                '**Base Fee 销毁的设计动机**：\n\n为什么不把 base fee 给验证者？如果给验证者，他们有动机人为制造拥堵（塞入自己的垃圾交易）来推高 base fee，获取更多收入。销毁 base fee 消除了这个激励——验证者只能通过 priority fee 获益。\n\n**销毁数据**（截至 2025 年）：\n- 累计销毁 > 4,500,000 ETH（约 $12B+）\n- 高峰日销毁 > 15,000 ETH/天\n- 低谷日销毁 < 500 ETH/天\n- PoS 每日新发行约 1,700 ETH\n\n**通缩条件**：当每日销毁 > 1,700 ETH 时，ETH 净供应量减少。\n\n2022-2023 年活跃期间，ETH 经历了持续的净通缩。但 2024 年后随着活动转移到 L2，L1 交易减少，销毁量下降，ETH 重新转为轻微通胀。\n\n这创造了一个优雅的反馈循环：**以太坊越有用（交易越多）-> 销毁越多 -> ETH 越稀缺 -> ETH 价值上升**。\n\n**参考**：[ultrasound.money](https://ultrasound.money)',
            },
            {
              type: 'explain',
              title: '区块弹性：应对需求突增',
              content:
                'EIP-1559 将区块 gas limit 从 15M 提高到 30M，但目标使用量仍是 15M。这意味着区块可以在短时间内容纳 2 倍于目标的交易量。\n\n**为什么需要弹性？**\n\n不可预测的需求突增：NFT mint 启动、重大 DeFi 事件、黑客攻击时的紧急退出等。如果区块大小固定，这些突增会导致大量交易被延迟。\n\n**弹性的工作方式**：\n1. 突发需求来了 -> 区块填满到 30M gas\n2. 连续满块 -> base fee 每块涨 12.5%\n3. 涨价抑制了低优先级需求\n4. 需求下降 -> 区块回到 15M 附近 -> base fee 下降\n\n**数学保证**：由于 12.5% 的指数增长，持续满块不可能维持太久——base fee 会在约 20 个区块内涨到令人望而却步的水平。这就是"内置的拥堵定价"。\n\n**对节点的影响**：最坏情况下节点需要处理 2 倍于目标的数据量，但由于 base fee 的指数增长，这种情况只能持续很短的时间。',
            },
            {
              type: 'think-first',
              question: '如果连续 10 个区块都满了（30M gas），base fee 会发生什么变化？',
              hints: '记住公式：每个满块使 base fee 增加 12.5%。这是指数增长。',
              reveal: '假设初始 base fee = 10 Gwei。每个完全满的区块使 base fee 增加 12.5%（乘以 1.125）：\n\n10 个连续满块后：10 * 1.125^10 = 32.5 Gwei（涨了 3.25 倍）\n\n这种指数增长意味着：\n- 20 个满块后 -> 105 Gwei（10.5 倍）\n- 30 个满块后 -> 342 Gwei（34 倍）\n- 50 个满块后（仅约 10 分钟）-> 3,584 Gwei（358 倍！）\n\n指数增长非常强力——它确保任何需求突增都会被快速定价掉。用户要么支付越来越高的费用，要么等需求消退后再交易。这就是 EIP-1559 的"自调节阀门"。',
            },
            {
              type: 'code',
              title: 'Type 2 交易结构与 RLP 编码',
              description: '展示 EIP-1559 Type 2 交易的完整字段结构和序列化格式。',
              language: 'text',
              code: 'Type 2 交易的 RLP 编码格式：\n\n0x02 || rlp([\n    chainId,               // 链 ID (1 = 以太坊主网)\n    nonce,                 // 发送者交易序号\n    maxPriorityFeePerGas,  // 小费上限 (Wei)\n    maxFeePerGas,          // 总费用上限 (Wei)\n    gasLimit,              // Gas 上限\n    to,                    // 接收地址 (20 bytes)\n    value,                 // 转账 ETH 数量 (Wei)\n    data,                  // calldata\n    accessList,            // EIP-2930 访问列表\n    signatureYParity,      // v (0 或 1)\n    signatureR,            // r (32 bytes)\n    signatureS             // s (32 bytes)\n])\n\n对比 Legacy (Type 0) 交易：\nrlp([nonce, gasPrice, gasLimit, to, value, data, v, r, s])\n\n关键变化：\n1. 前缀 0x02 标识交易类型\n2. gasPrice 被 maxPriorityFeePerGas + maxFeePerGas 取代\n3. 新增 chainId 字段 (不再编码在 v 中)\n4. 新增 accessList (来自 EIP-2930)\n5. v 值简化为 0/1 (不再用 27/28 或 chainId*2+35/36)',
            },
            {
              type: 'quiz',
              question: '当区块 gas 使用量恰好是目标值（15M）的一半时（7.5M），base fee 会如何变化？',
              options: [
                '不变',
                '下降 6.25%',
                '下降 12.5%',
                '上涨 6.25%',
              ],
              correctIndex: 1,
              explanation:
                '代入公式：gas_used = 7.5M, gas_target = 15M。变化率 = 1/8 * (7.5M - 15M) / 15M = 1/8 * (-0.5) = -0.0625 = -6.25%。区块使用量低于目标时 base fee 下降，低多少就按比例下降多少（最多 -12.5%，即空块时）。',
            },
          ],
        },

        // --- 3.2 EIP-4844：Proto-Danksharding（Blob 交易）---
        {
          id: 'eip4844-blob-transactions',
          title: 'EIP-4844：Proto-Danksharding（Blob 交易）',
          cards: [
            {
              type: 'explain',
              title: '问题：L2 Calldata 成本过高',
              content:
                'Rollup 的安全模型要求将交易数据发布到 L1，这样任何人都可以验证 L2 状态的正确性（Optimistic Rollup 的欺诈证明 / ZK Rollup 的有效性证明）。\n\n在 EIP-4844 之前，Rollup 使用 `calldata` 存放数据。Calldata 的 Gas 定价：每个非零字节 16 gas，零字节 4 gas。\n\n**成本分析**：\n假设一个 Rollup 批次包含 1000 笔交易，压缩后约 100KB：\n- 100,000 bytes * 16 gas = 1,600,000 gas\n- 以 30 Gwei 计算 = 0.048 ETH 约 $150\n- 分摊到每笔交易 = $0.15\n\n**问题的严重性**：\n- Arbitrum + Optimism + Base 的 calldata 占以太坊总 calldata 的 30-50%\n- L1 数据费占 L2 用户总费用的 80-95%\n- L1 的 Gas 市场不区分"需要执行的交易"和"只需要存储的数据"\n\nRollup 数据不需要被 EVM 执行——它只需要"可用"。为只需可用性的数据支付与执行相同的费用是极大的浪费。\n\n**参考**：[EIP-4844 原文](https://eips.ethereum.org/EIPS/eip-4844)',
              analogy: '以前寄包裹（L2 数据）和寄信（普通交易）走同一个快递公司、同一个价格。EIP-4844 开辟了专门的货运通道——包裹走货运（blob），信件走快递（calldata），各有各的定价。',
            },
            {
              type: 'explain',
              title: 'Blob 的数据结构',
              content:
                '每个 Blob 的精确规格：\n\n- **大小**：4096 个域元素（field elements），每个 32 字节\n- **总容量**：4096 * 32 = 131,072 字节 = 128 KB\n- **域**：BLS12-381 标量域（模数 p 约 2^255）\n- **每个元素的有效载荷**：约 31 字节（因为域元素必须 < p，最高位有限制）\n- **有效数据容量**：约 4096 * 31 = 127 KB\n\n**与 calldata 的关键区别**：\n\n| | Calldata | Blob |\n|---|---------|------|\n| 存储位置 | 区块体内（所有节点永久存储）| 共识层侧车（sidecar），执行层不可见 |\n| EVM 可访问 | 是（CALLDATACOPY）| 否（只能验证 KZG 承诺）|\n| 保留期限 | 永久 | ~18 天（4096 epochs）|\n| Gas 定价 | 和执行共享 Gas 市场 | 独立的 blob gas 市场 |\n| 每区块上限 | 取决于 gas limit | 固定：目标 3 个，最多 6 个 |\n\nBlob 数据**不**进入执行层的区块体——它作为"sidecar"附着在共识层的信标区块上。EVM 永远看不到 blob 的原始数据。',
            },
            {
              type: 'explain',
              title: 'KZG 承诺：多项式承诺方案',
              content:
                'KZG (Kate-Zaverucha-Goldberg) 是一种多项式承诺方案，让你可以在不下载全部数据的情况下验证数据的完整性。\n\n**直觉理解**：\n\n1. 把 Blob 的 4096 个域元素视为一个 4095 阶多项式 `P(x)` 的系数\n2. 对这个多项式做一次"承诺"——在椭圆曲线上计算一个 48 字节的点\n3. 这 48 字节的承诺是整个 128KB 数据的"指纹"\n\n**关键属性**：\n- **绑定性**：找不到两组不同的数据有相同的承诺（碰撞抵抗）\n- **可验证性**：给定承诺 C 和一个查询点 z，验证者可以检查 `P(z) = y` 是否正确，而不需要知道整个多项式\n- **简洁性**：承诺只有 48 字节，与数据大小无关\n\n**在 EIP-4844 中的角色**：\n- 每个 Blob 计算一个 KZG 承诺（48 bytes）\n- 承诺被包含在区块头中（永久存储）\n- Blob 原始数据只保留约 18 天后被删除\n- 即使 blob 被删除，承诺仍在，可用于验证后来提供的数据\n\n**Trusted Setup**：KZG 需要一次性的可信设置。以太坊在 2023 年进行了历史上最大规模的可信设置仪式（141,416 名参与者），只要其中任何一人是诚实的，系统就是安全的。',
            },
            {
              type: 'explain',
              title: 'Blob 费用市场：独立的 EIP-1559 变体',
              content:
                'Blob 有自己独立的费用市场，机制类似 EIP-1559 但参数不同：\n\n**目标与上限**：\n- 目标：每区块 3 个 blob（384 KB）\n- 最大：每区块 6 个 blob（768 KB）\n\n**Blob base fee 调整**（指数公式，比普通 base fee 更激进）：\n```\nnew_blob_base_fee = old_blob_base_fee * e^(\n  (blob_gas_used - target_blob_gas) / target_blob_gas / UPDATE_FRACTION\n)\n```\n\n其中 `UPDATE_FRACTION = 3338477`，这使得：\n- 满载（6 blobs）时 blob base fee 增加约 12.5%\n- 空载（0 blobs）时 blob base fee 下降约 12.5%\n\n**初始定价**：Blob gas price 在 Dencun 升级时从 1 wei 开始，极其便宜。只有当持续满载时才会显著上涨。\n\n**实际数据**（2024年3月上线后）：\n- 前几个月 blob base fee 基本维持在 1-10 wei（几乎免费）\n- 偶尔需求激增时涨到几百 Gwei\n- 一个 blob = 131,072 blob gas\n- 总 blob gas per block target: 393,216 (3 blobs * 131,072)',
            },
            {
              type: 'explain',
              title: 'Type 3 交易结构',
              content:
                'EIP-4844 引入了 Type 3 交易，新增字段：\n\n```\n0x03 || rlp([\n    chain_id,\n    nonce,\n    max_priority_fee_per_gas,\n    max_fee_per_gas,\n    gas_limit,\n    to,                      // 必须非 null（不能创建合约）\n    value,\n    data,\n    access_list,\n    max_fee_per_blob_gas,    // 新增：blob gas 价格上限\n    blob_versioned_hashes,   // 新增：blob 的版本化哈希列表\n    signature_y_parity, signature_r, signature_s\n])\n```\n\n**`blob_versioned_hashes`**：\n- 每个 hash = `0x01 || sha256(kzg_commitment)[1:]`\n- 前缀 `0x01` 是版本号（未来可能用不同的承诺方案）\n- 这是 EVM 能看到的唯一 blob 信息（通过 `BLOBHASH` opcode）\n\n**Blob sidecar**（不在 RLP 编码中，通过网络层单独传输）：\n- `blobs`: 实际 blob 数据\n- `kzg_commitments`: 每个 blob 的 KZG 承诺\n- `kzg_proofs`: 每个 blob 的 KZG 证明\n\n**新增 EVM opcode**：\n- `BLOBHASH(index)` (0x49)：返回当前交易第 index 个 blob 的 versioned hash\n- `BLOBBASEFEE` (0x4a)：返回当前区块的 blob base fee',
            },
            {
              type: 'explain',
              title: '数据可用性窗口：约 18 天',
              content:
                'Blob 数据在约 18 天（4096 epochs = 4096 * 32 slots * 12 seconds 约 18.2 天）后被节点自动删除。\n\n**为什么 18 天就够了？**\n\n**Optimistic Rollup**（Arbitrum, Optimism）：\n- 欺诈证明窗口通常为 7 天\n- 挑战者需要在 7 天内提交欺诈证明\n- 18 天 > 7 天，有足够的安全边际\n\n**ZK Rollup**（zkSync, StarkNet, Scroll）：\n- 有效性证明通常在几小时内生成并验证\n- 18 天绰绰有余\n\n**删除后怎么办？**\n- 承诺仍然永久存储在区块头中\n- 原始数据可以从以下来源获取：\n  - 存档节点（自愿保存所有历史 blob）\n  - 第三方数据可用性服务（Etherscan, bloXroute 等）\n  - L2 排序器自己保存（因为数据本来就是它们提交的）\n\n**与永久存储的权衡**：如果 blob 永久存储，每个全节点每年需要额外存储约 2.5 TB 数据（假设每区块 3 blobs * 128KB * 7200 块/天 * 365 天）。临时存储将这个负担降低到约 125 GB。',
            },
            {
              type: 'explain',
              title: '实际影响：L2 费用暴降',
              content:
                '**Dencun 升级前后的 L2 费用对比**（2024 年 3 月 13 日）：\n\n| L2 | 升级前（ETH swap）| 升级后 | 降幅 |\n|---|---------|------|------|\n| Arbitrum | $0.30-1.50 | $0.01-0.05 | ~95% |\n| Optimism | $0.30-1.50 | $0.01-0.05 | ~95% |\n| Base | $0.50-2.00 | $0.005-0.03 | ~97% |\n| zkSync Era | $0.20-0.50 | $0.01-0.03 | ~94% |\n\n**费用组成变化**：\n- 升级前：L1 数据费 ~90% + L2 执行费 ~10%\n- 升级后：L1 数据费 ~30% + L2 执行费 ~70%\n\n**对生态的连锁反应**：\n1. **日活跃地址激增**：Base 在 EIP-4844 后日活从 300K 涨到 2M+\n2. **新应用场景**：链上社交（Farcaster frames）、链上游戏、小额支付等在 L2 变得经济可行\n3. **L1 收入影响**：L2 从 L1 calldata 迁移到 blob -> L1 的 Gas 收入和 ETH 销毁减少 -> 社区开始讨论 ETH 的价值捕获问题\n\n**参考**：[L2BEAT](https://l2beat.com/scaling/costs)',
            },
            {
              type: 'think-first',
              question: '为什么 blob 数据不直接放在 EVM 可以访问的 storage 里？',
              hints: '想想如果 EVM 可以读取 blob，所有节点执行交易时需要做什么……',
              reveal: '如果 blob 数据放在 EVM 可访问的 storage 中：\n\n1. **执行成本爆炸**：每个验证节点执行交易时都需要加载并处理 128KB 的 blob 数据。以太坊有数万个全节点，每个区块 3 个 blob = 384KB 需要被所有节点执行处理。\n\n2. **永久存储负担**：进入 EVM state 的数据必须永久保存（因为未来的合约可能引用它）。128KB * 每区块 3 个 * 每天 7200 个区块 = 每天 2.7 GB 的永久存储增长。\n\n3. **违背设计目的**：Blob 数据只是为了"数据可用性"——让任何人都可以下载并验证 L2 状态。它不需要被智能合约执行。把数据放在 EVM 外面，但保证一段时间内可用，是成本和功能的最优平衡。\n\n这就是 EIP-4844 的核心洞察：将"数据可用性"和"数据可执行性"解耦。',
            },
            {
              type: 'quiz',
              question: 'Blob 数据在约 18 天后被删除，这对 Optimistic Rollup 的安全性有影响吗？',
              options: [
                '有严重影响，因为历史数据丢失了',
                '没有影响，因为 Optimistic Rollup 的欺诈证明窗口（7天）远短于 18 天的数据保留期',
                '没有影响，因为 blob 数据会被备份到 IPFS',
                '有影响，需要在 18 天内完成所有验证',
              ],
              correctIndex: 1,
              explanation:
                'Optimistic Rollup 的欺诈证明窗口通常为 7 天。在这 7 天内，任何人都可以下载 blob 数据来构造欺诈证明。18 天的保留期给了 7 天窗口充足的安全边际。当 7 天挑战期结束且无人挑战后，交易被最终确认，此时 blob 数据是否还存在已经无关紧要。KZG 承诺永久保留在区块头中，可用于未来对数据的验证。',
            },
          ],
        },
      ],
    },
  ],
}
