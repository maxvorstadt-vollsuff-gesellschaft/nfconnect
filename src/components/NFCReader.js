import React, { useState } from 'react';

const NFCReader = ({ onUUIDRead }) => {
  const [uuid, setUUID] = useState(null);
  const [error, setError] = useState(null);

  const connectToReader = async () => {
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        const textDecoder = new TextDecoderStream();
        port.readable.pipeTo(textDecoder.writable);
        const reader = textDecoder.readable.getReader();

        let buffer = '';

        while (true) {
            console.log("awaiting value ...");

            const { value, done } = await reader.read();

            console.log("received");

            if (done) {
                console.log('Serial port closed.');
                break;
            }
            console.log(value);
            if (value) {
                buffer += value;

                let newlineIndex;
                while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                    const line = buffer.slice(0, newlineIndex).trim();
                    buffer = buffer.slice(newlineIndex + 1);

                    if (line.includes('card:')) {
                        const uid = line.split(':')[1].trim();
                        console.log('NFC UID detected:', uid);

                        setUUID(uid);
                        onUUIDRead(uid);
                    }
                }
            }
        }

        reader.releaseLock();
    } catch (err) {
        console.error('Error reading from NFC reader:', err);
        setError('Failed to read from NFC reader');
    }
};

  return (
    <div>
      <h2>NFC Reader</h2>
      <button onClick={connectToReader}>Scan NFC Card</button>
      {uuid && <p>UUID: {uuid}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default NFCReader;
