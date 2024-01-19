import { render, screen, fireEvent } from '@testing-library/react-native';
import Home from '../components/site/Home';

describe("Training", () => {
    let trainingPlans;
    beforeAll(() => {
        trainingPlans = [{
            name: '2023 Training Climbing Plan',
            startDate: '2023-10-02',
            endDate: '2024-10-02',
            activityType: 'Climbing',
            cycles: [{
                name: 'Mesocycle 1 - GPP Strength',
                startDate: '2023-10-02',
                startDayPerWeek: 'Monday',
                fatigueCheck: 4,
                weeks: [
                    {
                        name: 'Week 1',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },
                    {
                        name: 'Week 2',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },   
                    {
                        name: 'Week 3',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },                                     
                ]
            },
            {
                name: 'Mesocycle 2 - SPP Strength',
                startDate: '2023-11-02',
                startDayPerWeek: 'Monday',
                fatigueCheck: 4,
                weeks: [
                    {
                        name: 'Week 1',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },
                    {
                        name: 'Week 2',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },   
                    {
                        name: 'Week 3',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },                                     
                ]
            }]
        },
        {
            name: '2023 Lost Ark Legion Raid Plan',
            startDate: '2022-01-01',
            endDate: '2023-01-29',
            activityType: 'Lost Ark',
            cycles: [{
                name: 'Mesocycle 1 - GPP Strength',
                startDate: '2023-10-02',
                startDayPerWeek: 'Monday',
                fatigueCheck: 4,
                weeks: [
                    {
                        name: 'Week 1',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },
                    {
                        name: 'Week 2',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },   
                    {
                        name: 'Week 3',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },                                     
                ]
            },
            {
                name: 'Mesocycle 2 - SPP Strength',
                startDate: '2023-11-02',
                startDayPerWeek: 'Monday',
                fatigueCheck: 4,
                weeks: [
                    {
                        name: 'Week 1',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },
                    {
                        name: 'Week 2',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },   
                    {
                        name: 'Week 3',
                        workouts: [{
                            name: 'Workout 1 - Project Climb & Finger Strnegth',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Finger Strength',
                                exercises: [{
                                    name: 'Half Crimp',
                                    intesity: '20MM @ 7 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                },
                                {
                                    name: 'Pinch Block',
                                    intesity: '32lbs @ 10 seconds',
                                    reps: 4,
                                    measurement: 'repetitions',
                                    sets: 3
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Project & Limit Bouldering',
                                    intesity: 'bw',
                                    reps: '120',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        },
                        {
                            name: 'Workout 2 - Capacity Climbing',
                            activities: [{
                                name: 'Warm Up',
                                exercises: [{
                                    name: 'Full Depth Squad Hold',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Kneeling Shin Stretch',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                },
                                {
                                    name: 'Open Hip Mobility - Frog Pose',
                                    intesity: 'bw',
                                    reps: 30,
                                    measurement: 'time/seconds',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Climb',
                                exercises: [{
                                    name: 'Capacity Bouldering',
                                    intesity: 'bw',
                                    reps: '60',
                                    measurement: 'time/minutes',
                                    sets: 1
                                }]
                            },
                            {
                                name: 'Cooldown',
                                exercises: [{
                                    name: 'Reverse Wrist Curls',
                                    intesity: '35lbs',
                                    reps: 8,
                                    measurement: 'repetitions',
                                    sets: 4
                                }]
                            }]

                        }]
                    },                                     
                ]
            }]
        }
             
    ]
    })
    
    it("renders training plan page", () => {
        render(<Home plans={trainingPlans} />)
    });
  });