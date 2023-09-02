import { Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { UserList } from "./pages/UserList";
import { ActivityLogs, ReviewIdeas } from "./pages/ActivityLogs";

import useFetchWithMsal from './hooks/useFetchWithMsal';
import { protectedResources } from "./authConfig";

import "./style/App.css";
import { PageLayout } from "./components/PageLayout";
import { UserDetails } from "./pages/UserDetails";
import { ConfigProvider, theme } from "antd";
import { PAGE_PATHS, USER_SETTINGS, USER_THEMES, BASE_URI, API_URI } from "./config"
import { useEffect, useState } from "react";
import { PageNotFound } from "./pages/PageNotFound";
import { ErrorLogs } from "./pages/ErrorLogs";

const Pages = () => {
    return (
        <Routes>
            <Route path={PAGE_PATHS.ErrorLogs.path} element={<ErrorLogs />} />
            <Route path={PAGE_PATHS.ActivityLogs.path} element={<ActivityLogs />} />
            <Route path={PAGE_PATHS.UserDetails.path} element={<UserDetails />} />
            <Route path={PAGE_PATHS.UserList.path} element={<UserList />} />
            <Route path={PAGE_PATHS.UserListTwo.path} element={<UserList />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};


const App = ({ instance }) => {
    
    const [IsDarkTheme, setIsDarkTheme] = useState(USER_SETTINGS.theme === USER_THEMES.Dark);
    const [AppMenu, setAppMenu] = useState([]);

    const { isLoading, error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiTodoList.scopes.read,
    });

    

    const getUserThemeSetting = () => {
        if (IsDarkTheme)
            return getDarkThemeSetting();
        return getLightThemeSetting();
    }

    const getDarkThemeSetting = () => {
        return {
            algorithm: theme.darkAlgorithm,
            token: {
                "fontSize": 12
            }
        }
    }
    const getLightThemeSetting = () => {
        return {
            algorithm: theme.compactAlgorithm,
            token: {
                "fontSize": 14
            }
        }
    }

    return (
        <MsalProvider instance={instance}>
            <ConfigProvider
                theme = {getUserThemeSetting()}
            >
                <PageLayout IsDarkTheme={IsDarkTheme} setIsDarkTheme={setIsDarkTheme}>
                    <Pages />
                </PageLayout>
            </ConfigProvider>
        </MsalProvider>
    );
};

export default App;
