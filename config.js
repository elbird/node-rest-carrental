var config = {
	common: {
  		currencyServiceWsdl: "http://localhost/currencyconverterws/CurrencyConverter?WSDL",
  		couchdb: {
  			database: "restwebservice"
  		}
	},
	development: {},
	test: {},
	production: {}
};

module.exports = new (require("settings"))(config);