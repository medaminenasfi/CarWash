import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

/**
 * Two-Factor Authentication Service using TOTP (Time-based One-Time Password)
 * Compatible with Google Authenticator, Authy, etc.
 */
@Injectable()
export class TwoFactorAuthService {
  /**
   * Generate a new TOTP secret
   */
  generateSecret(): string {
    // Generate 20 random bytes (160 bits as per RFC 4226)
    return crypto.randomBytes(20).toString('hex');
  }

  /**
   * Generate TOTP code from secret
   * @param secret - The TOTP secret
   * @param timestamp - Optional timestamp (defaults to current time)
   */
  generateTOTP(secret: string, timestamp: number = Date.now()): string {
    const timeStep = 30; // 30 seconds window (standard for TOTP)
    const timeCounter = Math.floor(timestamp / 1000 / timeStep);
    
    // Create buffer from counter
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigUInt64BE(BigInt(timeCounter), 0);
    
    // Create HMAC-SHA1
    const secretBuffer = Buffer.from(secret, 'hex');
    const hmac = crypto.createHmac('sha1', secretBuffer);
    hmac.update(counterBuffer);
    const hmacResult = hmac.digest();
    
    // Dynamic truncation (RFC 4226)
    const offset = hmacResult[hmacResult.length - 1] & 0x0f;
    const code = (
      ((hmacResult[offset] & 0x7f) << 24) |
      ((hmacResult[offset + 1] & 0xff) << 16) |
      ((hmacResult[offset + 2] & 0xff) << 8) |
      (hmacResult[offset + 3] & 0xff)
    ) % 1000000;
    
    // Pad with leading zeros to ensure 6 digits
    return code.toString().padStart(6, '0');
  }

  /**
   * Verify TOTP code
   * @param secret - The TOTP secret
   * @param code - The code to verify
   * @param window - Time window tolerance (default: 1 = ±30 seconds)
   */
  verifyTOTP(secret: string, code: string, window: number = 1): boolean {
    const currentTimestamp = Date.now();
    
    // Check current and adjacent time windows
    for (let i = -window; i <= window; i++) {
      const timestamp = currentTimestamp + (i * 30000);
      const expectedCode = this.generateTOTP(secret, timestamp);
      
      if (expectedCode === code) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Generate QR Code URL for Google Authenticator
   * @param email - User email
   * @param secret - TOTP secret
   * @param issuer - Application name
   */
  generateQRCodeUrl(email: string, secret: string, issuer: string = 'CarWash App'): string {
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedEmail = encodeURIComponent(email);
    
    // otpauth://totp/{issuer}:{email}?secret={secret}&issuer={issuer}
    return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${this.base32Encode(secret)}&issuer=${encodedIssuer}`;
  }

  /**
   * Generate backup codes for account recovery
   * @param count - Number of backup codes (default: 10)
   */
  generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      // Generate 8-character alphanumeric code
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4, 8)}`);
    }
    
    return codes;
  }

  /**
   * Base32 encoding for Google Authenticator compatibility
   */
  private base32Encode(buffer: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const bytes = Buffer.from(buffer, 'hex');
    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) | bytes[i];
      bits += 8;

      while (bits >= 5) {
        output += alphabet[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      output += alphabet[(value << (5 - bits)) & 31];
    }

    return output;
  }
}
