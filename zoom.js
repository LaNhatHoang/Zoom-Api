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
    .option("-f, --from <type>", "Start date format: yyyy-MM-dd (Ex: 2024-06-30", "2024-01-01")
    .option("-t, --to <type>", "Finish date format: yyyy-MM-dd (Ex: 2024-07-20")
    .option("-p, --page_size <type>", "Number of records", "300")
    .option("-n, --next_page_token <type>", "Next page token to paginate through large result sets")
    .action(async (options) => {
        await zoom.getListMeeting(options)
    });

program
    .command("participant")
    .description("Get list participant meeting")
    .argument('<id>', 'The meeting ID or universally unique ID (UUID)')
    .option("-p, --page_size <type>", "Number of records", "300")
    .option("-n, --next_page_token <type>", "Next page token to paginate through large result sets")
    .action(async (argument, options) => {
        await zoom.getListParticipant(argument, options)
    });

    program
    .command("statistic")
    .description("Statistic data participant")
    .argument('<id>', 'The meeting ID or universally unique ID (UUID)')
    .option("-p, --page_size <type>", "Number of records", "300")
    .option("-n, --next_page_token <type>", "Next page token to paginate through large result sets")
    .action(async (argument, options) => {
        await zoom.statisticParticipant(argument, options)
    });


program.parse();


