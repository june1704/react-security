import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SigninPage from '../../pages/SigninPage/SigninPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    console.log(queryClient.getQueryState(["userQuery"]));
    console.log(queryClient.getQueryData(["userQuery"]));
    const isLogin = !!queryClient.getQueryData(["userQuery"]); // 로그인 확인

    useEffect(() => { // return이후에 실행.
        if(isLogin) { // fales면 navigate 실행, true면 <></> 빈 값 실행.
            navigate("/");
        }
    }, []);
    

    return (
        <> 
            {
                !isLogin && // 로그인 안되어 있으면 밑에 있는걸 렌더링 시켜라.
                <Routes>
                    <Route path='/signin' element={<SigninPage />} />	
                    <Route path='/signup' element={<SignupPage />} />	
                </Routes>

            }
        </>
    );
}

export default AuthRoute;