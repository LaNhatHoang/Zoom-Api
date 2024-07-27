const { Command } = require("commander");
const program = new Command();
const config = require('./src/config')
const zoom = require('./src/zoom')

program
    .name("node zoom")
    .usage('[command] [option]')
    .description('CLI ZOOM API')
    .version('1.0.0', '-v, --version', 'Display version')
    .helpOption('-h, --help', 'Display help for command')

program
    .command("meeting")
    .description("Get list meeting from date to date")
    .option("-f, --from <type>", "Start date format: yyyy-MM-dd (Ex: 2024-06-30")
    .option("-t, --to <type>", "Finish date format: yyyy-MM-dd (Ex: 2024-07-20")
    .action(async (options) => {
        let startDate = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
        let endDate = new Date().toISOString().split('T')[0]
        try {
            if (options.from) {
                startDate = new Date(options.from).toISOString().split('T')[0]
            }
            if (options.to) {
                endDate = new Date(options.to).toISOString().split('T')[0]
            }
            await zoom.getListMeeting(startDate, endDate)
        } catch (error) {
            console.log(`======`, error.message);
        }
    });

program
    .command("prt")
    .description("Get list participant meeting by stt")
    .argument('<stt>', 'Number stt meeting in list')
    .action(async (argument) => {
        const stt = Number(argument)
        if (isNaN(stt)) {
            console.log(`====== Type of argument <stt> invalid`);
        } else {
            await zoom.getListParticipant(stt)
        }
    });

program.parse();


