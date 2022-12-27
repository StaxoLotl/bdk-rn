//
//  BdkRnModule.m
//  BdkRnModule
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BdkRnModule, NSObject)

/** Mnemonic Methods */

RCT_EXTERN_METHOD(
    generateSeedFromWordCount: (nonnull NSNumber *)wordCount
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    generateSeedFromString: (nonnull NSString *)mnemonic
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    generateSeedFromEntropy: (nonnull NSNumber *)entropy
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

// Derivation path methods
RCT_EXTERN_METHOD(
    createDerivationPath: (nonnull NSString*)path
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

/** DescriptorSecretKey Methods */
RCT_EXTERN_METHOD(
    createDescriptorSecret: (nonnull NSString*)network
    mnemonic:(nonnull NSString *)mnemonic
    password:(nonnull NSString *)password
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    descriptorSecretDerive: (nonnull NSString*)path
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    descriptorSecretExtend: (nonnull NSString*)path
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(descriptorSecretAsPublic:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(descriptorSecretAsSecretBytes:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)


/** DescriptorPublicKey Methods */
RCT_EXTERN_METHOD(
    createDescriptorPublic: (nonnull NSString*)publicKey
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    descriptorPublicDerive: (nonnull NSString*)path
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    descriptorPublicExtend: (nonnull NSString*)path
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


/** ========================== OLD METHODS ==========================*/


RCT_EXTERN_METHOD(
    createWallet: (nonnull NSString*)mnemonic
    password:(nonnull NSString *)password  
    network:(nonnull NSString *)network
    blockChainConfigUrl:(nonnull NSString *)blockChainConfigUrl
    blockChainSocket5:(nonnull NSString *)blockChainSocket5
    retry:(nonnull NSString *)retry
    timeOut:(nonnull NSString *)timeOut
    blockChainName:(nonnull NSString *)blockChainName
    descriptor:(nonnull NSString *)descriptor
    resolve: (RCTPromiseResolveBlock)resolve 
    reject:(RCTPromiseRejectBlock)reject
)



RCT_EXTERN_METHOD(
    getExtendedKeyInfo: (nonnull NSString*)network
    mnemonic:(nonnull NSString *)mnemonic
    password:(nonnull NSString *)password
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    broadcastTx: (nonnull NSString *)recipient
    amount: (nonnull NSNumber *)amount
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(getNewAddress:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getBalance:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(syncWallet:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getPendingTransactions:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getConfirmedTransactions:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
@end
