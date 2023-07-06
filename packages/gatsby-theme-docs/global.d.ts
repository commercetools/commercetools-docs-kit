import {
  VideoProgressReachedEvent,
  ContentPageViewedEvent,
} from './src/modules/self-learning/hooks/use-learning-tracking';

declare global {
  interface GlobalEventHandlersEventMap {
    'selflearning:video:progressReached': VideoProgressReachedEvent;
    'selflearning:pageContent:viewed': ContentPageViewedEvent;
  }
}
