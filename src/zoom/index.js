const api = require('../api')
const config = require('../config')
const Table = require('cli-table');
const ultils = require('../ultils')

module.exports = {
    getListMeeting: async (options) => {
        try {
            const res = await api.listMeeting(config.email, options)
            console.log(`====== From: ${res.data.from}`);
            console.log(`====== To: ${res.data.to}`);
            const listMeeting = res.data.meetings
            const table = new Table({
                head: ['No.', 'ID', 'UUID', 'Topic', 'Start', 'Finish', 'Time', 'Participant'],
                style: {
                    head: []
                },
            });
            for (let i = 0; i < listMeeting.length; i++) {
                const meeting = listMeeting[i]
                table.push([
                    `${i + 1}`,
                    meeting.id,
                    meeting.uuid,
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
    getListParticipant: async (argument, options) => {
        try {
            const res = await api.listParticipant(argument, options)
            const listParticipant = res.data.participants
            const table = new Table({
                head: ['No.', 'Name', 'Email', 'Time join', 'Time leave', 'Minute'],
                style: {
                    head: []
                },
            });
            for (let i = 0; i < listParticipant.length; i++) {
                const participant = listParticipant[i]
                table.push([
                    `${i + 1}`,
                    participant.name,
                    participant.user_email,
                    new Date(participant.join_time).toLocaleString(),
                    new Date(participant.leave_time).toLocaleString(),
                    Math.ceil(participant.duration / 60)
                ])
            }
            console.log(table.toString());
        } catch (error) {
            console.log(error.message)
        }
    },
    statisticParticipant: async (argument, options) => {
        try {
            const res = await api.listParticipant(argument, options)
            const listParticipant = res.data.participants
            const table = new Table({
                head: ['No.', 'Name', 'Email', 'Minute'],
                style: {
                    head: []
                },
            });
            const arrParticipant = []
            for (let i = 0; i < listParticipant.length; i++) {
                const participant = listParticipant[i]
                let flag = false
                for (let j = 0; j < arrParticipant.length; j++) {
                    if(arrParticipant[j].name == participant.name && arrParticipant[j].email == participant.email){
                        arrParticipant[j].duration += participant.duration
                        flag = true
                        break
                    }
                }
                if(flag == false){
                    arrParticipant.push(participant)
                }
            }
            for(let i=0;i<arrParticipant.length;i++){
                const participant = arrParticipant[i]
                table.push([
                    `${i + 1}`,
                    participant.name,
                    participant.user_email,
                    Math.ceil(participant.duration / 60)
                ])
            }
            console.log(table.toString());
        } catch (error) {
            console.log(error.message)
        }
    }
}