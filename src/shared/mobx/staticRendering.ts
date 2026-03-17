import { enableStaticRendering } from 'mobx-react-lite';

// In SSR we must disable MobX reactions to avoid leaks/warnings.
enableStaticRendering(typeof window === 'undefined');

