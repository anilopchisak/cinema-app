import { configure } from 'mobx';

const isServer = typeof window === 'undefined';

configure({
  useProxies: 'ifavailable',
  // During SSR we use `enableStaticRendering(true)`, so MobX reactions are disabled.
  // With strict reaction requirements enabled, any store reads during SSR will warn.
  computedRequiresReaction: !isServer,
  reactionRequiresObservable: !isServer,
  observableRequiresReaction: !isServer,
});
