import { render, waitFor, screen } from '@testing-library/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import * as useFallbackVodRec from '../../hooks/useFallbackVodRec';
import Home from './Home';

let mockedAddAlert = jest.fn();
jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

// Mock implementation of a sub component of the component being tested
jest.mock('../../components/schedule/Schedule', () => () => <div></div>);
jest.mock('../../components/fallback/Fallback', () => () => <div></div>);

describe('Home', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should render', async () => {
    const mockedUseFallbackVodRec = jest.fn(() => {
      return {
        data: { items: [{ id: '', type: 'FALLBACK', recommendation: [] }] },
        error: undefined,
      };
    });
    jest
      .spyOn(useFallbackVodRec, 'default')
      .mockImplementation(mockedUseFallbackVodRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Home />
      </LocalizationProvider>,
    );

    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  describe('Alert fallback icon', () => {
    it('should appear an warning icon if vod has warning message if rec object', async () => {
      const mockedUseFallbackVodRec = jest.fn(() => {
        return {
          data: {
            items: [
              {
                id: '',
                type: 'FALLBACK',
                recommendation: [{ warningMessage: 'out of date' }],
              },
            ],
          },

          error: undefined,
        };
      });
      jest
        .spyOn(useFallbackVodRec, 'default')
        .mockImplementation(mockedUseFallbackVodRec);

      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Home />
        </LocalizationProvider>,
      );

      await waitFor(() => {
        const warningIcon = screen.queryByTestId('warning-fallback');
        expect(warningIcon).toBeInTheDocument();
      });
    });

    it('should not appear an warning icon if vod has not warning message if rec object', async () => {
      const mockedUseFallbackVodRec = jest.fn(() => {
        return {
          data: {
            items: [
              {
                id: '',
                type: 'FALLBACK',
                recommendation: [{ warningMessage: '' }],
              },
            ],
          },

          error: undefined,
        };
      });
      jest
        .spyOn(useFallbackVodRec, 'default')
        .mockImplementation(mockedUseFallbackVodRec);

      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Home />
        </LocalizationProvider>,
      );

      await waitFor(() => {
        const warningIcon = screen.queryByTestId('warning-fallback');
        expect(warningIcon).not.toBeInTheDocument();
      });
    });
  });
});
