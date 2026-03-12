import { core, data, util, visual } from './lib/psychojs-2026.1.0.js';
const { PsychoJS } = core;
const { TrialHandler } = data;

// --- EXPERIMENT INFO ---
let expName = 'flank';
let expInfo = { participant: util.pad(util.randint(0, 999999), 6), session: '001' };

// --- INIT PSYCHOJS ---
const psychoJS = new PsychoJS({ debug: true });
psychoJS.openWindow({ fullscr: true, color: new util.Color([0,0,0]), units: 'height', waitBlanking: true });

// --- GLOBAL VARIABLES ---
let instrClock, expClock, fixClock, endClock;
let textInstr, keyInstr, textStim, keyStim, textFix, textEnd;
let trials, currentLoop;

// --- START EXPERIMENT ---
psychoJS.schedule(psychoJS.gui.DlgFromDict({ dictionary: expInfo, title: expName }));
const flowScheduler = new util.Scheduler(psychoJS);
flowScheduler.add(updateInfo);
flowScheduler.add(experimentInit);
flowScheduler.add(instrRoutine);
flowScheduler.add(trialsRoutine);
flowScheduler.add(endRoutine);
flowScheduler.add(() => quitPsychoJS('Спасибо за участие!', true));
psychoJS.start({ expName, expInfo, resources: [{ name: 'cond.xlsx', path: 'cond.xlsx' }] });

// --- UPDATE INFO ---
async function updateInfo() {
    expInfo['date'] = util.MonotonicClock.getDateStr();
    expInfo['psychopyVersion'] = '2026.1.0';
    expInfo['OS'] = navigator.platform;
    psychoJS.experiment.dataFileName = `data/${expInfo.participant}_${expName}_${expInfo.date}`;
    return util.Scheduler.Event.NEXT;
}

// --- INIT COMPONENTS ---
async function experimentInit() {
    instrClock = new util.Clock();
    expClock = new util.Clock();
    fixClock = new util.Clock();
    endClock = new util.Clock();

    textInstr = new visual.TextStim({ win: psychoJS.window, text: 'Добрый день, тест Фланкера. Сосредоточьтесь на средней стрелке.\nИспользуйте стрелки влево/вправо для ответа.\nНажмите пробел, чтобы начать', pos: [0,0], height: 0.05, color: new util.Color('white') });
    keyInstr = new core.Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });

    textStim = new visual.TextStim({ win: psychoJS.window, text: '', pos: [0,0], height: 0.05, color: new util.Color('white') });
    keyStim = new core.Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });

    textFix = new visual.TextStim({ win: psychoJS.window, text: '+', pos: [0,0], height: 0.05, color: new util.Color('white') });
    textEnd = new visual.TextStim({ win: psychoJS.window, text: 'Эксперимент завершен, спасибо!', pos: [0,0], height: 0.05, color: new util.Color('white') });

    return util.Scheduler.Event.NEXT;
}

// --- INSTRUCTION ROUTINE ---
async function instrRoutine() {
    textInstr.setAutoDraw(true);
    keyInstr.start();
    keyInstr.clearEvents();
    let continueRoutine = true;
    while (continueRoutine) {
        let keys = keyInstr.getKeys({ keyList:['space'], waitRelease:false });
        if (keys.length > 0) continueRoutine = false;
        await psychoJS.window.flip();
    }
    keyInstr.stop();
    textInstr.setAutoDraw(false);
    return util.Scheduler.Event.NEXT;
}

// --- TRIALS ROUTINE ---
async function trialsRoutine() {
    trials = new TrialHandler({ psychoJS, nReps:2, method: TrialHandler.Method.RANDOM, trialList:'cond.xlsx', name:'trials' });
    psychoJS.experiment.addLoop(trials);
    currentLoop = trials;

    for (let thisTrial of trials) {
        // --- FIXATION ---
        textFix.setAutoDraw(true);
        fixClock.reset();
        let fixStart = performance.now();
        while (performance.now() - fixStart < 200) await psychoJS.window.flip();
        textFix.setAutoDraw(false);

        // --- STIMULUS ---
        textStim.setText(thisTrial.stimuls);
        textStim.setAutoDraw(true);
        keyStim.start();
        keyStim.clearEvents();
        let response = thisTrial.response;
        let responded = false;
        while (!responded) {
            let keys = keyStim.getKeys({ keyList:['left','right'], waitRelease:false });
            if (keys.length > 0) {
                let lastKey = keys[keys.length-1];
                keyStim.corr = lastKey.name === response ? 1 : 0;
                psychoJS.experiment.addData('key.keys', lastKey.name);
                psychoJS.experiment.addData('key.corr', keyStim.corr);
                psychoJS.experiment.addData('key.rt', lastKey.rt);
                responded = true;
            }
            await psychoJS.window.flip();
        }
        keyStim.stop();
        textStim.setAutoDraw(false);
    }
    return util.Scheduler.Event.NEXT;
}

// --- END ROUTINE ---
async function endRoutine() {
    textEnd.setAutoDraw(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    textEnd.setAutoDraw(false);
    return util.Scheduler.Event.NEXT;
}

// --- QUIT ---
async function quitPsychoJS(message, isCompleted) {
    psychoJS.window.close();
    psychoJS.quit({ message, isCompleted });
    return util.Scheduler.Event.QUIT;
}
