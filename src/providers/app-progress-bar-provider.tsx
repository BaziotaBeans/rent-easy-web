'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const AppProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#6A4CFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default AppProgressBarProvider;