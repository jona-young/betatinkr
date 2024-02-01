import { parse, addWeeks, subDays, isBefore, format} from 'date-fns';

export const createTrainingCycles = async (_startDate, _endDate, weeksPerBlock, deload, workoutsPerWeek) => {
    let start = parse(_startDate, "yyyy-MM-dd", new Date())
    const end = parse(_endDate, "yyyy-MM-dd", new Date())


    let mesoBlockLen
    let wPB = parseInt(weeksPerBlock)
    let wPW = parseInt(workoutsPerWeek)
    deload ? mesoBlockLen = wPB + 1 : mesoBlockLen = wPB

    let trainingCycles = []
    let mesoCount = 1
    
    // while loop always creates a start date equal to or past the end date
    while (isBefore(start, end))
    {
        let _workouts = []
        for (let i = 0; i < wPW; i++) {
            _workouts.push({
                name: 'Workout ' + (i + 1),
                activities: [{name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}]}]
            })
        }

        let weeks = []
        for (let i = 0; i < mesoBlockLen; i++) {
            let weekNum = i + 1

            if (deload == true && i == mesoBlockLen - 1) {
                weeks.push({ 
                    name: "Deload Week", 
                    workouts: _workouts
                })
            } else {
                weeks.push({ 
                    name: 'Week ' + weekNum,
                    workouts: _workouts
                })
            }
        }

        trainingCycles.push({
            name: 'Mesocycle ' + mesoCount.toString(),
            startDate: format(start, "yyyy-MM-dd"),
            endDate: format(subDays(addWeeks(start, mesoBlockLen), 1), "yyyy-MM-dd"),
            deload: deload,
            weeks: weeks
        })
        start = addWeeks(start, mesoBlockLen)
        mesoCount++;
    }

    // set the last training cycle's end date to the end date that the user provided
    trainingCycles[trainingCycles.length -1].endDate = format(end, "yyyy-MM-dd")

    return { result: true, blocks: trainingCycles}
}
