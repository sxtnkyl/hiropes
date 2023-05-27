import {
  RoutineWorkoutsLookupObject,
  StrengthWorkouts,
} from '@/pages/create/types/createTypes';

export const routineDetails: RoutineWorkoutsLookupObject = {
  endurance: {
    sixBySix: {
      name: '6x6',
      description:
        'Choose 6 boulders in your moderate/easy difficulty range. Climb no rest hardest to easiest with no break. Rest 2 minutes between sets. Complete all reps.',
      defaultReps: 6,
      repInterval: 60,
      repBreakInterval: 15,
      defaultSets: 6,
      setBreakInterval: 120,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    fourByFour: {
      name: '4x4',
      description:
        'Select 4 routes of similar grade in your easy/moderate difficulty range. Start with the easiest route, down climbing each route, with a 5 minute break between sets.',
      defaultReps: 4,
      repInterval: 60,
      repBreakInterval: 15,
      defaultSets: 4,
      setBreakInterval: 300,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    thirtyCircuit: {
      name: '30 Circuit',
      description:
        'Sequentially climb 30 routes in your easy/moderate difficulty. Begin with the moderate grades, with 30 seconds breaks between routes.',
      defaultReps: 30,
      repInterval: 60,
      repBreakInterval: 30,
      defaultSets: 1,
      setBreakInterval: 0,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    pyramidLong: {
      name: 'Pyramid Long',
      description:
        'Select a total of 15 routes for a set structure of 5-4-3-2-1 with a 1 minute break interval. An easy pyramid will have a V-range of 2, while a hard should span 5.',
      defaultReps: 15,
      repInterval: 90,
      repBreakInterval: 60,
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
        'Climb 20 boulders of various styles in 20 minutes within your moderate difficulty range. Climb at minimum 3/4 of the boulders with no more than 30 seconds in between.',
      defaultReps: 20,
      repInterval: 60,
      repBreakInterval: 30,
      defaultSets: 1,
      setBreakInterval: 0,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    pyramidPump: {
      name: 'Pyramid Pump',
      description:
        'Select a total of 8 routes with the 4th and 5th route requiring maximum effort. Each step should increase 1-3 in grade.',
      defaultReps: 8,
      repInterval: 90,
      repBreakInterval: 120,
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
      repInterval: 7,
      repBreakInterval: 3,
      defaultSets: 6,
      setBreakInterval: 180,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
  fingerStrength: {
    quickIntervalTest: {
      name: 'Interval Test',
      description: 'quick ints for testing',
      defaultReps: 2,
      repInterval: 3,
      repBreakInterval: 2,
      defaultSets: 5,
      setBreakInterval: 5,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    tempFinger: {
      name: 'Temp Finger',
      description: 'Temp descrip',
      defaultReps: 2,
      repInterval: 360,
      repBreakInterval: 30,
      defaultSets: 2,
      setBreakInterval: 60,
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
