const _functions = require('../functions');
const { transformGrpc } = require('../lib');
const { messages } = require('../../stubs').entitlements;

const functions = {
	findEntitlementsByTokenString: function(call) {
		return _functions.findEntitlementsByTokenString(
			call.request.getToken()
		).then((entitlementSet) => {
			const response = new messages.FindEntitlementsByTokenStringResponse();
			response.setEntitlementSet(transformGrpc.fromMap(entitlementSet, messages.EntitlementSet));
			return response;
		});
	},
	findEntitlementsByTokenId: function(call) {
		return _functions.findEntitlementsByTokenId(
			call.request.getEntitlementTokenId()
		).then((entitlementSet) => {
			const response = new messages.FindEntitlementsByTokenIdResponse();
			response.setEntitlementSet(transformGrpc.fromMap(entitlementSet, messages.EntitlementSet));
			return response;
		});
	}
	// listEntitlers: function(call) {
	// },
	// searchForEntitler: function(call) {
	// },
	// createEntitler: function(call) {
	// },
	// updateEntitler: function(call) {
	// }
};

module.exports = Object.keys(functions).reduce((exportObj, k) => {
	const fn = functions[k];
	exportObj[k] = function(call, callback) {
		Promise.resolve().then(() => {
			return fn(call);
		}).then((res) => callback(null, res))
			.catch((err) => callback(err));
	}
	return exportObj;
}, {});