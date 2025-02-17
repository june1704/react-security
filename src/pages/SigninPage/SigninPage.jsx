import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';

/**
 * 로그인 요구사항
 * 각 필드가 공백인지만 체크(공백이면 아래 오류 메세지로 출력)
 * 로그인 버튼 클릭 시 /api/auth/signin요청
 * -> 응답받은 accessToken을 localstorage에 AccessToken이라는 키값으로 저장.
 * Index페이지로 이동.
 */

function SigninPage(props) {
    const navigate = useNavigate();
    const [ signinInput, setSigninInput ] = useState({
        username: "",
        password: "",
    });

    const handleInputOnBlur = (e) => {
        const { name, value } = e.target;
        let message = "";
        if(name === "username" && value === "") {
            message = "사용자 이름을 입력하세요."
        }
        if(name === "password" && value === "") {
            message = "비밀번호를 똑띠 입력하세요."
        }
        setErrors({
            ...errors,
            [name]: message,
        })
    }

    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const [ errors, setErrors] = useState({
            username: "",
            password: "",
            name: "",
            email: "",
        });

    const handleSigninButtonOnClick = async () => {
            if(Object.entries(errors).filter(entry => !!entry[1]) > 0 ) {
                return;
            }
            try {
                const respones = await api.post("/api/auth/signin", signinInput);
                const accessToken = respones.data?.accessToken;

                localStorage.setItem("AccessToken", accessToken)
                
                alert("로그인 완료!!");
                navigate("/");
            } catch(error) {
                setErrors({
                    username: error.response?.data?.data?.username ?? "",
                    password: "",
                });
            }
        };
    
    return (
        <>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h4' textAlign={'center'}>로그인</Typography>
                    <Box display={"flex"} flexDirection={'column'} gap={2}>
                        <TextField type='text' label ="username" name='username' onChange={handleSigninInputOnChange} value={signinInput.username}
                        error={!!errors.username}
                        helperText={errors.username} />
                        <TextField type='password' label ="password" name='password' onChange={handleSigninInputOnChange} value={signinInput.password}
                        error={!!errors.password}
                        helperText={errors.password} />
                        <Button variant="contained" onClick={handleSigninButtonOnClick}>로그인</Button>
                    </Box>
                    <Typography variant='h6' textAlign={'center'}>
                        계정이 없으신가요? <Link to={"/signup"}>회원가입</Link>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default SigninPage;