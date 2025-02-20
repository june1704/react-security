import { healthCheckApi } from "./api/apis/healthCheckApi";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import { userApi } from "./api/apis/userApi";
import { jwtDecode } from "jwt-decode";
import UserRoute from "./routes/UserRoute/UserRoute";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api/config/axiosConfig";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
	const navigate = useNavigate();

	// const healthCheckQuery = useQuery({
	// 	queryKey: ["healthCheckQuery"], 
	// 	queryFn: healthCheckApi,
	// 	cacheTime: 1000 * 60 * 10, // 캐시 유지 시간(언마운트 이후)
	// 	staleTime: 1000 * 60 * 10, // 10분마다 최신의 캐시 상태 유지(refetch)
	// });

	// if(!healthCheckQuery.isLoading) {
	// 	console.log(healthCheckQuery.data.data.status); // 1번 데이터:리액트 2번 데이터:엑시오스
	// }

	const userQuery = useQuery({
		queryKey: ["userQuery"],
		queryFn: async () => {
			// console에 아무것도 안 뜸.
			const accessToken = localStorage.getItem("AccessToken");
			if (!accessToken) {
				return null;
			}
			const decodedJwt = jwtDecode(accessToken);
			return await userApi(decodedJwt.jti);
		},
	});

	

 //Container maxWidth="sm": 자동으로 사이즈 조정 가능
	return (
    	<Container maxWidth="lg">
			{
				(!userQuery.isLoading && !userQuery.isRefetching) &&
				<>
					<MainHeader />
					<Routes>
						<Route path="/" element={<IndexPage />} />
						<Route path="/user/*" element={<UserRoute />} />
						<Route path="/auth/*" element={<AuthRoute />} />
					</Routes>
				</>
			}
    	</Container>
    );
}

export default App;
