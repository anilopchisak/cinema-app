import Transition from '@/shared/ui/Transition';

export default function Template({ children }: { children: React.ReactNode }) {
  return <Transition>{children}</Transition>;
}
