import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react';
import useNotification from '../hooks/useNotification';
import Notification from './Notification';
import { AlertContextProvider } from './AlertProvider';

const CustomComponent = ({ prop }) => {
  const { addAlert } = useNotification();

  React.useEffect(() => {
    addAlert(prop);
  }, [addAlert]);
  return <div />;
};

describe('Notification', () => {
  let addAlertData = {
    title: 'title-test',
    text: 'text-test',
    type: 'error',
    id: Date.now(),
  };

  afterEach(() => {
    //jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render', () => {
    render(
      <AlertContextProvider>
        <CustomComponent prop={addAlertData}> </CustomComponent>
        <Notification />
      </AlertContextProvider>,
    );

    expect(screen.getByText(addAlertData.title));
    expect(screen.getByText(addAlertData.text));
  });

  it('should disappear after click', async () => {
    render(
      <AlertContextProvider>
        <CustomComponent prop={addAlertData}> </CustomComponent>
        <Notification />
      </AlertContextProvider>,
    );

    const closeButton = screen.getByTitle('Close');
    await waitFor(() => {
      fireEvent.click(closeButton);

      expect(screen.queryByText(addAlertData.title)).not.toBeInTheDocument();
      expect(screen.queryByText(addAlertData.text)).not.toBeInTheDocument();
    });
  });

  // it('should disappear after 6000ms', async () => {
  //   jest.useFakeTimers('legacy');
  //   jest.spyOn(global, 'setTimeout');

  //   render(
  //     <AlertContextProvider>
  //       <CustomComponent prop={addAlertData}> </CustomComponent>
  //       <Notification />
  //     </AlertContextProvider>,
  //   );

  //   //    jest.advanceTimersByTime(12000);

  //   expect(setTimeout).toHaveBeenCalledTimes(1);
  //   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
  // });
});
