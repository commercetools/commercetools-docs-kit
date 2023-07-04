import { VideoProgressReachedEvent } from './src/modules/self-learning/components/self-learning-page';

declare global {
  interface GlobalEventHandlersEventMap {
    videoProgressReached: VideoProgressReachedEvent;
  }
}
