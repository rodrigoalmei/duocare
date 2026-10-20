import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type AppContextValue = {
  onboardingComplete: boolean;
  completeOnboarding: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const value = useMemo(
    () => ({ onboardingComplete, completeOnboarding: () => setOnboardingComplete(true) }),
    [onboardingComplete],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used inside AppProvider');
  return context;
}
