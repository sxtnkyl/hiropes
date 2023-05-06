import {
  RoutineWorkoutsLookupObject,
  StrengthWorkouts,
} from '@/pages/create/types/createTypes';

export const routineDetails: RoutineWorkoutsLookupObject = {
  endurance: {
    sixBySix: {
      name: '6x6',
      description:
        'Choose 6 boulders in the moderate/easy difficulty range. Climb no rest hardest to easiest with no break. Rest 2 minutes between sets. Complete all reps.',
      defaultReps: 6,
      repInterval: 6,
      repBreakInterval: 0.25,
      defaultSets: 6,
      setBreakInterval: 2,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    fourByFour: {
      name: '4x4',
      description:
        'Select 4 routes close in proximity of easy/moderate difficulty range. Start with the easiest route, down climbing each route, with a 5 minute break between sets.',
      defaultReps: 4,
      repInterval: 4,
      repBreakInterval: 0.25,
      defaultSets: 4,
      setBreakInterval: 5,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    thirtyCircuit: {
      name: '30 Circuit',
      description:
        'Sequentially climb 30 routes of easy/moderate difficulty. Begin moderate with 30 seconds breaks between routes.',
      defaultReps: 30,
      repInterval: 1,
      repBreakInterval: 0.5,
      defaultSets: 1,
      setBreakInterval: 0,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    pyramidLong: {
      name: 'Pyramid Long',
      description:
        'Select a total of 15 routes for a set structure of 5-4-3-2-1 with a 1 minute break interval. An easy pyramid will have a V-range of 2, while a hard will span 5.',
      defaultReps: 15,
      repInterval: 1.5,
      repBreakInterval: 1,
      defaultSets: 1,
      setBreakInterval: 0,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
  power: {
    twentyInTwenty: {
      name: '20 in 20',
      description:
        'Climb 20 moderate boulders of various styles in 20 minutes. Climb at minimum 3/4 of the boulders with no more than 30 seconds in between.',
      defaultReps: 20,
      repInterval: 1,
      repBreakInterval: 0.5,
      defaultSets: 1,
      setBreakInterval: 0,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    pyramidPump: {
      name: 'Pyramid Pump',
      description:
        'Select a total of 8 routes with the 4th and 5th route being maximum effort. Each step should increase 1-3 in grade.',
      defaultReps: 8,
      repInterval: 1.5,
      repBreakInterval: 2,
      defaultSets: 1,
      setBreakInterval: 0,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    sevenThrees: {
      name: '7:3s',
      description:
        'Using 20mm ledges, complete 6 reps of 7 seconds, with a 3 second rest between reps. Complete 6 sets with a goal of 70% additional body-weight. Weight added translates as 10% per grade, with 8-10 as 80% to 100% added weight.',
      defaultReps: 6,
      repInterval: 0.12,
      repBreakInterval: 0.05,
      defaultSets: 6,
      setBreakInterval: 3,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
  fingerStrength: {
    tempFinger: {
      name: 'Temp Finger',
      description: 'Temp descrip',
      defaultReps: 2,
      repInterval: 6,
      repBreakInterval: 0.5,
      defaultSets: 2,
      setBreakInterval: 1,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
};

export const strengthWorkouts: StrengthWorkouts = {
  benchAndSquat: { name: 'Bench And Squat', weight: 1 },
  absAndShoulders: { name: 'Abs And Shoulders', reps: 2 },
  cardio: { name: 'Cardio Run', distance: 3 },
};
