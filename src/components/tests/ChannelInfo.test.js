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
        const { asFragment } = renderChannelInfoWithCallback(() => 'url');

        await waitFor(() => screen.getByRole('img'));
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders without URL', () => {
        renderChannelInfoWithCallback(() => {
            throw new Error('error');
        });
            expect(screen.queryByRole('img')).toBeNull();
    });

    it('renders with URL', async () => {
        renderChannelInfoWithCallback(() => 'url');
            await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
    });

    function renderChannelInfoWithCallback(callback) {
        fakeYoutube.channelImageURL.mockImplementation(callback);
        render(
            withAllContexts(
                withRouter(
                <Route path='/' element={<ChannelInfo id='id' name='channel' />} />
                ),
                fakeYoutube
                ));
    }
});

