/************** 
 * Flank *
 **************/

import { core, data, util, visual, hardware } from './lib/psychojs-2026.1.0.js';
const { PsychoJS } = core;
const { TrialHandler } = data;

// ---- Clocks ----
let instrClock = new util.Clock();
let expClock = new util.Clock();
let fixClock = new util.Clock();
let endClock = new util.Clock();
let text_5Clock = new util.Clock();
let globalClock = new util.Clock();
let routineTimer = new util.CountdownTimer();

// ---- Instruction components ----
let text, key_resp, instrComponents;

// ---- Experiment components ----
let text_2, key_resp_2, expComponents;

// ---- Fixation ----
let text_3, fixComponents;

// ---- End routine ----
let text_4, endComponents;

// ---- Data saving routine ----
let text_6, text_5Components;

// ---- Trials loop ----
let trials;
let _key_resp_allKeys, _key_resp_2_allKeys;

// --- Experiment info ---
let expName = 'flank';
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001'
};

// --- Init PsychoJS ---
const psychoJS = new PsychoJS({ debug: true });
psychoJS.openWindow({
    fullscr: true,
    color: new util.Color([0,0,0]),
    units: 'height',
    waitBlanking: true
});

// --- Schedule experiment ---
psychoJS.schedule(() => psychoJS.gui.DlgFromDict({dictionary: expInfo, title: expName}));

const flowScheduler = new util.Scheduler(psychoJS);
const dialogCancelScheduler = new util.Scheduler(psychoJS);

psychoJS.scheduleCondition(
    () => (psychoJS.gui.dialogComponent.button === 'OK'),
    flowScheduler,
    dialogCancelScheduler
);

// --- Add routines ---
flowScheduler.add(updateInfo);
flowScheduler.add(experimentInit);

// Instruction
flowScheduler.add(instrRoutineBegin);
flowScheduler.add(instrRoutineEachFrame);
flowScheduler.add(instrRoutineEnd);

// Main trials loop
const trialsLoopScheduler = new util.Scheduler(psychoJS);
flowScheduler.add(() => trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);

// End routine
flowScheduler.add(endRoutineBegin);
flowScheduler.add(endRoutineEachFrame);
flowScheduler.add(endRoutineEnd);

// Data saving routine
flowScheduler.add(text_5RoutineBegin);
flowScheduler.add(text_5RoutineEachFrame);
flowScheduler.add(text_5RoutineEnd);

// Quit experiment
flowScheduler.add(() => quitPsychoJS('Спасибо за участие!', true));
dialogCancelScheduler.add(() => quitPsychoJS('Эксперимент отменен.', false));

psychoJS.start({ expName, expInfo, resources: [{ name: 'cond.xlsx', path: 'cond.xlsx' }] });

// --- FUNCTIONS ---
async function updateInfo() {
    currentLoop = psychoJS.experiment;
    expInfo['date'] = util.MonotonicClock.getDateStr();
    expInfo['expName'] = expName;
    expInfo['psychopyVersion'] = '2026.1.0';
    expInfo['OS'] = window.navigator.platform;
    expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
    return Scheduler.Event.NEXT;
}

async function experimentInit() {
    // --- Instructions ---
    text = new visual.TextStim({
        win: psychoJS.window,
        name: 'text',
        text: 'Добрый день, тест Фланкера...\nНажмите пробел, чтобы начать',
        font: 'Arial', pos: [0,0], height: 0.05, color: new util.Color('white')
    });
    key_resp = new core.Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });
    instrComponents = [text, key_resp];

    // --- Experiment trial text ---
    text_2 = new visual.TextStim({ win: psychoJS.window, name: 'text_2', text: '', font:'Arial', pos:[0,0], height:0.05, color: new util.Color('white') });
    key_resp_2 = new core.Keyboard({ psychoJS, clock: new util.Clock(), waitForStart: true });
    expComponents = [text_2, key_resp_2];

    // --- Fixation ---
    text_3 = new visual.TextStim({ win: psychoJS.window, name:'text_3', text:'+',
        font:'Arial', pos:[0,0], height:0.05, color: new util.Color('white') });
    fixComponents = [text_3];

    // --- End ---
    text_4 = new visual.TextStim({ win: psychoJS.window, name:'text_4', text:'Эксперимент завершен, спасибо!',
        font:'Arial', pos:[0,0], height:0.05, color: new util.Color('white') });
    endComponents = [text_4];

    // --- Data saving ---
    text_6 = new visual.TextStim({ win: psychoJS.window, name:'text_6', text:'Идет запись данных...', font:'Arial', pos:[0,0], height:0.05, color:new util.Color('white') });
    text_5Components = [text_6];

    return Scheduler.Event.NEXT;
}

// --- Instruction routine ---
function instrRoutineBegin() { return async () => {
    t=0; frameN=-1; continueRoutine=true; routineForceEnded=false;
    instrClock.reset(); routineTimer.reset();
    key_resp.keys=undefined; key_resp.rt=undefined; _key_resp_allKeys=[];
    for (const c of instrComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
}; }

function instrRoutineEachFrame() { return async () => {
    t = instrClock.getTime(); frameN++;
    if (t>=0 && text.status===PsychoJS.Status.NOT_STARTED) { text.tStart=t; text.frameNStart=frameN; text.setAutoDraw(true); }
    if (key_resp.status===PsychoJS.Status.NOT_STARTED) { key_resp.clock.reset(); key_resp.start(); key_resp.clearEvents(); key_resp.status=PsychoJS.Status.STARTED; }
    if (key_resp.status===PsychoJS.Status.STARTED) {
        let theseKeys = key_resp.getKeys({keyList:['space'], waitRelease:false});
        _key_resp_allKeys=_key_resp_allKeys.concat(theseKeys);
        if (_key_resp_allKeys.length>0) { key_resp.keys=_key_resp_allKeys[_key_resp_allKeys.length-1].name; key_resp.rt=_key_resp_allKeys[_key_resp_allKeys.length-1].rt; continueRoutine=false; }
    }
    if (!continueRoutine) { routineForceEnded=true; return Scheduler.Event.NEXT; }
    continueRoutine=false; for (const c of instrComponents) if ('status' in c && c.status!==PsychoJS.Status.FINISHED) { continueRoutine=true; break; }
    return continueRoutine ? Scheduler.Event.FLIP_REPEAT : Scheduler.Event.NEXT;
}; }

function instrRoutineEnd() { return async () => {
    for (const c of instrComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
    key_resp.stop();
    return Scheduler.Event.NEXT;
}; }

// --- Trials loop ---
function trialsLoopBegin(scheduler) { return async () => {
    trials = new TrialHandler({psychoJS, nReps:2, method:TrialHandler.Method.RANDOM, trialList:'cond.xlsx', name:'trials'});
    psychoJS.experiment.addLoop(trials); currentLoop=trials;
    for (const t of trials) {
        scheduler.add(importConditions(t));
        scheduler.add(expRoutineBegin(t));
        scheduler.add(expRoutineEachFrame());
        scheduler.add(expRoutineEnd(t));
        scheduler.add(fixRoutineBegin(t));
        scheduler.add(fixRoutineEachFrame());
        scheduler.add(fixRoutineEnd(t));
        scheduler.add(trialsLoopEndIteration(scheduler, t));
    }
    return Scheduler.Event.NEXT;
}; }

function trialsLoopEnd() { return async () => { psychoJS.experiment.removeLoop(trials); return Scheduler.Event.NEXT; }; }
function trialsLoopEndIteration(scheduler, snapshot) { return async () => { scheduler.stop(); return Scheduler.Event.NEXT; }; }
function importConditions(trial) { return async () => { psychoJS.importAttributes(trial); return Scheduler.Event.NEXT; }; }

// --- Experiment routine ---
function expRoutineBegin(trial) { return async () => {
    t=0; frameN=-1; continueRoutine=true; routineForceEnded=false;
    expClock.reset(); routineTimer.reset();
    text_2.setText(trial.stimuls);
    key_resp_2.keys=undefined; key_resp_2.rt=undefined; _key_resp_2_allKeys=[];
    for (const c of expComponents) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
}; }

function expRoutineEachFrame() { return async () => {
    t=expClock.getTime(); frameN++;
    if (t>=0 && text_2.status===PsychoJS.Status.NOT_STARTED) { text_2.tStart=t; text_2.frameNStart=frameN; text_2.setAutoDraw(true); }
    if (key_resp_2.status===PsychoJS.Status.NOT_STARTED) { key_resp_2.clock.reset(); key_resp_2.start(); key_resp_2.status=PsychoJS.Status.STARTED; }
    if (key_resp_2.status===PsychoJS.Status.STARTED) {
        let theseKeys = key_resp_2.getKeys({keyList:['left','right'], waitRelease:false});
        _key_resp_2_allKeys=_key_resp_2_allKeys.concat(theseKeys);
        if (_key_resp_2_allKeys.length>0) { key_resp_2.keys=_key_resp_2_allKeys[_key_resp_2_allKeys.length-1].name; key_resp_2.rt=_key_resp_2_allKeys[_key_resp_2_allKeys.length-1].rt; continueRoutine=false; }
    }
    if (!continueRoutine) { routineForceEnded=true; return Scheduler.Event.NEXT; }
    continueRoutine=false; for (const c of expComponents) if ('status' in c && c.status!==PsychoJS.Status.FINISHED) { continueRoutine=true; break; }
    return continueRoutine ? Scheduler.Event.FLIP_REPEAT : Scheduler.Event.NEXT;
}; }

function expRoutineEnd() { return async () => { for (const c of expComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false); key_resp_2.stop(); return Scheduler.Event.NEXT; }; }

// --- Fix routine ---
function fixRoutineBegin() { return async () => { fixClock.reset(routineTimer.getTime()); routineTimer.add(0.2); for (const c of fixComponents) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED; return Scheduler.Event.NEXT; }; }
function fixRoutineEachFrame() { return async () => { t=fixClock.getTime(); frameN++; if (t>=0 && text_3.status===PsychoJS.Status.NOT_STARTED) { text_3.setAutoDraw(true); text_3.status=PsychoJS.Status.STARTED; } if (t>=0.2 && text_3.status===PsychoJS.Status.STARTED) { text_3.setAutoDraw(false); text_3.status=PsychoJS.Status.FINISHED; } return Scheduler.Event.NEXT; }; }
function fixRoutineEnd() { return async () => { for (const c of fixComponents) c.setAutoDraw(false); return Scheduler.Event.NEXT; }; }

// --- End routine ---
function endRoutineBegin() { return async () => { endClock.reset(routineTimer.getTime()); routineTimer.add(1.0); for (const c of endComponents) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED; return Scheduler.Event.NEXT; }; }
function endRoutineEachFrame() { return async () => { t=endClock.getTime(); frameN++; if (t>=0 && text_4.status===PsychoJS.Status.NOT_STARTED) { text_4.setAutoDraw(true); text_4.status=PsychoJS.Status.STARTED; } if (t>=1.0 && text_4.status===PsychoJS.Status.STARTED) { text_4.setAutoDraw(false); text_4.status=PsychoJS.Status.FINISHED; } return Scheduler.Event.NEXT; }; }
function endRoutineEnd() { return async () => { for (const c of endComponents) c.setAutoDraw(false); return Scheduler.Event.NEXT; }; }

// --- Data saving routine ---
function text_5RoutineBegin() { return async () => { text_5Clock.reset(); routineTimer.add(1.0); for (const c of text_5Components) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED; return Scheduler.Event.NEXT; }; }
function text_5RoutineEachFrame() { return async () => { t=text_5Clock.getTime(); frameN++; if (t>=0 && text_6.status===PsychoJS.Status.NOT_STARTED) { text_6.setAutoDraw(true); text_6.status=PsychoJS.Status.STARTED; } if (t>=1.0 && text_6.status===PsychoJS.Status.STARTED) { text_6.setAutoDraw(false); text_6.status=PsychoJS.Status.FINISHED; } return Scheduler.Event.NEXT; }; }
function text_5RoutineEnd() { return async () => { for (const c of text_5Components) c.setAutoDraw(false); return Scheduler.Event.NEXT; }; }

// --- Quit experiment ---
async function quitPsychoJS(message, isCompleted) {
    if (psychoJS.experiment.isEntryEmpty()) psychoJS.experiment.nextEntry();
    psychoJS.window.close();
    psychoJS.quit({ message, isCompleted });
    return Scheduler.Event.QUIT;
}
