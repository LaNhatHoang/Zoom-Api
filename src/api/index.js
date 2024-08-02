const config = require("../config");
const http = require("./http");

module.exports = {
    listMeeting: async (email, options) =>
        await http.get(
            `/report/users/${email}/meetings`
            , { params: options }
        ),
    listParticipant: async (id, options) =>
        await http.get(
            `/report/meetings/${encodeURI(encodeURI(id))}/participants`
            , { params: options }
        )
};
