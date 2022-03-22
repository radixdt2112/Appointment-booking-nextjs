import React from 'react'
import { useSelector } from 'react-redux';
import { logoutUser, selectActiveUser, setUser } from '../_features/users/usersSlice';
import { useQuery } from 'react-query';
import { userService } from '../_services';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ErrorPage from '../layouts/401Page';
import Link from 'next/link';
export const PageWrapper = ({ children, pageProps }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    // console.log(router.pathname);
    const activeUser = useSelector(selectActiveUser);

    const { error, data: userData } = useQuery(
        ['getUserById'],
        async () => {

            const getUserData = userService.getUser();
            if (!!activeUser) {
                //do nothing
                // console.log('active user');
            } else {
                // check token is expired or not
                // console.log(getUserData);
                if (!!getUserData) {

                    const data = await userService.getUserById(getUserData.id);
                    data["jwtToken"] = getUserData.jwtToken;
                    // console.log(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch(setUser(data));
                    return data;
                }
            }
        },
        { refetchOnWindowFocus: false }
    );

    if (!!userData) {
        // pageProps.userTypes.indexOf(user.type) === -1
        if (
            pageProps.protected &&
            pageProps.userTypes != userData.role
        ) {
            console.log(pageProps.userTypes);
            return <ErrorPage>
                <Link href="/">Back to Home</Link>

            </ErrorPage>;
        }
    }
    if (error) {
        dispatch(logoutUser());
    }



    return (
        <>{children}</>
    )
}


