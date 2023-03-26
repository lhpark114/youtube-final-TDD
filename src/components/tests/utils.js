import { MemoryRouter } from 'react-router';

export function withRouter(routes, initialEntry = '/') {
    return <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>{routes}</Routes>
    </MemoryRouter>
}