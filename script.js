var app = angular.module("MyApp", []).
controller("InvoiceController", function() {
  this.currencies = ['INR', 'EUR', 'USD'];
  this.inCurr = "INR";
  this.outCurr = "EUR";
  this.inrToForeignRates = {
    INR: 1,
    EUR: 0.013,
    USD: 0.015
  };
  this.inputValue = 10;
  this.outputValue = function(input, inCurr, outCurr) {
    return input * this.inrToForeignRates[outCurr] / this.inrToForeignRates[inCurr];
  };
  this.output = function() {
    return this.outputValue(this.inputValue, this.inCurr, this.outCurr);
  };
});