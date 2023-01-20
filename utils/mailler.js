const { job_send_tomorrow_todos } = require('../cron_jobs')

const checkNextDayTodosAndSendEmail = () => {
    job_send_tomorrow_todos.start()
};

module.exports = { checkNextDayTodosAndSendEmail }
