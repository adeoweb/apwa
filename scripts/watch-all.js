// Deprecated script.

require('events').EventEmitter.defaultMaxListeners = 100;

const chalk = require('chalk');
const chokidar = require('chokidar');
const execa = require('execa');
const figures = require('figures');
const debounce = require('lodash.debounce');
const path = require('path');

const warn = (msg, ...args) => {
    console.warn(
        chalk.yellowBright(`\n  ${figures.warning}  ${msg}\n`),
        ...args
    );
};

const gracefulExit = () => {
    warn('Exiting watch mode.');
    process.exit(0);
};

process.on('SIGINT', gracefulExit);

const rootDir = path.resolve(__dirname, '..');

const restartDevServerOnChange = [
    'src/*.{json,yml}',
    'src/static/**/*',
    'src/templates/**/*',
    'yarn.lock'
];

const eventBuffer = [];

function summarizeEvents() {
    const typeMap = eventBuffer.reduce(
        (summaries,
        ({ name }) => {
            summaries[name] = (summaries[name] || 0) + 1;
        },
        {})
    );

    return Object.entries(typeMap).map(([name, value]) => ({
        name,
        file: `${value} files`
    }));
}

let devServer;
function startDevServer() {
    eventBuffer.length = 0;
    devServer = execa(
        'webpack-dev-server',
        ['--stdin', '--progress', '--color', '--env.mode', 'development'],
        {
            cwd: path.join(rootDir, 'src/'),
            localDir: path.join(rootDir, 'node_modules/.bin')
        }
    );
    devServer.on('exit', () => {
        devServer.exited = true;
    });
    devServer.stdout.pipe(process.stdout);
    devServer.stderr.pipe(process.stderr);
}

let isClosing = false;
const runVeniaWatch = debounce(() => {
    if (!devServer) {
        warn('Launching webpack-dev-server');
        return startDevServer();
    }
    const fileSummary =
        eventBuffer.length > 20 ? summarizeEvents() : eventBuffer;
    warn(
        `Relaunching webpack-dev-server due to: \n  - ${fileSummary
            .map(
                ({ name, file }) =>
                    `${chalk.yellow(name)} ${chalk.whiteBright(file)}`
            )
            .join('\n  - ')}\n`
    );
    if (devServer.exited) {
        return startDevServer();
    }
    if (!isClosing) {
        devServer.on('close', () => {
            isClosing = false;
            devServer = false;
            startDevServer();
        });
        isClosing = true;
        devServer.stdout.unpipe(process.stdout);
        devServer.stderr.unpipe(process.stderr);
        devServer.kill();
    }
}, 800);

function watchRestartRequirements() {
    return chokidar.watch(restartDevServerOnChange, {
        ignored: '**/__*__/**/*'
    });
}

function watchVeniaWithRestarts() {
    const eventsToListenTo = ['add', 'change', 'unlink'];
    const watcher = watchRestartRequirements();
    const enqueue = (name, file) => {
        eventBuffer.push({ name, file });
        runVeniaWatch();
    };
    // chokidar appears not to have `.removeEventListener`, so this is the next
    // best thing: just reassign functions.
    let handler = debounce(() => {
        handler = enqueue;
        runVeniaWatch();
    }, 900);

    eventsToListenTo.forEach(name =>
        watcher.on(name, file => handler(name, file))
    );
}

watchVeniaWithRestarts();
