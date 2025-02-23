import { AddressIndex, Network } from '../lib/enums';
import { AddressInfo, Balance, LocalUtxo, SignOptions, TransactionDetails } from './Bindings';
import { createOutpoint, createTxDetailsObject, createTxOut, getKeychainKind, getNetwork } from '../lib/utils';

import { Address } from './Address';
import { Blockchain } from './Blockchain';
import { DatabaseConfig } from './DatabaseConfig';
import { Descriptor } from './Descriptor';
import { NativeLoader } from './NativeLoader';
import { PartiallySignedTransaction } from './PartiallySignedTransaction';
import { Script } from './Script';

/**
 * Wallet methods
 */
export class Wallet extends NativeLoader {
  isInit: boolean = false;
  id: string = '';

  /**
   * Wallet constructor
   * @param descriptor
   * @param network
   * @returns {Promise<Wallet>}
   */
  async create(
    descriptor: Descriptor,
    changeDescriptor: Descriptor | null = null,
    network: Network,
    dbConfig: DatabaseConfig
  ): Promise<Wallet> {
    this.id = await this._bdk.walletInit(
      descriptor.id,
      changeDescriptor ? changeDescriptor.id : null,
      network,
      dbConfig.id
    );
    this.isInit = true;
    return this;
  }

  /**
   * Return a derived address using the external descriptor.
   * @param addressIndex
   * @returns {Promise<AddressInfo>}
   */
  async getAddress(addressIndex: AddressIndex): Promise<AddressInfo> {
    let addressInfo = await this._bdk.getAddress(this.id, addressIndex);
    return new AddressInfo(
      addressInfo.index,
      new Address()._setAddress(addressInfo.address),
      getKeychainKind(addressInfo.keychain)
    );
  }

  /**
   * Return a derived address using the internal descriptor.
   * @param addressIndex
   * @returns {Promise<AddressInfo>}
   */
  async getInternalAddress(addressIndex: AddressIndex): Promise<AddressInfo> {
    let addressInfo = await this._bdk.getInternalAddress(this.id, addressIndex);
    return new AddressInfo(
      addressInfo.index,
      new Address()._setAddress(addressInfo.address),
      getKeychainKind(addressInfo.keychain)
    );
  }

  /**
   * check if the wallet is yours or not
   * @param script
   * @returns {Promise<boolean>}
   */
  async isMine(script: Script): Promise<boolean> {
    return await this._bdk.isMine(this.id, script.id);
  }

  /**
   * Return balance of current wallet
   * @returns {Promise<Balance>}
   */
  async getBalance(): Promise<Balance> {
    let balance = await this._bdk.getBalance(this.id);
    return new Balance(
      balance.trustedPending,
      balance.untrustedPending,
      balance.confirmed,
      balance.spendable,
      balance.total
    );
  }

  /**
   * Get the Bitcoin network the wallet is using.
   * @returns {Promise<string>}
   */
  async network(): Promise<Network> {
    let networkName = await this._bdk.getNetwork(this.id);
    return getNetwork(networkName);
  }

  /**
   * Sync the internal database with the [Blockchain]
   * @returns {Promise<boolean>}
   */
  async sync(blockchain: Blockchain): Promise<boolean> {
    return await this._bdk.sync(this.id, blockchain.id);
  }

  /**
   * Return the list of unspent outputs of this wallet
   * @returns {Promise<Array<LocalUtxo>>}
   */
  async listUnspent(): Promise<Array<LocalUtxo>> {
    let output = await this._bdk.listUnspent(this.id);
    let localUtxo: Array<LocalUtxo> = [];
    output.map((item) => {
      let localObj = new LocalUtxo(createOutpoint(item.outpoint), createTxOut(item.txout), item.isSpent, item.keychain);
      localUtxo.push(localObj);
    });
    return localUtxo;
  }

  /**
   * Return an unsorted list of transactions made and received by the wallet
   * @returns {Promise<Array<TransactionDetails>>}
   */
  async listTransactions(includeRaw: boolean): Promise<Array<TransactionDetails>> {
    let list = await this._bdk.listTransactions(this.id, includeRaw);
    let transactions: Array<TransactionDetails> = [];
    list.map((item) => {
      let localObj = createTxDetailsObject(item);
      transactions.push(localObj);
    });
    return transactions;
  }

  /**
   * Sign PSBT with wallet
   * @returns
   */
  async sign(psbt: PartiallySignedTransaction, signOptions?: SignOptions): Promise<PartiallySignedTransaction> {
    let signed = await this._bdk.sign(this.id, psbt.base64, signOptions);
    return new PartiallySignedTransaction(signed);
  }
}
