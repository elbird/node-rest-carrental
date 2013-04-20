var config = {
	common: {
  		currencyServiceWsdl: "http://localhost/currencyconverterws/CurrencyConverter?WSDL",
  		couchdb: {
  			database: "restwebservice"
  		}
	},
	development: {},
	test: {
		couchdb: {
  			database: "carrental_test"
  		}
	},
	production: {}
};

module.exports = new (require("settings"))(config);