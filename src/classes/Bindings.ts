/**
 * A derived address and the index it was found at For convenience this automatically derefs to Address
 */
export class AddressInfo {
  /**
   * Child index of this address
   */
  index: number;

  /**
   * Address
   */
  address: string;

  constructor(index: number, address: string) {
    this.index = index;
    this.address = address;
  }
}

/**
 * A reference to a transaction output.
 */
export class OutPoint {
  /**
   * The referenced transaction's txid.
   */
  txid: string;

  /**
   * The index of the referenced output in its transaction's vout.
   */
  vout: number;

  constructor(txid: string, vout: number) {
    this.txid = txid;
    this.vout = vout;
  }
}

/**
 * A transaction output, which defines new coins to be created from old ones.
 */
export class TxOut {
  /**
   * The value of the output, in satoshis.
   */
  value: number;

  /**
   * The address of the output.
   */
  address: string;

  constructor(value: number, address: string) {
    this.value = value;
    this.address = address;
  }
}

/**
 * Unspent outputs of this wallet
 */
export class LocalUtxo {
  /**
   * Reference to a transaction output
   */
  outpoint: OutPoint;

  /**
   * Transaction output
   */
  txout: TxOut;

  /**
   * Whether this UTXO is spent or not
   */
  isSpent: boolean;

  constructor(outpoint: OutPoint, txout: TxOut, isSpent: boolean) {
    this.outpoint = outpoint;
    this.txout = txout;
    this.isSpent = isSpent;
  }
}

export class Balance {
  /**
   * Unconfirmed UTXOs generated by a wallet tx
   */
  trustedPending: number;

  /**
   * Unconfirmed UTXOs received from an external wallet
   */
  untrustedPending: number;

  /**
   * Confirmed and immediately spendable balance
   */
  confirmed: number;

  /**
   * Get sum of trusted_pending and confirmed coins
   */
  spendable: number;

  /**
   * Get the whole balance visible to the wallet
   */
  total: number;

  constructor(trustedPending: number, untrustedPending: number, confirmed: number, spendable: number, total: number) {
    this.trustedPending = trustedPending;
    this.untrustedPending = untrustedPending;
    this.confirmed = confirmed;
    this.spendable = spendable;
    this.total = total;
  }
}

/**
 * Block height and timestamp of a block
 */
export class BlockTime {
  /**
   * Confirmation block height
   */
  height: number | undefined;

  /**
   * Confirmation block timestamp
   */
  timestamp: number | undefined;

  constructor(height: number | undefined, timestamp: number | undefined) {
    this.height = height;
    this.timestamp = timestamp;
  }
}

/**
 * A wallet transaction
 */
export class TransactionDetails {
  /**
   * Transaction id.
   */
  txid: string;

  /**
   * Received value (sats)
   * Sum of owned outputs of this transaction.
   */
  received: number;

  /**
   * Sent value (sats)
   * Sum of owned inputs of this transaction.
   */
  sent: number;

  /**
   * Fee value (sats) if confirmed.
   * The availability of the fee depends on the backend. It's never None with an Electrum
   * Server backend, but it could be None with a Bitcoin RPC node without txindex that receive funds while offline.
   */
  fee?: number | undefined;

  /**
   * If the transaction is confirmed, contains height and timestamp of the block containing the
   * transaction, unconfirmed transaction contains `None`.
   */
  confirmationTime?: BlockTime;

  constructor(txid: string, received: number, sent: number, fee: number | undefined, confirmationTime: BlockTime) {
    this.txid = txid;
    this.received = received;
    this.sent = sent;
    this.fee = fee;
    this.confirmationTime = confirmationTime;
  }
}

/**
 * Address script class
 */
export class Script {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

/**
 * A output script and an amount of satoshis.
 */
export class ScriptAmount {
  script: Script;
  amount: number;
  constructor(script: Script, amount: number) {
    this.script = script;
    this.amount = amount;
  }
}
