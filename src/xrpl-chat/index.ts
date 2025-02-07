import * as Buffer from "node:buffer";
import { box, randomBytes } from "node:crypto";
import { Client } from 'xrpl';
import {
    edwardsToMontgomeryPub,
    edwardsToMontgomeryPriv,
  } from "@noble/curves/ed25519";

const client = new Client('wss://s.altnet.rippletest.net:51233');
await client.connect();

const { wallet, balance } = await client.fundWallet();

console.log("\nAccount: ", wallet.address);
console.log("   Seed: ", wallet.seed);

export function encryptMessage(
    message: string,
    recipientPublicKey: string,
    senderSecretKey: string,
  ): string {
    const pubKeyBytes = Buffer.from(recipientPublicKey.slice(2), "hex");
    const secretKeyBytes = Buffer.from(senderSecretKey.slice(2), "hex");
  
    const nonce = randomBytes(box.nonceLength);
    const messageUint8 = Buffer.from(message);
  
    const pubKeyCurve = edwardsToMontgomeryPub(pubKeyBytes);
    const privKeyCurve = edwardsToMontgomeryPriv(secretKeyBytes);
  
    const encryptedMessage = box(messageUint8, nonce, pubKeyCurve, privKeyCurve);
  
    return JSON.stringify({
      encrypted: Buffer.from(encryptedMessage).toString("base64"),
      nonce: Buffer.from(nonce).toString("base64"),
    });
  }
  

