import { screen, render, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import ChannelInfo from '../ChannelInfo';

describe('ChannelInfo', () => {
    const fakeYoutube = {
        channelImageURL: jest.fn(),
    }
    afterEach(() => fakeYoutube.channelImageURL.mockReset());
    it('renders correctly', async () => {
        fakeYoutube.channelImageURL.mockImplementation(() => 'url');
        const { asFragment } = render(
            withAllContexts(
                withRouter(
                <Route path='/' element={<ChannelInfo id='id' name='channel' />} />
                ),
                fakeYoutube
                ));
                await waitFor(() => screen.getByRole('img'));
                expect(asFragment()).toMatchSnapshot();
    });

    it('renders without URL', () => {
        fakeYoutube.channelImageURL.mockImplementation(() => {
            throw new Error('error');
        });
        render(
            withAllContexts(
                withRouter(
                <Route path='/' element={<ChannelInfo id='id' name='channel' />} />
                ),
                fakeYoutube
                ));
                expect(screen.queryByRole('img')).toBeNull();
    });

    it('renders with URL', async () => {
        fakeYoutube.channelImageURL.mockImplementation(() => 'url');
        render(
            withAllContexts(
                withRouter(
                <Route path='/' element={<ChannelInfo id='id' name='channel' />} />
                ),
                fakeYoutube
                ));
                await waitFor(() => expect(screen.queryByRole('img')).toBeInTheDocument());
    });
});

