/**
 * BlinkTradeJS SDK
 * (c) 2016-present BlinkTrade, Inc.
 *
 * This file is part of BlinkTradeJS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

import ip from 'ip';
import dgram from 'dgram';

const stunIp = { local: null, public: [] };

function addIPAddress(ipAddress) {
  if (ipAddress.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
    stunIp.local = ipAddress;
  } else if (stunIp.public.indexOf(ipAddress) === -1) {
    stunIp.public.push(ipAddress);
  }
}

export function getStun(callback: Function) {
  const socket = dgram.createSocket('udp4');

  const STUN_HEADER_LENGTH = 20;
  const stunRequest = new Buffer(STUN_HEADER_LENGTH);

  const STUN_METHOD_REQUEST = 0x000;
  const STUN_BINDING_CLASS = 0x0001;
  const STUN_MAGIC_COOKIE = 0x2112A442;
  const STUN_TID_MAX = Math.pow(2, 32);

  const STUN_ATTR_MAPPED_ADDRESS = 0x0001;
  const STUN_ATTR_XOR_MAPPED_ADDRESS = 0x8020;
  const STUN_ATTR_XOR_MAPPED_ADDRESS_ALT = 0x0020;

  const stunTxId = (Math.random() * STUN_TID_MAX);

  const stunServers = [
    [3478, 'stun.services.mozilla.com'],
    [19302, 'stun.l.google.com'],
    [3478, 'stun.stunprotocol.org'],
    [3478, 'stun.softjoys.com'],
    [3478, 'stun.samsungsmartcam.com'],
    [3478, 'stun.sonetel.com'],
    [3478, 'stun.tagan.ru'],
    [3478, 'stun.voipgain.com'],
    [3478, 'stunserver.org'],
    [3478, 'stun.advfn.com'],
    [3478, 'stun.annatel.net'],
    [3478, 'stun.freevoipdeal.com'],
  ];

  stunRequest.writeUInt16BE(((STUN_BINDING_CLASS | STUN_METHOD_REQUEST) & 0x3fff), 0);
  stunRequest.writeUInt16BE(0, 2);
  stunRequest.writeUInt32BE(STUN_MAGIC_COOKIE, 4);
  stunRequest.writeUInt32BE(0, 8);
  stunRequest.writeUInt32BE(0, 12);
  stunRequest.writeUInt32BE(stunTxId, 16);

  socket.on('message', (msg) => {
    const xor = (a, b) => {
      const data = [];
      if (b.length > a.length) {
        const tmp = a;
        a = b;
        b = tmp;
      }
      for (let i = 0, len = a.length; i < len; i++) {
        data.push(a[i] ^ b[i]);
      }

      return new Buffer(data);
    };

    const block = msg.readUInt8(0);
    const bit1 = block & 0x80;
    const bit2 = block & 0x40;

    if (!(bit1 === 0 && bit2 === 0)) {
      return;
    }

    const msgHeader = msg.slice(0, STUN_HEADER_LENGTH);
    const msgAttrs = msg.slice(STUN_HEADER_LENGTH, msg.length);

    let offset = 0;

    while (offset < msgAttrs.length) {
      const attrType = msgAttrs.readUInt16BE(offset);
      offset += 2;

      let attrBuffLength = msgAttrs.readUInt16BE(offset);
      const blockOut = attrBuffLength % 4;
      if (blockOut > 0) {
        attrBuffLength += 4 - blockOut;
      }
      offset += 2;

      const value = msgAttrs.slice(offset, offset + attrBuffLength);
      offset += attrBuffLength;

      let family;
      let address;
      switch (attrType) {
        case STUN_ATTR_MAPPED_ADDRESS:
          family = (value.readUInt16BE(0) === 0x02) ? 6 : 4;
          address = ip.toString(value, 4, family);
          addIPAddress(address);
          break;

        case STUN_ATTR_XOR_MAPPED_ADDRESS:
        case STUN_ATTR_XOR_MAPPED_ADDRESS_ALT:
          family = (value.readUInt16BE(0) === 0x02) ? 6 : 4;
          const magic = msgHeader.slice(4, 8);
          const tid = msgHeader.slice(8, 20);
          const xaddr = value.slice(4, family === 4 ? 8 : 20);
          const addr = xor(xaddr, family === 4 ? magic : value.concat([magic, tid]));
          address = ip.toString(addr, 0, family);
          addIPAddress(address);
          break;
        default:
      }
    }

    callback(stunIp);
  });

  stunServers.map(([port, host]) => socket.send(stunRequest, 0, stunRequest.length, port, host, () => {}));
}
