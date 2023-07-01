import React, { useState, useEffect } from "react";

const BitcoinPriceToWords = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        const data = await response.json();
        const priceInUSD = data.bpi.USD.rate_float;
        setBitcoinPrice(priceInUSD);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    };

    fetchBitcoinPrice();
  }, []);

  const convertToWords = (number) => {
    const singleDigits = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const units = ["", "thousand", "million", "billion", "trillion"];

    if (number === 0) {
      return singleDigits[0];
    }

    let words = "";

    let currentNumber = Math.floor(number);
    let unitIndex = 0;

    while (currentNumber > 0) {
      const currentWords = convertThreeDigitNumber(currentNumber % 1000);

      if (currentWords !== "") {
        words = currentWords + " " + units[unitIndex] + " " + words;
      }

      currentNumber = Math.floor(currentNumber / 1000);
      unitIndex++;
    }

    return words.trim();
  };

  const convertThreeDigitNumber = (number) => {
    const singleDigits = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    let words = "";

    const hundreds = Math.floor(number / 100);
    const tensAndUnits = number % 100;

    if (hundreds > 0) {
      words += singleDigits[hundreds] + " hundred ";
    }

    if (tensAndUnits >= 20) {
      words += tens[Math.floor(tensAndUnits / 10)] + " ";
      words += singleDigits[tensAndUnits % 10] + " ";
    } else if (tensAndUnits >= 10) {
      words += teens[tensAndUnits - 10] + " ";
    } else if (tensAndUnits > 0) {
      words += singleDigits[tensAndUnits] + " ";
    }

    return words.trim();
  };

  return (
    <div>
      <h1>Bitcoin Price</h1>
      {bitcoinPrice ? (
        <div>
          <p>Current price: {bitcoinPrice} USD</p>
          <p>Price in words: {convertToWords(bitcoinPrice)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BitcoinPriceToWords;
