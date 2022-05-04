import { assign, createMachine, interpret } from 'xstate'
import data from '@ytg/core';

type DemoData = {
  userId: number;
  user: string;
  error: null | Error;
  data?: string
};

const normalTask = () => new Promise<DemoData>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve({
        userId: Math.random(),
        user: 'hello',
        error: null,
      });
    } else {
      reject({
        userId: 0,
        user: '',
        error: new Error('test'),
      });
    }
  }, 1000);
});

const fetchCuteAnimals = () => {
  return normalTask;
}

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active'
      }
    },
    active: {
      on: {
        TOGGLE: 'inactive'
      }
    }
  }
})

const toggleMachine1 = createMachine({
  id: 'user',
  initial: 'idle',
  context: {} as DemoData,
  states: {
    idle: {
      on: {
        FETCH: { target: 'loading' }
      }
    },
    loading: {
      invoke: {
        id: 'getUser',
        src: fetchCuteAnimals,
        onDone: {
          target: 'success',
          actions: assign({ user: (_context, event) => event.data })
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_context, event) => event.data.error })
        }
      }
    },
    success: { type: 'final' },
    failure: {
      on: {
        RETRY: { target: 'loading' }
      }
    }
  }
})

const toggleService = interpret(toggleMachine).start()
toggleService.onTransition(state => {
  console.log('value', state.value)
})

export { normalTask, fetchCuteAnimals };

console.log('data', data + '🐱');
