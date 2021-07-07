import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import testRenderer from 'react-test-renderer';

import mockUseIsSignedIn from 'src/lib/util/__mocks__/hooks/mockUseIsSignedIn';
import mockUseSignOut from 'src/lib/util/__mocks__/hooks/mockUseSignOut';

import Footer from '../Footer';

jest.mock('owl.carousel', () => {});

jest.mock('src/peregrine/lib/talons/adeoweb/Footer/useFooter', () => {
    return {
        useFooter: () => ({
            copyrightText: 'Mocked Copyright Text'
        })
    };
});

jest.mock('@apollo/react-hooks', () => ({
    useQuery: jest.fn(() => {
        return {
            data: {
                cmsBlocks: {
                    items: ['']
                }
            }
        };
    })
}));

jest.mock('src/peregrine/lib/talons/adeoweb/Footer/useFooterContact', () => {
    return {
        useFooterContact: () => ({
            storeAddress: 'Mocked store address',
            storePhone: 'Mocked store phone',
            storeEmail: 'Mocked store email',
            storeWorkingHours: 'Mocked store workingHours'
        })
    };
});

jest.mock('src/peregrine/lib/talons/adeoweb/IsSignedIn/useIsSignedIn', () => {
    return {
        useIsSignedIn: () => mockUseIsSignedIn
    };
});

jest.mock('src/peregrine/lib/talons/adeoweb/SignOut/useSignOut', () => {
    return {
        useSignOut: () => mockUseSignOut
    };
});

test('Footer component renders correctly', () => {
    const component = testRenderer.create(
        <Router>
            <Footer />
        </Router>
    );
    expect(component.toJSON()).toMatchSnapshot();
});
