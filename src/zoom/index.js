const api = require('../api')
const config = require('../config')
const Table = require('cli-table');
const ultils = require('../ultils')

module.exports = {
    getListMeeting: async (startDate, endDate) => {
        try {
            const res = await api.listMeeting(config.email, startDate, endDate)
            const listMeeting = res.data.meetings
            ultils.writeFile(config.meetingFile, listMeeting)
            const table = new Table({
                head: ['STT', 'ID Zoom', 'Topic', 'Start', 'Finish', 'Time', 'Participant'],
                style: {
                    head: []
                },
            });
            for (let i = 0; i < listMeeting.length; i++) {
                const meeting = listMeeting[i]
                table.push([
                    `${i + 1}`,
                    meeting.id,
                    meeting.topic,
                    new Date(meeting.start_time).toLocaleString(),
                    new Date(meeting.end_time).toLocaleString(),
                    meeting.duration,
                    meeting.participants_count
                ])
            }
            console.log(table.toString());
        } catch (error) {
            console.log(error.message);
        }
    },
    getListParticipant: async (stt) => {
        try {
            const listMeeting = ultils.readFile(config.meetingFile)
            const meeting = listMeeting[stt - 1]
            if (meeting) {
                const res = await api.listParticipant(meeting.uuid)
                const listParticipant = res.data.participants
                const table = new Table({
                    head: ['Stt', 'ID', 'Name', 'Email', 'Time join', 'Time leave', 'Minute'],
                    style: {
                        head: []
                    },
                });
                for (let i = 0; i < listParticipant.length; i++) {
                    const participant = listParticipant[i]
                    if (participant.status == 'in_meeting') {
                        table.push([
                            `${i + 1}`,
                            participant.user_id,
                            participant.name,
                            participant.user_email,
                            new Date(participant.join_time).toLocaleString(),
                            new Date(participant.leave_time).toLocaleString(),
                            Math.ceil(participant.duration / 60)
                        ])
                    }
                }
                console.log(table.toString());
            } else {
                console.log(`====== Number stt invalid`);
            }
        } catch (error) {
            console.log(error)
        }
    }

}