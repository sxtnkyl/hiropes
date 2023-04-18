import {
  RoutineOptions,
  StrengthOptions,
} from '@/pages/create/types/createTypes';

export const routineDetails: RoutineOptions = {
  endurance: {
    sixBySix: {
      name: '6x6',
      description:
        'Choose 6 boulders in the moderate/easy difficulty range. Climb no rest hardest to easiest with no break. Rest 2 minutes between sets. Complete all reps.',
      defaultReps: 6,
      defaultSets: 6,
      breakInterval: 2,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    fourByFour: {
      name: '4x4',
      description:
        'Select 4 routes close in proximity of easy/moderate difficulty range. Start with the easiest route, downclimbing each route, with a 5 minute break between sets.',
      defaultReps: 4,
      defaultSets: 4,
      breakInterval: 5,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    thirtyCircuit: {
      name: '30 Circuit',
      description:
        'Sequentially climb 30 routes of easy/moderate difficulty. Begin moderate with 30 seconds breaks between routes.',
      defaultReps: 30,
      defaultSets: 1,
      breakInterval: 0.5,
      bottomRange: '0-2',
      topRange: '4-6',
    },
    pyramidLong: {
      name: 'Pyramid Long',
      description:
        'Select a total of 15 routes for a set structure of 5-4-3-2-1 with a 1 minute break interval. An easy pyramid will have a V-range of 2, while a hard will span 5.',
      defaultReps: 15,
      defaultSets: 1,
      breakInterval: 1,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
  power: {
    tempPower: {
      name: 'Temp Power',
      description: 'temp descrip',
      defaultReps: 6,
      defaultSets: 6,
      breakInterval: 2,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
  fingerStrength: {
    tempFinger: {
      name: 'Temp Finger',
      description: 'Temp descrip',
      defaultReps: 6,
      defaultSets: 6,
      breakInterval: 2,
      bottomRange: '0-2',
      topRange: '4-6',
    },
  },
};

export const strengthWorkouts: StrengthOptions = {
  benchAndSquat: { name: 'Bench And Squat', weight: 1 },
  absAndShoulders: { name: 'Abs And Shoulders', reps: 2 },
  cardio: { name: 'Cardio Run', distance: 3 },
};
