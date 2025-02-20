import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useQueryClient } from '@tanstack/react-query';

function UserRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isLogin = !!queryClient.getQueryData(["userQuery"]); // 로그인 확인

    useEffect(() => { // return이후에 실행.
        if(!isLogin) { // fales면 navigate 실행, true면 <></> 빈 값 실행.
            alert("잘못된 접근입니다.")
            navigate("/auth/signin");
        }
    }, []);

    return (
        <>
          {
            isLogin &&
            <Routes>
                <Route path='/profile' element={<ProfilePage />} />
            </Routes>
          }  
        </>
    );
}

export default UserRoute;