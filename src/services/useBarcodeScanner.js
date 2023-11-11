// useBarcodeScanner.js
import { useEffect } from 'react';

const useBarcodeScanner = (onBarcodeScanned) => {
  useEffect(() => {
    let barcode = "";
    let interval;

    const handleKeyDown = (event) => {
      if (interval) {
        clearInterval(interval);
      }
      if (event.code === "Enter") {
        if (barcode) {
          onBarcodeScanned(barcode);
        }
        barcode = "";
        return;
      }
      if (event.code !== "Shift") {
        barcode += event.key;
      }
      interval = setInterval(() => (barcode = ""), 200);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onBarcodeScanned]);
};

export default useBarcodeScanner;
