const config = require("../config");
const http = require("./http");

module.exports = {
    listMeeting: async (email, startDate, endDate) => 
        await http.get(
            `/report/users/${email}/meetings?from=${startDate}&to=${endDate}&type=past&page_size=300`),
    listParticipant: async (uuid) => 
        await http.get(
            `/report/meetings/${encodeURI(encodeURI(uuid))}/participants?page_size=300&page_number=1`)
};
